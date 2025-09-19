import styled from "styled-components";
import type { Theme } from "@/components/styled/App.styled";

// 页面容器
export const PageContainer = styled.div<{ theme: Theme }>`
  background: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  min-height: calc(100vh - 64px);
  transition: all 0.3s ease;
`;

export const ThemeToggleContainer = styled.div`
  display: flex;
  justify-content: right;
  align-items: center;
  margin: 1rem;
`;
