import React, { useState, useMemo } from "react";
import ControlPanel from "@/components/ControlPanel";
import ChartSection from "@/components/ChartSection";
import ChartInfo from "@/components/ChartInfo";
import {
  generateCandlestickData,
  generateLineData,
  generateVolumeData,
  sampleCandlestickData,
  sampleLineData,
  sampleVolumeData,
} from "@/components/sampleData";
import type { Theme } from "@/components/styled/App.styled";
import { PageContainer } from "@/pages/styles/ChartsPage.styled";

interface ChartsPageProps {
  theme: Theme;
}

const ChartsPage: React.FC<ChartsPageProps> = ({ theme }) => {
  const [useSampleData, setUseSampleData] = useState(false);
  const [showVolume, setShowVolume] = useState(true);
  const [showLine, setShowLine] = useState(true);
  const [showCandlestick, setShowCandlestick] = useState(true);

  // 生成随机数据
  const randomCandlestickData = generateCandlestickData(500);
  const randomLineData = generateLineData(500);
  const randomVolumeData = generateVolumeData(500);

  const chartDataMemory = useMemo(() => {
    return {
      candlestickData: useSampleData
        ? sampleCandlestickData
        : randomCandlestickData,
      lineData: useSampleData ? sampleLineData : randomLineData,
      volumeData: useSampleData ? sampleVolumeData : randomVolumeData,
    };
  }, [useSampleData]);

  return (
    <PageContainer theme={theme}>
      {/* 控制面板 */}
      <ControlPanel
        theme={theme}
        useSampleData={useSampleData}
        showVolume={showVolume}
        showLine={showLine}
        showCandlestick={showCandlestick}
        onUseSampleDataChange={setUseSampleData}
        onShowVolumeChange={setShowVolume}
        onShowLineChange={setShowLine}
        onShowCandlestickChange={setShowCandlestick}
      />

      {/* TradingView 图表 */}
      <ChartSection
        theme={theme}
        candlestickData={chartDataMemory.candlestickData}
        lineData={chartDataMemory.lineData}
        volumeData={chartDataMemory.volumeData}
        height={500}
        showVolume={showVolume}
        showLine={showLine}
        showCandlestick={showCandlestick}
      />

      {/* 图表说明 */}
      <ChartInfo theme={theme} />
    </PageContainer>
  );
};

export default ChartsPage;
