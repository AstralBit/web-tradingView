import { useState, useEffect, useRef, useCallback } from 'react';

// WebSocket URL for Bitfinex
const BITFINEX_WEBSOCKET_URL = 'wss://api-pub.bitfinex.com/ws/2';

// 类型定义
export interface OrderBookEntry {
  price: number;
  amount: number;
  total: number;
  sum: number;
}

export interface OrderBook {
  asks: OrderBookEntry[];
  bids: OrderBookEntry[];
  spread: number;
  exchange: string;
}

export type ConnectionStatus = 
  | 'connecting'
  | 'connected'
  | 'disconnected'
  | 'error'
  | 'reconnecting';

// Bitfinex 订单簿条目格式 [price, count, amount]
type BitfinexOrderBookEntry = [number, number, number];

// Hook 参数接口
interface UseOrderBookWebSocketOptions {
  symbol?: string;
  precision?: string;
  frequency?: string;
  maxEntries?: number;
  autoReconnect?: boolean;
  reconnectInterval?: number;
}

// Hook 返回值接口
interface UseOrderBookWebSocketResult {
  orderBook: OrderBook | null;
  connectionStatus: ConnectionStatus;
  error: Error | null;
  lastUpdated: Date | null;
  isLoading: boolean;
  connect: () => void;
  disconnect: () => void;
  reconnect: () => void;
}

