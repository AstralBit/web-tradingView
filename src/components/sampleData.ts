import type { CandlestickData, LineData, VolumeData } from './TradingViewChart';

// 生成随机K线数据
export const generateCandlestickData = (days: number = 1000): CandlestickData[] => {
  const data: CandlestickData[] = [];
  let basePrice = 100;
  const today = new Date();
  
  for (let i = days; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    const open = basePrice + (Math.random() - 0.5) * 10;
    const close = open + (Math.random() - 0.5) * 8;
    const high = Math.max(open, close) + Math.random() * 5;
    const low = Math.min(open, close) - Math.random() * 5;
    
    data.push({
      time: date.toISOString().split('T')[0],
      open: Number(open.toFixed(2)),
      high: Number(high.toFixed(2)),
      low: Number(low.toFixed(2)),
      close: Number(close.toFixed(2)),
    });
    
    basePrice = close;
  }
  
  return data;
};

// 生成随机折线数据
export const generateLineData = (days: number = 30): LineData[] => {
  const data: LineData[] = [];
  let baseValue = 50;
  const today = new Date();
  
  for (let i = days; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    const value = baseValue + (Math.random() - 0.5) * 10;
    
    data.push({
      time: date.toISOString().split('T')[0],
      value: Number(value.toFixed(2)),
    });
    
    baseValue = value;
  }
  
  return data;
};

// 生成随机成交量数据
export const generateVolumeData = (days: number = 30): VolumeData[] => {
  const data: VolumeData[] = [];
  const today = new Date();
  
  for (let i = days; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    const volume = Math.random() * 1000000;
    const color = Math.random() > 0.5 ? '#26a69a' : '#ef5350';
    
    data.push({
      time: date.toISOString().split('T')[0],
      value: Number(volume.toFixed(0)),
      color,
    });
  }
  
  return data;
};

// 预设的示例数据
export const sampleCandlestickData: CandlestickData[] = [
  { time: '2024-01-01', open: 100, high: 105, low: 98, close: 103 },
  { time: '2024-01-02', open: 103, high: 108, low: 101, close: 106 },
  { time: '2024-01-03', open: 106, high: 110, low: 104, close: 108 },
  { time: '2024-01-04', open: 108, high: 112, low: 106, close: 109 },
  { time: '2024-01-05', open: 109, high: 115, low: 107, close: 113 },
  { time: '2024-01-08', open: 113, high: 118, low: 111, close: 116 },
  { time: '2024-01-09', open: 116, high: 120, low: 114, close: 118 },
  { time: '2024-01-10', open: 118, high: 122, low: 116, close: 119 },
  { time: '2024-01-11', open: 119, high: 125, low: 117, close: 123 },
  { time: '2024-01-12', open: 123, high: 128, low: 121, close: 126 },
];

export const sampleLineData: LineData[] = [
  { time: '2024-01-01', value: 50 },
  { time: '2024-01-02', value: 52 },
  { time: '2024-01-03', value: 48 },
  { time: '2024-01-04', value: 55 },
  { time: '2024-01-05', value: 58 },
  { time: '2024-01-08', value: 60 },
  { time: '2024-01-09', value: 57 },
  { time: '2024-01-10', value: 62 },
  { time: '2024-01-11', value: 65 },
  { time: '2024-01-12', value: 68 },
];

export const sampleVolumeData: VolumeData[] = [
  { time: '2024-01-01', value: 1000000, color: '#26a69a' },
  { time: '2024-01-02', value: 1200000, color: '#26a69a' },
  { time: '2024-01-03', value: 800000, color: '#ef5350' },
  { time: '2024-01-04', value: 1500000, color: '#26a69a' },
  { time: '2024-01-05', value: 1800000, color: '#26a69a' },
  { time: '2024-01-08', value: 2000000, color: '#26a69a' },
  { time: '2024-01-09', value: 1600000, color: '#ef5350' },
  { time: '2024-01-10', value: 2200000, color: '#26a69a' },
  { time: '2024-01-11', value: 2500000, color: '#26a69a' },
  { time: '2024-01-12', value: 2800000, color: '#26a69a' },
];