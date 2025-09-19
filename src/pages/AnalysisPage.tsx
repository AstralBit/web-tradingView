import React from "react";
import type { Theme } from "@/components/styled/App.styled";
import {
  PageContainer,
  PageTitle,
  AnalysisGrid,
  AnalysisCard,
  CardTitle,
  CardContent,
  MetricGrid,
  MetricItem,
  MetricValue,
  MetricLabel,
} from "@/pages/styles/AnalysisPage.styled";

interface AnalysisPageProps {
  theme: Theme;
}

const AnalysisPage: React.FC<AnalysisPageProps> = ({ theme }) => {
  const analysisData = [
    {
      title: "技术指标",
      content: "基于历史数据计算的技术指标，帮助识别市场趋势和交易机会。",
      metrics: [
        { label: "RSI", value: "65.4" },
        { label: "MACD", value: "0.23" },
        { label: "MA20", value: "42,150" },
        { label: "MA50", value: "41,890" }
      ]
    },
    {
      title: "市场情绪",
      content: "分析市场参与者的情绪和预期，为投资决策提供参考。",
      metrics: [
        { label: "恐惧指数", value: "32" },
        { label: "贪婪指数", value: "68" },
        { label: "成交量比", value: "1.2x" },
        { label: "波动率", value: "15.6%" }
      ]
    },
    {
      title: "支撑阻力",
      content: "识别关键的价格支撑和阻力位，帮助制定交易策略。",
      metrics: [
        { label: "阻力位1", value: "43,200" },
        { label: "阻力位2", value: "44,500" },
        { label: "支撑位1", value: "41,800" },
        { label: "支撑位2", value: "40,200" }
      ]
    },
    {
      title: "趋势分析",
      content: "分析价格趋势的方向和强度，判断市场走势。",
      metrics: [
        { label: "趋势强度", value: "强" },
        { label: "趋势方向", value: "上升" },
        { label: "持续时间", value: "5天" },
        { label: "置信度", value: "85%" }
      ]
    }
  ];

  return (
    <PageContainer theme={theme}>
      <PageTitle theme={theme}>技术分析</PageTitle>
      
      <AnalysisGrid>
        {analysisData.map((item, index) => (
          <AnalysisCard key={index} theme={theme}>
            <CardTitle theme={theme}>{item.title}</CardTitle>
            <CardContent theme={theme}>{item.content}</CardContent>
            <MetricGrid>
              {item.metrics.map((metric, metricIndex) => (
                <MetricItem key={metricIndex} theme={theme}>
                  <MetricValue theme={theme}>{metric.value}</MetricValue>
                  <MetricLabel theme={theme}>{metric.label}</MetricLabel>
                </MetricItem>
              ))}
            </MetricGrid>
          </AnalysisCard>
        ))}
      </AnalysisGrid>
    </PageContainer>
  );
};

export default AnalysisPage;
