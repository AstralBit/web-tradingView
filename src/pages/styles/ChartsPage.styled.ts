import styled from "styled-components";
import type { Theme } from "../../components/styled/App.styled";

// 页面容器
export const PageContainer = styled.div<{ theme: Theme }>`
  background: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  min-height: calc(100vh - 64px);
  transition: all 0.3s ease;
`;

// 页面标题
export const PageTitle = styled.h1<{ theme: Theme }>`
  text-align: center;
  padding: 2rem 0 1rem;
  margin: 0;
  font-size: 2.5rem;
  font-weight: bold;
  color: ${props => props.theme.colors.text};
  transition: color 0.3s ease;

  @media (max-width: 768px) {
    font-size: 2rem;
    padding: 1rem 0;
  }
`;

export const PageSubtitle = styled.p<{ theme: Theme }>`
  text-align: center;
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: 2rem;
  font-size: 1.1rem;
  transition: color 0.3s ease;
`;
