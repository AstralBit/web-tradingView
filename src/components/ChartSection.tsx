import React from "react";
import TradingViewChart from "@/components/TradingViewChart";
import { ChartSection as StyledChartSection } from "@/components/styled/App.styled";
import type { Theme } from "@/components/styled/App.styled";

interface ChartSectionProps {
  theme: Theme;
  height?: number;
}

const ChartSection: React.FC<ChartSectionProps> = ({
  theme,
  height = 500,
}) => {
  return (
    <>
      <StyledChartSection theme={theme}>
        <TradingViewChart
          height={height}
        />
      </StyledChartSection>
    </>
  );
};

export default ChartSection;
