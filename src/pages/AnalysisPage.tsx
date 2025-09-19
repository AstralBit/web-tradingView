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
      title: "Technical Indicators",
      content: "Technical indicators based on historical data to help identify market trends and trading opportunities.",
      metrics: [
        { label: "RSI", value: "65.4" },
        { label: "MACD", value: "0.23" },
        { label: "MA20", value: "42,150" },
        { label: "MA50", value: "41,890" }
      ]
    },
    {
      title: "Market Sentiment",
      content: "Analyze the sentiment and expectations of market participants to provide reference for investment decisions.",
      metrics: [
        { label: "Fear Index", value: "32" },
        { label: "Greed Index", value: "68" },
        { label: "Volume Ratio", value: "1.2x" },
        { label: "Volatility", value: "15.6%" }
      ]
    },
    {
      title: "Support and Resistance",
      content: "Identify key price support and resistance levels to help制定交易策略。",
      metrics: [
        { label: "Resistance Level 1", value: "43,200" },
        { label: "Resistance Level 2", value: "44,500" },
        { label: "Support Level 1", value: "41,800" },
        { label: "Support Level 2", value: "40,200" }
      ]
    },
    {
      title: "Trend Analysis",
      content: "Analyze the direction and strength of price trends to determine market trends.",
      metrics: [
        { label: "Trend Strength", value: "Strong" },
        { label: "Trend Direction", value: "Up" },
        { label: "Duration", value: "5 days" },
        { label: "Confidence", value: "85%" }
      ]
    }
  ];

  return (
    <PageContainer theme={theme}>
      <PageTitle theme={theme}>Analysis</PageTitle>
      
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
