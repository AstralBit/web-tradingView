import React from "react";
import ChartSection from "@/components/ChartSection";
import ChartInfo from "@/components/ChartInfo";
import type { Theme } from "@/components/styled/App.styled";
import { PageContainer } from "@/pages/styles/ChartsPage.styled";

interface ChartsPageProps {
  theme: Theme;
}

const ChartsPage: React.FC<ChartsPageProps> = ({ theme }) => {
  return (
    <PageContainer theme={theme}>
      {/* TradingView 图表 */}
      <ChartSection theme={theme} height={500} />
      {/* 图表说明 */}
      <ChartInfo theme={theme} />
    </PageContainer>
  );
};

export default ChartsPage;
