import React from "react";
import styled from "styled-components";
import type { Theme } from "../components/styled/App.styled";

interface AnalysisPageProps {
  theme: Theme;
}

const PageContainer = styled.div<{ theme: Theme }>`
  padding: 2rem;
  background: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  min-height: calc(100vh - 64px);
  transition: all 0.3s ease;
`;

const PageTitle = styled.h1<{ theme: Theme }>`
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2.5rem;
  font-weight: bold;
  color: ${props => props.theme.colors.text};
  transition: color 0.3s ease;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const AnalysisGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const AnalysisCard = styled.div<{ theme: Theme }>`
  background: ${props => props.theme.colors.surface};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 12px;
  padding: 2rem;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px ${props => props.theme.colors.shadow};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px ${props => props.theme.colors.shadow};
  }
`;

const CardTitle = styled.h3<{ theme: Theme }>`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: ${props => props.theme.colors.text};
  transition: color 0.3s ease;
`;

const CardContent = styled.div<{ theme: Theme }>`
  color: ${props => props.theme.colors.textSecondary};
  line-height: 1.6;
  transition: color 0.3s ease;
`;

const MetricGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-top: 1rem;
`;

const MetricItem = styled.div<{ theme: Theme }>`
  background: ${props => props.theme.colors.background};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 8px;
  padding: 1rem;
  text-align: center;
  transition: all 0.3s ease;
`;

const MetricValue = styled.div<{ theme: Theme }>`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 0.5rem;
  transition: color 0.3s ease;
`;

const MetricLabel = styled.div<{ theme: Theme }>`
  font-size: 0.9rem;
  color: ${props => props.theme.colors.textSecondary};
  transition: color 0.3s ease;
`;

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
