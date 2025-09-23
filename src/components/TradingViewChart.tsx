import React, { useEffect, useRef, useState, useMemo } from "react";
import {
  createChart,
  ColorType,
  CandlestickSeries,
  LineSeries,
  HistogramSeries,
} from "lightweight-charts";
import type { IChartApi, ISeriesApi } from "lightweight-charts";
import {
  TradingViewChart as StyledTradingViewChart,
  TvToolbar,
  TvToolbarLeft,
  TvToolbarRight,
  TvToolbarButton,
  TvLegend,
  TvLegendTime,
  lightTheme,
  darkTheme,
} from "@/components/styled/App.styled";
import {
  sampleCandlestickData,
  sampleLineData,
  sampleVolumeData,
  generateCandlestickData,
  generateLineData,
  generateVolumeData,
} from "@/components/sampleData";
import { useTheme } from "@/contexts/ThemeContext";
import TradingViewIframe from "./TradingExtend";
import ControlPanel from "./ControlPanel";

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
  height = 400,
  width,
}) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const candlestickSeriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);
  const lineSeriesRef = useRef<ISeriesApi<"Line"> | null>(null);
  const volumeSeriesRef = useRef<ISeriesApi<"Histogram"> | null>(null);

  const [useSampleData, setUseSampleData] = useState(false);
  const [showVolume, setShowVolume] = useState(true);
  const [showLine, setShowLine] = useState(true);
  const [showCandlestick, setShowCandlestick] = useState(true);

  // 使用主题上下文
  const { theme: contextTheme } = useTheme();
  const currentTheme = contextTheme === "dark" ? darkTheme : lightTheme;

  const randomCandlestickData = generateCandlestickData(500);
  const randomLineData = generateLineData(500);
  const randomVolumeData = generateVolumeData(500);

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

  const chartDataMemory = useMemo(() => {
    return {
      candlestickData: useSampleData
        ? sampleCandlestickData
        : randomCandlestickData,
      lineData: useSampleData ? sampleLineData : randomLineData,
      volumeData: useSampleData ? sampleVolumeData : randomVolumeData,
    };
  }, [useSampleData]);

  // 1. 图表创建 - 只在容器、尺寸、主题变化时重新创建
  useEffect(() => {
    if (!chartContainerRef.current) return;

    // 创建图表
    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: {
          type: ColorType.Solid,
          color: currentTheme.colors.background,
        },
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

    // 创建所有系列（一次性创建，不随状态变化）
    const candlestickChartSeries = chart.addSeries(CandlestickSeries, {
      upColor: "#26a69a",
      downColor: "#ef5350",
      borderDownColor: "#ef5350",
      borderUpColor: "#26a69a",
      wickDownColor: "#ef5350",
      wickUpColor: "#26a69a",
    });
    candlestickSeriesRef.current = candlestickChartSeries;

    const lineChartSeries = chart.addSeries(LineSeries, {
      color: "#2962FF",
      lineWidth: 2,
    });
    lineSeriesRef.current = lineChartSeries;

    const volumeChartSeries = chart.addSeries(HistogramSeries, {
      color: "#26a69a",
      priceFormat: { type: "volume" },
      priceScaleId: "",
    });
    volumeChartSeries.priceScale().applyOptions({
      scaleMargins: { top: 0.8, bottom: 0 },
    });
    volumeSeriesRef.current = volumeChartSeries;

    // 十字线悬浮提示
    const handleCrosshairMove = (param: any) => {
      if (!param?.point || param?.time === undefined) {
        setLegend(null);
        return;
      }
      const next: any = { time: param.time };
      if (candlestickSeriesRef.current) {
        const d: any =
          param.seriesData?.get?.(candlestickSeriesRef.current) ?? null;
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

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chart.unsubscribeCrosshairMove(handleCrosshairMove);
      if (chart) {
        chart.remove();
      }
    };
  }, [height, width]);

  // 2. 数据更新 - 根据 show 状态控制数据显示/隐藏
  useEffect(() => {
    if (candlestickSeriesRef.current) {
      if (showCandlestick && chartDataMemory.candlestickData.length > 0) {
        candlestickSeriesRef.current.setData(chartDataMemory.candlestickData);
      } else {
        candlestickSeriesRef.current.setData([]); // 隐藏数据
      }
    }
  }, [chartDataMemory.candlestickData, showCandlestick]);

  useEffect(() => {
    if (lineSeriesRef.current) {
      if (showLine && chartDataMemory.lineData.length > 0) {
        lineSeriesRef.current.setData(chartDataMemory.lineData);
      } else {
        lineSeriesRef.current.setData([]); // 隐藏数据
      }
    }
  }, [chartDataMemory.lineData, showLine]);

  useEffect(() => {
    if (volumeSeriesRef.current) {
      if (showVolume && chartDataMemory.volumeData.length > 0) {
        volumeSeriesRef.current.setData(chartDataMemory.volumeData);
      } else {
        volumeSeriesRef.current.setData([]); // 隐藏数据
      }
    }
  }, [chartDataMemory.volumeData, showVolume]);

  // 自适应图表大小
  useEffect(() => {
    if (chartRef.current && chartContainerRef.current) {
      const resizeObserver = new ResizeObserver((entries) => {
        if (
          entries.length === 0 ||
          entries[0].target !== chartContainerRef.current
        )
          return;
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
        background: {
          type: ColorType.Solid,
          color: currentTheme.colors.background,
        },
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

  // 主题应用 - 单独处理主题更新，不重新创建图表
  useEffect(() => {
    if (!chartRef.current) return;
    chartRef.current.applyOptions({
      layout: {
        background: {
          type: ColorType.Solid,
          color: currentTheme.colors.background,
        },
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

  return (
    <StyledTradingViewChart theme={currentTheme}>
      <TradingViewIframe />

      {/* 控制面板 */}
      <ControlPanel
        theme={currentTheme}
        useSampleData={useSampleData}
        showVolume={showVolume}
        showLine={showLine}
        showCandlestick={showCandlestick}
        onUseSampleDataChange={setUseSampleData}
        onShowVolumeChange={setShowVolume}
        onShowLineChange={setShowLine}
        onShowCandlestickChange={setShowCandlestick}
      />

      {/* 顶部工具栏 */}
      <TvToolbar theme={currentTheme}>
        <TvToolbarLeft>
          <TvToolbarButton
            theme={currentTheme}
            onClick={() => chartRef.current?.timeScale().fitContent()}
          >
            Auto Scale
          </TvToolbarButton>
          <TvToolbarButton
            theme={currentTheme}
            onClick={() => chartRef.current?.timeScale().scrollToRealTime()}
          >
            Back to Latest
          </TvToolbarButton>
        </TvToolbarLeft>
        <TvToolbarRight>
          <TvToolbarButton
            theme={currentTheme}
            onClick={() => setCrosshairMode((m) => (m === 1 ? 0 : 1))}
          >
            Crosshair: {crosshairMode === 1 ? "Magnet" : "Free"}
          </TvToolbarButton>
        </TvToolbarRight>
      </TvToolbar>

      {/* 图表容器 */}
      <div
        ref={chartContainerRef}
        style={{
          width: width ? `${width}px` : "100%",
          height: `${Math.max(0, height)}px`,
        }}
      />

      {/* 悬浮信息面板 */}
      <TvLegend theme={currentTheme}>
        {legend ? (
          <>
            <TvLegendTime theme={currentTheme}>
              {String(legend.time)}
            </TvLegendTime>
            {legend.o !== undefined && <span>O {legend.o}</span>}
            {legend.h !== undefined && <span>H {legend.h}</span>}
            {legend.l !== undefined && <span>L {legend.l}</span>}
            {legend.c !== undefined && <span>C {legend.c}</span>}
            {legend.line !== undefined && <span>Line {legend.line}</span>}
            {legend.volume !== undefined && <span>Vol {legend.volume}</span>}
          </>
        ) : (
          <span>Move the mouse over the chart to view the data</span>
        )}
      </TvLegend>
    </StyledTradingViewChart>
  );
};

export default TradingViewChart;
