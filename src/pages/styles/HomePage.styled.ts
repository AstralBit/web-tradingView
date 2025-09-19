import styled from "styled-components";
import type { Theme } from "@/components/styled/App.styled";

// 页面容器
export const PageContainer = styled.div<{ theme: Theme }>`
  padding: 2rem;
  background: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  min-height: calc(100vh - 64px);
  transition: all 0.3s ease;
`;

// 英雄区域
export const HeroSection = styled.section`
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
`;

export const HeroTitle = styled.h1<{ theme: Theme }>`
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

// 功能特性网格
export const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 4rem;
`;

export const FeatureCard = styled.div<{ theme: Theme }>`
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

export const FeatureIcon = styled.div<{ theme: Theme }>`
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

export const FeatureTitle = styled.h3<{ theme: Theme }>`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: ${props => props.theme.colors.text};
  transition: color 0.3s ease;
`;

export const FeatureDescription = styled.p<{ theme: Theme }>`
  color: ${props => props.theme.colors.textSecondary};
  line-height: 1.6;
  transition: color 0.3s ease;
`;
