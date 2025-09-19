import React from "react";
import type { Theme } from "@/components/styled/App.styled";
import {
  PageContainer,
  HeroSection,
  HeroTitle,
  FeatureGrid,
  FeatureCard,
  FeatureIcon,
  FeatureTitle,
  FeatureDescription,
} from "@/pages/styles/HomePage.styled";

interface HomePageProps {
  theme: Theme;
}
const HomePage: React.FC<HomePageProps> = ({ theme }) => {
  const features = [
    {
      icon: "📊",
      title: "Real-time Charts",
      description: "Support for K-line, line chart, volume chart, etc., real-time update data"
    },
    {
      icon: "🎨",
      title: "Theme Switching",
      description: "Support for day and night themes, providing a better visual experience"
    },
    {
      icon: "⚡",
      title: "High Performance",
      description: "Based on modern Web technology, smooth interactive experience"
    }
  ];

  return (
    <PageContainer theme={theme}>
      <HeroSection>
        <HeroTitle theme={theme}>TradingView</HeroTitle>
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
