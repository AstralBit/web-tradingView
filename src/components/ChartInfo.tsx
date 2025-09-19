import React from "react";
import {
  ChartInfo as StyledChartInfo,
  ChartInfoTitle,
  ChartInfoList,
  ChartInfoItem,
} from "@/components/styled/App.styled";
import type { Theme } from "@/components/styled/App.styled";

interface ChartInfoProps {
  theme: Theme;
}

const ChartInfo: React.FC<ChartInfoProps> = ({ theme }) => {
  return (
    <StyledChartInfo theme={theme}>
      <ChartInfoTitle theme={theme}>Function Description</ChartInfoTitle>
      <ChartInfoList>
        <ChartInfoItem theme={theme}>
          <strong>K-line Chart</strong>：Display opening price, highest price, lowest price, closing price
        </ChartInfoItem>
        <ChartInfoItem theme={theme}>
          <strong>Line Chart</strong>：Display price trend line
        </ChartInfoItem>
        <ChartInfoItem theme={theme}>
          <strong>Volume Chart</strong>：Display volume bar chart
        </ChartInfoItem>
        <ChartInfoItem theme={theme}>
          <strong>Interactive Function</strong>：Support zoom, pan, crosshair, etc.
        </ChartInfoItem>
        <ChartInfoItem theme={theme}>
          <strong>Responsive</strong>：Automatically adapt to container size changes
        </ChartInfoItem>
      </ChartInfoList>
    </StyledChartInfo>
  );  
};

export default ChartInfo;