export const useOrderBookWebSocket = (
  options: UseOrderBookWebSocketOptions = {}
): UseOrderBookWebSocketResult => {
  const {
    symbol = 'tBTCUSD',
    precision = 'P0',
    frequency = 'F0',
    maxEntries = 25,
    autoReconnect = true,
    reconnectInterval = 5000
  } = options;

  // 状态管理
  const [orderBook, setOrderBook] = useState<OrderBook | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>('disconnected');
  const [error, setError] = useState<Error | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // 引用管理
  const socketRef = useRef<WebSocket | null>(null);
  const channelIdRef = useRef<number | null>(null);
  const askMapRef = useRef<Map<number, { price: number, count: number, amount: number }>>(new Map());
  const bidMapRef = useRef<Map<number, { price: number, count: number, amount: number }>>(new Map());
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const reconnectAttemptsRef = useRef<number>(0);
  const maxReconnectAttempts = 5;

  // 处理快照数据
  const processSnapshot = useCallback((entries: BitfinexOrderBookEntry[]) => {
    const asks: OrderBookEntry[] = [];
    const bids: OrderBookEntry[] = [];
    
    // 清空现有数据
    askMapRef.current.clear();
    bidMapRef.current.clear();
    
    // 处理每个条目 [price, count, amount]
    entries.forEach(entry => {
      const [price, count, amount] = entry;
      
      // 在 Bitfinex 中，负数 amount = ask，正数 = bid
      if (amount < 0) {
        // 这是卖单
        const absAmount = Math.abs(amount);
        askMapRef.current.set(price, { price, count, amount: absAmount });
        asks.push({
          price,
          amount: absAmount,
          total: price * absAmount,
          sum: 0
        });
      } else if (amount > 0) {
        // 这是买单
        bidMapRef.current.set(price, { price, count, amount });
        bids.push({
          price,
          amount,
          total: price * amount,
          sum: 0
        });
      }
    });
    
    // 按价格排序
    asks.sort((a, b) => a.price - b.price);
    bids.sort((a, b) => b.price - a.price);
    
    // 计算累计数量
    let askSum = 0;
    asks.forEach((ask, i) => {
      askSum += ask.amount;
      asks[i].sum = askSum;
    });
    
    let bidSum = 0;
    bids.forEach((bid, i) => {
      bidSum += bid.amount;
      bids[i].sum = bidSum;
    });
    
    // 创建新的订单簿
    const newOrderBook: OrderBook = {
      asks: asks.slice(0, maxEntries),
      bids: bids.slice(0, maxEntries),
      spread: asks.length > 0 && bids.length > 0 ? asks[0].price - bids[0].price : 0,
      exchange: 'bitfinex'
    };
    
    setOrderBook(newOrderBook);
    setLastUpdated(new Date());
  }, [maxEntries]);

  // 处理增量更新
  const processUpdate = useCallback((entry: BitfinexOrderBookEntry) => {
    const [price, count, amount] = entry;
    
    if (count === 0) {
      // 移除价格级别
      askMapRef.current.delete(price);
      bidMapRef.current.delete(price);
    } else {
      // 更新或添加价格级别
      if (amount < 0) {
        // 卖单
        const absAmount = Math.abs(amount);
        askMapRef.current.set(price, { price, count, amount: absAmount });
      } else if (amount > 0) {
        // 买单
        bidMapRef.current.set(price, { price, count, amount });
      }
    }
    
    // 重建订单簿
    const asks: OrderBookEntry[] = [];
    const bids: OrderBookEntry[] = [];
    
    // 处理卖单
    askMapRef.current.forEach(({ price, amount }) => {
      asks.push({
        price,
        amount,
        total: price * amount,
        sum: 0
      });
    });
    
    // 处理买单
    bidMapRef.current.forEach(({ price, amount }) => {
      bids.push({
        price,
        amount,
        total: price * amount,
        sum: 0
      });
    });
    
    // 排序
    asks.sort((a, b) => a.price - b.price);
    bids.sort((a, b) => b.price - a.price);
    
    // 计算累计数量
    let askSum = 0;
    asks.forEach((ask, i) => {
      askSum += ask.amount;
      asks[i].sum = askSum;
    });
    
    let bidSum = 0;
    bids.forEach((bid, i) => {
      bidSum += bid.amount;
      bids[i].sum = bidSum;
    });
    
    // 更新订单簿
    const updatedOrderBook: OrderBook = {
      asks: asks.slice(0, maxEntries),
      bids: bids.slice(0, maxEntries),
      spread: asks.length > 0 && bids.length > 0 ? asks[0].price - bids[0].price : 0,
      exchange: 'bitfinex'
    };
    
    setOrderBook(updatedOrderBook);
    setLastUpdated(new Date());
  }, [maxEntries]);

  // 连接 WebSocket
  const connect = useCallback(() => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      return;
    }

    setConnectionStatus('connecting');
    setIsLoading(true);
    setError(null);

    try {
      socketRef.current = new WebSocket(BITFINEX_WEBSOCKET_URL);

      socketRef.current.onopen = () => {
        console.log('Bitfinex WebSocket connected');
        setConnectionStatus('connected');
        setIsLoading(false);
        reconnectAttemptsRef.current = 0;

        // 订阅订单簿
        if (socketRef.current) {
          socketRef.current.send(JSON.stringify({
            event: 'subscribe',
            channel: 'book',
            symbol,
            precision,
            freq: frequency,
            len: maxEntries.toString()
          }));
        }
      };

      socketRef.current.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          
          // 处理订阅确认
          if (data.event === 'subscribed' && data.channel === 'book') {
            channelIdRef.current = data.chanId;
            console.log(`Subscribed to channel ${data.chanId} for ${symbol}`);
            return;
          }
          
          // 处理心跳
          if (Array.isArray(data) && data[1] === 'hb') {
            return;
          }
          
          // 处理订单簿数据
          if (Array.isArray(data) && data[0] === channelIdRef.current) {
            if (Array.isArray(data[1])) {
              if (Array.isArray(data[1][0])) {
                // 快照数据
                const entries = data[1] as BitfinexOrderBookEntry[];
                processSnapshot(entries);
              } else {
                // 增量更新
                const entry = data[1] as BitfinexOrderBookEntry;
                processUpdate(entry);
              }
            }
          }
        } catch (err) {
          console.error('Error parsing WebSocket message:', err);
          setError(new Error('Failed to parse WebSocket message'));
        }
      };

      socketRef.current.onclose = (event) => {
        console.log('Bitfinex WebSocket closed:', event.code, event.reason);
        setConnectionStatus('disconnected');
        setIsLoading(false);
        
        // 自动重连
        if (autoReconnect && reconnectAttemptsRef.current < maxReconnectAttempts) {
          setConnectionStatus('reconnecting');
          reconnectAttemptsRef.current++;
          
          reconnectTimeoutRef.current = setTimeout(() => {
            connect();
          }, reconnectInterval);
        }
      };

      socketRef.current.onerror = (err) => {
        console.error('Bitfinex WebSocket error:', err);
        setConnectionStatus('error');
        setError(new Error('WebSocket connection error'));
        setIsLoading(false);
      };

    } catch (err) {
      console.error('Failed to create WebSocket connection:', err);
      setConnectionStatus('error');
      setError(new Error('Failed to create WebSocket connection'));
      setIsLoading(false);
    }
  }, [symbol, precision, frequency, maxEntries, autoReconnect, reconnectInterval, processSnapshot, processUpdate]);

  // 断开连接
  const disconnect = useCallback(() => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }
    
    if (socketRef.current) {
      socketRef.current.close();
      socketRef.current = null;
    }
    
    setConnectionStatus('disconnected');
    setIsLoading(false);
  }, []);

  // 重连
  const reconnect = useCallback(() => {
    disconnect();
    setTimeout(() => {
      connect();
    }, 1000);
  }, [disconnect, connect]);

  // 清理函数
  useEffect(() => {
    return () => {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, []);

  return {
    orderBook,
    connectionStatus,
    error,
    lastUpdated,
    isLoading,
    connect,
    disconnect,
    reconnect
  };
};