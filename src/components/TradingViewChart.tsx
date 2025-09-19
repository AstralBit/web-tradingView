import React, { useEffect, useRef, useState } from 'react';
import { 
  createChart, 
  ColorType,
  CandlestickSeries,
  LineSeries,
  HistogramSeries
} from 'lightweight-charts';
import type { IChartApi, ISeriesApi } from 'lightweight-charts';
import {
  TradingViewChart as StyledTradingViewChart,
  TvToolbar,
  TvToolbarLeft,
  TvToolbarRight,
  TvToolbarButton,
  TvLegend,
  TvLegendTime,
  lightTheme,
  darkTheme
} from '@/components/styled/App.styled';
import { useTheme } from '@/contexts/ThemeContext';

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

  // 使用主题上下文
  const { theme: contextTheme } = useTheme();
  const currentTheme = contextTheme === 'dark' ? darkTheme : lightTheme;

  // UI 状态
  const [crosshairMode, setCrosshairMode] = useState<0 | 1>(1); // 0: Normal, 1: Magnet
  const [legend, setLegend] = useState<{
    time: any;
    o?: number;
    h?: number;
    l?: number;
    c?: number;
    line?: number;
    volume?: number;
  } | null>(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    // 创建图表
    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: currentTheme.colors.background },
        textColor: currentTheme.colors.text,
      },
      width: width || chartContainerRef.current.clientWidth,
      height: height,
      grid: {
        vertLines: {
          color: currentTheme.colors.border,
        },
        horzLines: {
          color: currentTheme.colors.border,
        },
      },
      crosshair: {
        mode: 1,
      },
      rightPriceScale: {
        borderColor: currentTheme.colors.border,
      },
      timeScale: {
        borderColor: currentTheme.colors.border,
        timeVisible: true,
        secondsVisible: false,
      },
    });

    chartRef.current = chart;

    // 创建K线图系列
    if (showCandlestick) {
      const candlestickChartSeries = chart.addSeries(CandlestickSeries, {
        upColor: '#26a69a',
        downColor: '#ef5350',
        borderDownColor: '#ef5350',
        borderUpColor: '#26a69a',
        wickDownColor: '#ef5350',
        wickUpColor: '#26a69a',
      });
      candlestickSeriesRef.current = candlestickChartSeries;
    }

    // 创建折线图系列
    if (showLine) {
      const lineChartSeries = chart.addSeries(LineSeries, {
        color: '#2962FF',
        lineWidth: 2,
      });
      lineSeriesRef.current = lineChartSeries;
    }

    // 创建成交量系列
    if (showVolume) {
      const volumeChartSeries = chart.addSeries(HistogramSeries, {
        color: '#26a69a',
        priceFormat: { type: 'volume' },
        priceScaleId: '',
      });
      volumeChartSeries.priceScale().applyOptions({
        scaleMargins: { top: 0.8, bottom: 0 },
      });
      volumeSeriesRef.current = volumeChartSeries;
    }

    // 十字线悬浮提示
    const handleCrosshairMove = (param: any) => {
      if (!param?.point || param?.time === undefined) {
        setLegend(null);
        return;
      }
      const next: any = { time: param.time };
      if (candlestickSeriesRef.current) {
        const d: any = param.seriesData?.get?.(candlestickSeriesRef.current) ?? null;
        if (d) {
          next.o = d.open ?? d.o;
          next.h = d.high ?? d.h;
          next.l = d.low ?? d.l;
          next.c = d.close ?? d.c ?? d.value;
        }
      }
      if (lineSeriesRef.current) {
        const d: any = param.seriesData?.get?.(lineSeriesRef.current) ?? null;
        if (d) {
          next.line = d.value ?? d.close ?? d.c;
        }
      }
      if (volumeSeriesRef.current) {
        const d: any = param.seriesData?.get?.(volumeSeriesRef.current) ?? null;
        if (d) {
          next.volume = d.value;
        }
      }
      setLegend(next);
    };
    chart.subscribeCrosshairMove(handleCrosshairMove);

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
      chart.unsubscribeCrosshairMove(handleCrosshairMove);
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

  // 主题应用
  useEffect(() => {
    if (!chartRef.current) return;
    chartRef.current.applyOptions({
      layout: {
        background: { type: ColorType.Solid, color: currentTheme.colors.background },
        textColor: currentTheme.colors.text,
      },
      grid: {
        vertLines: { color: currentTheme.colors.border },
        horzLines: { color: currentTheme.colors.border },
      },
      rightPriceScale: { borderColor: currentTheme.colors.border },
      timeScale: { borderColor: currentTheme.colors.border },
    });
  }, [currentTheme]);

  // 十字线模式应用
  useEffect(() => {
    chartRef.current?.applyOptions({ crosshair: { mode: crosshairMode } });
  }, [crosshairMode]);

  return (
    <StyledTradingViewChart theme={currentTheme}>
      {/* 顶部工具栏 */}
      <TvToolbar theme={currentTheme}>
        <TvToolbarLeft>
          <TvToolbarButton theme={currentTheme} onClick={() => chartRef.current?.timeScale().fitContent()}>Auto Scale</TvToolbarButton>
          <TvToolbarButton theme={currentTheme} onClick={() => chartRef.current?.timeScale().scrollToRealTime()}>Back to Latest</TvToolbarButton>
        </TvToolbarLeft>
        <TvToolbarRight>
          <TvToolbarButton theme={currentTheme} onClick={() => setCrosshairMode((m) => (m === 1 ? 0 : 1))}>
            Crosshair: {crosshairMode === 1 ? 'Magnet' : 'Free'}
          </TvToolbarButton>
        </TvToolbarRight>
      </TvToolbar>

      {/* 图表容器 */}
      <div
        ref={chartContainerRef}
        style={{
          width: width ? `${width}px` : '100%',
          height: `${Math.max(0, height)}px`,
        }}
      />

      {/* 悬浮信息面板 */}
      <TvLegend theme={currentTheme}>
        {legend ? (
          <>
            <TvLegendTime theme={currentTheme}>{String(legend.time)}</TvLegendTime>
            {legend.o !== undefined && <span>O {legend.o}</span>}
            {legend.h !== undefined && <span>H {legend.h}</span>}
            {legend.l !== undefined && <span>L {legend.l}</span>}
            {legend.c !== undefined && <span>C {legend.c}</span>}
            {legend.line !== undefined && <span>Line {legend.line}</span>}
            {legend.volume !== undefined && <span>Vol {legend.volume}</span>}
          </>
        ) : (
          <span>将鼠标移动到图表查看数据</span>
        )}
      </TvLegend>
    </StyledTradingViewChart>
  );
};

export default TradingViewChart;