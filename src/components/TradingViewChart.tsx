import React, { useEffect, useRef, useState } from 'react';
import { 
  createChart, 
  ColorType,
  CandlestickSeries,
  LineSeries,
  HistogramSeries
} from 'lightweight-charts';
import type { IChartApi, ISeriesApi } from 'lightweight-charts';

export interface CandlestickData {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
}

export interface LineData {
  time: string;
  value: number;
}

export interface VolumeData {
  time: string;
  value: number;
  color: string;
}

interface TradingViewChartProps {
  candlestickData?: CandlestickData[];
  lineData?: LineData[];
  volumeData?: VolumeData[];
  height?: number;
  width?: number;
  showVolume?: boolean;
  showLine?: boolean;
  showCandlestick?: boolean;
}

const TradingViewChart: React.FC<TradingViewChartProps> = ({
  candlestickData = [],
  lineData = [],
  volumeData = [],
  height = 400,
  width,
  showVolume = true,
  showLine = false,
  showCandlestick = true,
}) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const candlestickSeriesRef = useRef<ISeriesApi<'Candlestick'> | null>(null);
  const lineSeriesRef = useRef<ISeriesApi<'Line'> | null>(null);
  const volumeSeriesRef = useRef<ISeriesApi<'Histogram'> | null>(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    // 创建图表
    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: 'white' },
        textColor: 'black',
      },
      width: width || chartContainerRef.current.clientWidth,
      height: height,
      grid: {
        vertLines: {
          color: '#e1e1e1',
        },
        horzLines: {
          color: '#e1e1e1',
        },
      },
      crosshair: {
        mode: 1,
      },
      rightPriceScale: {
        borderColor: '#cccccc',
      },
      timeScale: {
        borderColor: '#cccccc',
        timeVisible: true,
        secondsVisible: false,
      },
    });

    chartRef.current = chart;

    // 创建K线图系列
    if (showCandlestick) {
      const candlestickSeries = chart.addSeries(CandlestickSeries, {
        upColor: '#26a69a',
        downColor: '#ef5350',
        borderDownColor: '#ef5350',
        borderUpColor: '#26a69a',
        wickDownColor: '#ef5350',
        wickUpColor: '#26a69a',
      });
      candlestickSeriesRef.current = candlestickSeries;
    }

    // 创建折线图系列
    if (showLine) {
      const lineSeries = chart.addSeries(LineSeries, {
        color: '#2962FF',
        lineWidth: 2,
      });
      lineSeriesRef.current = lineSeries;
    }

    // 创建成交量系列
    if (showVolume) {
      const volumeSeries = chart.addSeries(HistogramSeries, {
        color: '#26a69a',
        priceFormat: {
          type: 'volume',
        },
        priceScaleId: '',
        // @ts-expect-error scaleMargins 不是类型定义中的属性，但用于设置成交量图的上下边距
        scaleMargins: {
          top: 0.8,
          bottom: 0,
        },
      });
      volumeSeriesRef.current = volumeSeries;
    }

    // 处理窗口大小变化
    const handleResize = () => {
      if (chartContainerRef.current && chart) {
        chart.applyOptions({
          width: width || chartContainerRef.current.clientWidth,
        });
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (chart) {
        chart.remove();
      }
    };
  }, [height, width, showVolume, showLine, showCandlestick]);

  // 更新数据
  useEffect(() => {
    if (candlestickSeriesRef.current && candlestickData.length > 0) {
      candlestickSeriesRef.current.setData(candlestickData);
    }
  }, [candlestickData]);

  useEffect(() => {
    if (lineSeriesRef.current && lineData.length > 0) {
      lineSeriesRef.current.setData(lineData);
    }
  }, [lineData]);

  useEffect(() => {
    if (volumeSeriesRef.current && volumeData.length > 0) {
      volumeSeriesRef.current.setData(volumeData);
    }
  }, [volumeData]);

  // 自适应图表大小
  useEffect(() => {
    if (chartRef.current && chartContainerRef.current) {
      const resizeObserver = new ResizeObserver((entries) => {
        if (entries.length === 0 || entries[0].target !== chartContainerRef.current) return;
        const newRect = entries[0].contentRect;
        chartRef.current?.applyOptions({
          width: width || newRect.width,
          height: height,
        });
      });

      resizeObserver.observe(chartContainerRef.current);

      return () => {
        resizeObserver.disconnect();
      };
    }
  }, [height, width]);

  return (
    <div className="trading-view-chart">
      <div
        ref={chartContainerRef}
        style={{
          width: width ? `${width}px` : '100%',
          height: `${height}px`,
        }}
      />
    </div>
  );
};

export default TradingViewChart;