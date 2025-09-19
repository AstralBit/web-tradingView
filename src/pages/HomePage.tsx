import React from "react";
import type { Theme } from "../components/styled/App.styled";
import {
  PageContainer,
  HeroSection,
  HeroTitle,
  HeroSubtitle,
  FeatureGrid,
  FeatureCard,
  FeatureIcon,
  FeatureTitle,
  FeatureDescription,
} from "./styles/HomePage.styled";

interface HomePageProps {
  theme: Theme;
}
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
