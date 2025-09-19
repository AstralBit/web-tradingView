import React from "react";
import styled from "styled-components";
import type { Theme } from "../components/styled/App.styled";

interface HomePageProps {
  theme: Theme;
}

const PageContainer = styled.div<{ theme: Theme }>`
  padding: 2rem;
  background: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  min-height: calc(100vh - 64px);
  transition: all 0.3s ease;
`;

const HeroSection = styled.section`
  text-align: center;
  padding: 4rem 0;
  max-width: 800px;
  margin: 0 auto;
`;

const HeroTitle = styled.h1<{ theme: Theme }>`
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.secondary});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const HeroSubtitle = styled.p<{ theme: Theme }>`
  font-size: 1.2rem;
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: 2rem;
  line-height: 1.6;
  transition: color 0.3s ease;
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 4rem;
`;

const FeatureCard = styled.div<{ theme: Theme }>`
  background: ${props => props.theme.colors.surface};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px ${props => props.theme.colors.shadow};

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px ${props => props.theme.colors.shadow};
  }
`;

const FeatureIcon = styled.div<{ theme: Theme }>`
  width: 64px;
  height: 64px;
  background: linear-gradient(135deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.secondary});
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  font-size: 1.5rem;
  color: white;
`;

const FeatureTitle = styled.h3<{ theme: Theme }>`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: ${props => props.theme.colors.text};
  transition: color 0.3s ease;
`;

const FeatureDescription = styled.p<{ theme: Theme }>`
  color: ${props => props.theme.colors.textSecondary};
  line-height: 1.6;
  transition: color 0.3s ease;
`;

const HomePage: React.FC<HomePageProps> = ({ theme }) => {
  const features = [
    {
      icon: "📊",
      title: "实时图表",
      description: "支持K线图、折线图、成交量等多种图表类型，实时更新数据"
    },
    {
      icon: "🎨",
      title: "主题切换",
      description: "支持白天和黑夜主题，提供更好的视觉体验"
    },
    {
      icon: "📱",
      title: "响应式设计",
      description: "完美适配桌面端和移动端，随时随地查看图表"
    },
    {
      icon: "⚡",
      title: "高性能",
      description: "基于现代Web技术，流畅的交互体验"
    }
  ];

  return (
    <PageContainer theme={theme}>
      <HeroSection>
        <HeroTitle theme={theme}>TradingView 图表平台</HeroTitle>
        <HeroSubtitle theme={theme}>
          专业的金融图表分析工具，提供实时数据、多种图表类型和强大的分析功能
        </HeroSubtitle>
      </HeroSection>

      <FeatureGrid>
        {features.map((feature, index) => (
          <FeatureCard key={index} theme={theme}>
            <FeatureIcon theme={theme}>{feature.icon}</FeatureIcon>
            <FeatureTitle theme={theme}>{feature.title}</FeatureTitle>
            <FeatureDescription theme={theme}>{feature.description}</FeatureDescription>
          </FeatureCard>
        ))}
      </FeatureGrid>
    </PageContainer>
  );
};

export default HomePage;
