import React from "react";
import TradingViewChart from "@/components/TradingViewChart";
import { ChartSection as StyledChartSection } from "@/components/styled/App.styled";
import type { Theme } from "@/components/styled/App.styled";
import type {
  CandlestickData,
  LineData,
  VolumeData,
} from "@/components/TradingViewChart";

interface ChartSectionProps {
  theme: Theme;
  candlestickData: CandlestickData[];
  lineData: LineData[];
  volumeData: VolumeData[];
  height?: number;
  showVolume: boolean;
  showLine: boolean;
  showCandlestick: boolean;
}

const ChartSection: React.FC<ChartSectionProps> = ({
  theme,
  candlestickData,
  lineData,
  volumeData,
  height = 500,
  showVolume,
  showLine,
  showCandlestick,
}) => {
  return (
    <StyledChartSection theme={theme}>
      <TradingViewChart
        candlestickData={candlestickData}
        lineData={lineData}
        volumeData={volumeData}
        height={height}
        showVolume={showVolume}
        showLine={showLine}
        showCandlestick={showCandlestick}
      />
    </StyledChartSection>
  );
};

export default ChartSection;
