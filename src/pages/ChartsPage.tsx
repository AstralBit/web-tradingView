import React, { useState } from "react";
import styled from "styled-components";
import ControlPanel from "../components/ControlPanel";
import ChartSection from "../components/ChartSection";
import ChartInfo from "../components/ChartInfo";
import {
  generateCandlestickData,
  generateLineData,
  generateVolumeData,
  sampleCandlestickData,
  sampleLineData,
  sampleVolumeData,
} from "../components/sampleData";
import type { Theme } from "../components/styled/App.styled";

interface ChartsPageProps {
  theme: Theme;
}

const PageContainer = styled.div<{ theme: Theme }>`
  background: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  min-height: calc(100vh - 64px);
  transition: all 0.3s ease;
`;

const PageTitle = styled.h1<{ theme: Theme }>`
  text-align: center;
  padding: 2rem 0 1rem;
  margin: 0;
  font-size: 2.5rem;
  font-weight: bold;
  color: ${props => props.theme.colors.text};
  transition: color 0.3s ease;

  @media (max-width: 768px) {
    font-size: 2rem;
    padding: 1rem 0;
  }
`;

const PageSubtitle = styled.p<{ theme: Theme }>`
  text-align: center;
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: 2rem;
  font-size: 1.1rem;
  transition: color 0.3s ease;
`;

const ChartsPage: React.FC<ChartsPageProps> = ({ theme }) => {
  const [useSampleData, setUseSampleData] = useState(true);
  const [showVolume, setShowVolume] = useState(true);
  const [showLine, setShowLine] = useState(false);
  const [showCandlestick, setShowCandlestick] = useState(true);

  // 生成随机数据
  const randomCandlestickData = generateCandlestickData(30);
  const randomLineData = generateLineData(30);
  const randomVolumeData = generateVolumeData(30);

  return (
    <PageContainer theme={theme}>
      <PageTitle theme={theme}>图表分析</PageTitle>
      <PageSubtitle theme={theme}>
        使用专业的图表工具进行技术分析和数据可视化
      </PageSubtitle>

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
        candlestickData={
          useSampleData ? sampleCandlestickData : randomCandlestickData
        }
        lineData={useSampleData ? sampleLineData : randomLineData}
        volumeData={useSampleData ? sampleVolumeData : randomVolumeData}
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
