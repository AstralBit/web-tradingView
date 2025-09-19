import styled from 'styled-components';

// 主题接口
export interface Theme {
  mode: 'light' | 'dark';
  colors: {
    background: string;
    surface: string;
    primary: string;
    secondary: string;
    text: string;
    textSecondary: string;
    border: string;
    shadow: string;
  };
}

// 主题配置
export const lightTheme: Theme = {
  mode: 'light',
  colors: {
    background: '#ffffff',
    surface: '#f8f9fa',
    primary: '#26a69a',
    secondary: '#2962FF',
    text: '#333333',
    textSecondary: '#555555',
    border: '#e1e1e1',
    shadow: 'rgba(0, 0, 0, 0.1)',
  },
};

export const darkTheme: Theme = {
  mode: 'dark',
  colors: {
    background: '#1a1a1a',
    surface: '#2a2a2a',
    primary: '#4a9eff',
    secondary: '#26a69a',
    text: '#ffffff',
    textSecondary: '#cccccc',
    border: '#444444',
    shadow: 'rgba(0, 0, 0, 0.3)',
  },
};

// 根容器样式
export const RootContainer = styled.div<{ theme: Theme }>`
  margin: 0 auto;
  min-width: 1280px;  
  padding: 2rem;
  text-align: center;
  background-color: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  min-height: 100vh;
  transition: background-color 0.3s ease, color 0.3s ease;
`;

// Logo样式
export const Logo = styled.div<{ $isReact?: boolean }>`
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;

  &:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }

  ${props => props.$isReact && `
    &:hover {
      filter: drop-shadow(0 0 2em #61dafbaa);
    }
  `}
`;

// 卡片样式
export const Card = styled.div`
  padding: 2em;
`;

// 文档链接样式
export const ReadTheDocs = styled.div`
  color: #888;
`;

// 控制面板样式
export const ControlPanel = styled.div<{ theme: Theme }>`
  margin-top: 1rem; 
  padding: 1.5rem;
  background: ${props => props.theme.colors.surface};
  border-radius: 8px;
  text-align: left;
  border: 1px solid ${props => props.theme.colors.border};
  transition: all 0.3s ease;
`;

export const Controls = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const ControlLabel = styled.label<{ theme: Theme }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  font-size: 0.9rem;
  color: ${props => props.theme.colors.textSecondary};
  transition: color 0.3s ease;

  input[type="checkbox"] {
    cursor: pointer;
    accent-color: ${props => props.theme.colors.primary};
  }
`;

// TradingView图表样式
export const ChartSection = styled.div<{ theme: Theme }>`
  padding: 1rem;
  background: ${props => props.theme.colors.surface};
  border-radius: 8px;
  box-shadow: 0 2px 4px ${props => props.theme.colors.shadow};
  border: 1px solid ${props => props.theme.colors.border};
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    padding: 0.5rem;
  }
`;

export const TradingViewChart = styled.div<{ theme: Theme }>`
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 4px;
  overflow: hidden;
  background: ${props => props.theme.colors.background};
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    min-height: 300px;
  }
`;

// 顶部工具栏样式
export const TvToolbar = styled.div<{ theme: Theme }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 8px 12px;
  background: ${props => props.theme.colors.surface};
  border-bottom: 1px solid ${props => props.theme.colors.border};
  transition: all 0.3s ease;
`;

export const TvToolbarLeft = styled.div`
  display: flex;
  gap: 8px;
`;

export const TvToolbarRight = styled.div`
  display: flex;
  gap: 8px;
`;

export const TvToolbarButton = styled.button<{ theme: Theme }>`
  padding: 6px 10px;
  font-size: 12px;
  border: 1px solid ${props => props.theme.colors.border};
  background: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.theme.colors.surface};
    border-color: ${props => props.theme.colors.primary};
  }
`;

// 悬浮信息面板
export const TvLegend = styled.div<{ theme: Theme }>`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding: 8px 12px;
  font-size: 12px;
  background: ${props => props.theme.colors.background};
  border-top: 1px solid ${props => props.theme.colors.border};
  color: ${props => props.theme.colors.text};
  transition: all 0.3s ease;
`;

export const TvLegendTime = styled.span<{ theme: Theme }>`
  color: ${props => props.theme.colors.textSecondary};
  transition: color 0.3s ease;
`;

// 图表信息样式
export const ChartInfo = styled.div<{ theme: Theme }>`
  margin: 2rem 0;
  padding: 1.5rem;
  background: ${props => props.theme.colors.surface};
  border-radius: 8px;
  box-shadow: 0 2px 4px ${props => props.theme.colors.shadow};
  text-align: left;
  border: 1px solid ${props => props.theme.colors.border};
  transition: all 0.3s ease;
`;

export const ChartInfoTitle = styled.h3<{ theme: Theme }>`
  color: ${props => props.theme.colors.text};
  margin-bottom: 1rem;
  text-align: center;
  transition: color 0.3s ease;
`;

export const ChartInfoList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

export const ChartInfoItem = styled.li<{ theme: Theme }>`
  margin: 0.5rem 0;
  padding: 0.5rem;
  background: ${props => props.theme.colors.background};
  border-radius: 4px;
  border-left: 3px solid ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.text};
  transition: all 0.3s ease;

  strong {
    color: ${props => props.theme.colors.primary};
  }
`;
