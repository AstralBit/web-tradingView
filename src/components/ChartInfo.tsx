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
      <ChartInfoTitle theme={theme}>功能说明</ChartInfoTitle>
      <ChartInfoList>
        <ChartInfoItem theme={theme}>
          <strong>K线图</strong>：显示开盘价、最高价、最低价、收盘价
        </ChartInfoItem>
        <ChartInfoItem theme={theme}>
          <strong>折线图</strong>：显示价格趋势线
        </ChartInfoItem>
        <ChartInfoItem theme={theme}>
          <strong>成交量</strong>：显示交易量柱状图
        </ChartInfoItem>
        <ChartInfoItem theme={theme}>
          <strong>交互功能</strong>：支持缩放、平移、十字线等
        </ChartInfoItem>
        <ChartInfoItem theme={theme}>
          <strong>响应式</strong>：自动适应容器大小变化
        </ChartInfoItem>
      </ChartInfoList>
    </StyledChartInfo>
  );
};

export default ChartInfo;
