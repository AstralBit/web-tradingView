import styled from "styled-components";
import type { Theme } from "../../components/styled/App.styled";

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

// 设置网格
export const SettingsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;
  max-width: 1000px;
  margin: 0 auto;
`;

export const SettingsCard = styled.div<{ theme: Theme }>`
  background: ${props => props.theme.colors.surface};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 12px;
  padding: 2rem;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px ${props => props.theme.colors.shadow};
`;

export const CardTitle = styled.h3<{ theme: Theme }>`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: ${props => props.theme.colors.text};
  transition: color 0.3s ease;
`;

// 设置项
export const SettingItem = styled.div<{ theme: Theme }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 0;
  border-bottom: 1px solid ${props => props.theme.colors.border};
  transition: all 0.3s ease;

  &:last-child {
    border-bottom: none;
  }
`;

export const SettingInfo = styled.div`
  flex: 1;
`;

export const SettingLabel = styled.div<{ theme: Theme }>`
  font-weight: 500;
  color: ${props => props.theme.colors.text};
  margin-bottom: 0.25rem;
  transition: color 0.3s ease;
`;

export const SettingDescription = styled.div<{ theme: Theme }>`
  font-size: 0.9rem;
  color: ${props => props.theme.colors.textSecondary};
  transition: color 0.3s ease;
`;

export const SettingControl = styled.div`
  margin-left: 1rem;
`;

// 表单控件
export const Select = styled.select<{ theme: Theme }>`
  padding: 0.5rem 1rem;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 6px;
  background: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  font-size: 0.9rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
`;

export const Input = styled.input<{ theme: Theme }>`
  padding: 0.5rem 1rem;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 6px;
  background: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  font-size: 0.9rem;
  width: 120px;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
`;

export const Checkbox = styled.input<{ theme: Theme }>`
  width: 18px;
  height: 18px;
  accent-color: ${props => props.theme.colors.primary};
`;
