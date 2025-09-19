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

// 页面标题
export const PageTitle = styled.h1<{ theme: Theme }>`
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

// 分析网格
export const AnalysisGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

export const AnalysisCard = styled.div<{ theme: Theme }>`
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

export const CardTitle = styled.h3<{ theme: Theme }>`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: ${props => props.theme.colors.text};
  transition: color 0.3s ease;
`;

export const CardContent = styled.div<{ theme: Theme }>`
  color: ${props => props.theme.colors.textSecondary};
  line-height: 1.6;
  transition: color 0.3s ease;
`;

// 指标网格
export const MetricGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-top: 1rem;
`;

export const MetricItem = styled.div<{ theme: Theme }>`
  background: ${props => props.theme.colors.background};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 8px;
  padding: 1rem;
  text-align: center;
  transition: all 0.3s ease;
`;

export const MetricValue = styled.div<{ theme: Theme }>`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 0.5rem;
  transition: color 0.3s ease;
`;

export const MetricLabel = styled.div<{ theme: Theme }>`
  font-size: 0.9rem;
  color: ${props => props.theme.colors.textSecondary};
  transition: color 0.3s ease;
`;
