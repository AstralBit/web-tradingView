import { useEffect, useState, useMemo } from "react";
import type { OrderBook } from "./useOrderBookWebSocket";
import { useOrderBookWebSocket } from "./useOrderBookWebSocket";

export const useOrderBookDealData = () => {
  const [orderBookDealData, setOrderBookDealData] = useState<OrderBook | null>(
    null
  );

  // State for tracking animating rows
  const [animatingAsks, setAnimatingAsks] = useState<Record<number, boolean>>(
    {}
  );
  const [animatingBids, setAnimatingBids] = useState<Record<number, boolean>>(
    {}
  );

  const {
    orderBook: wsOrderBook,
    // connectionStatus,
    // error,
    // lastUpdated,
    isLoading: wsLoading,
    connect,
    disconnect,
    // reconnect,
  } = useOrderBookWebSocket({
    symbol: "tBTCUSD", // 交易对
    precision: "P0", // 精度
    frequency: "F0", // 频率
    maxEntries: 25, // 最大条目数
    autoReconnect: true, // 自动重连
    reconnectInterval: 1000, // 重连间隔
  });

  useEffect(() => {
    connect();
    return () => disconnect();
  }, [connect, disconnect]);

  useEffect(() => {
    if (wsOrderBook) {
      // Track which orders have changed to animate them
      const newAnimatingAsks: Record<number, boolean> = {};
      const newAnimatingBids: Record<number, boolean> = {};

      if (orderBookDealData) {
        // Find changed asks
        wsOrderBook.asks.forEach((ask) => {
          const existingAsk = orderBookDealData?.asks.find(
            (a) => a.price === ask.price
          );

          if (!existingAsk || existingAsk.amount !== ask.amount) {
            newAnimatingAsks[ask.price] = true;
          }
        });

        // Find changed bids
        wsOrderBook.bids.forEach((bid) => {
          const existingBid = orderBookDealData?.bids.find(
            (b) => b.price === bid.price
          );
          if (!existingBid || existingBid.amount !== bid.amount) {
            newAnimatingBids[bid.price] = true;
          }
        });
      }

      setOrderBookDealData(wsOrderBook);
      setAnimatingAsks(newAnimatingAsks);
      setAnimatingBids(newAnimatingBids);

      // Clear animations after a very short delay (100ms)
      setTimeout(() => {
        setAnimatingAsks({});
        setAnimatingBids({});
      }, 100);
    }
  }, [wsOrderBook]);

  const maxVolume = useMemo(() => {
    if (!orderBookDealData) return 0;
    return Math.max(
      ...orderBookDealData.asks.map((ask) => ask.amount),
      ...orderBookDealData.bids.map((bid) => bid.amount)
    );
  }, [orderBookDealData]);

  return {
    isLoading: wsLoading && !orderBookDealData,
    animatingAsks,
    animatingBids,
    orderBookDealData,
    maxVolume,
  };
};
