import React from "react";
import styled from "styled-components";
import ThemeToggle from "../components/ThemeToggle";
import type { Theme } from "../components/styled/App.styled";

interface SettingsPageProps {
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

const SettingsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;
  max-width: 1000px;
  margin: 0 auto;
`;

const SettingsCard = styled.div<{ theme: Theme }>`
  background: ${props => props.theme.colors.surface};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 12px;
  padding: 2rem;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px ${props => props.theme.colors.shadow};
`;

const CardTitle = styled.h3<{ theme: Theme }>`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: ${props => props.theme.colors.text};
  transition: color 0.3s ease;
`;

const SettingItem = styled.div<{ theme: Theme }>`
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

const SettingInfo = styled.div`
  flex: 1;
`;

const SettingLabel = styled.div<{ theme: Theme }>`
  font-weight: 500;
  color: ${props => props.theme.colors.text};
  margin-bottom: 0.25rem;
  transition: color 0.3s ease;
`;

const SettingDescription = styled.div<{ theme: Theme }>`
  font-size: 0.9rem;
  color: ${props => props.theme.colors.textSecondary};
  transition: color 0.3s ease;
`;

const SettingControl = styled.div`
  margin-left: 1rem;
`;

const Select = styled.select<{ theme: Theme }>`
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

const Input = styled.input<{ theme: Theme }>`
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

const Checkbox = styled.input<{ theme: Theme }>`
  width: 18px;
  height: 18px;
  accent-color: ${props => props.theme.colors.primary};
`;

const SettingsPage: React.FC<SettingsPageProps> = ({ theme }) => {
  return (
    <PageContainer theme={theme}>
      <PageTitle theme={theme}>设置</PageTitle>
      
      <SettingsGrid>
        <SettingsCard theme={theme}>
          <CardTitle theme={theme}>外观设置</CardTitle>
          
          <SettingItem theme={theme}>
            <SettingInfo>
              <SettingLabel theme={theme}>主题模式</SettingLabel>
              <SettingDescription theme={theme}>
                选择您喜欢的主题模式
              </SettingDescription>
            </SettingInfo>
            <SettingControl>
              <ThemeToggle />
            </SettingControl>
          </SettingItem>

          <SettingItem theme={theme}>
            <SettingInfo>
              <SettingLabel theme={theme}>图表主题</SettingLabel>
              <SettingDescription theme={theme}>
                设置图表显示的主题
              </SettingDescription>
            </SettingInfo>
            <SettingControl>
              <Select theme={theme}>
                <option value="light">白天</option>
                <option value="dark">黑夜</option>
                <option value="auto">跟随系统</option>
              </Select>
            </SettingControl>
          </SettingItem>
        </SettingsCard>

        <SettingsCard theme={theme}>
          <CardTitle theme={theme}>图表设置</CardTitle>
          
          <SettingItem theme={theme}>
            <SettingInfo>
              <SettingLabel theme={theme}>默认图表高度</SettingLabel>
              <SettingDescription theme={theme}>
                设置图表的默认高度（像素）
              </SettingDescription>
            </SettingInfo>
            <SettingControl>
              <Input theme={theme} type="number" defaultValue="500" min="300" max="800" />
            </SettingControl>
          </SettingItem>

          <SettingItem theme={theme}>
            <SettingInfo>
              <SettingLabel theme={theme}>自动刷新</SettingLabel>
              <SettingDescription theme={theme}>
                启用数据自动刷新
              </SettingDescription>
            </SettingInfo>
            <SettingControl>
              <Checkbox theme={theme} type="checkbox" defaultChecked />
            </SettingControl>
          </SettingItem>

          <SettingItem theme={theme}>
            <SettingInfo>
              <SettingLabel theme={theme}>刷新间隔</SettingLabel>
              <SettingDescription theme={theme}>
                数据刷新间隔（秒）
              </SettingDescription>
            </SettingInfo>
            <SettingControl>
              <Select theme={theme}>
                <option value="5">5秒</option>
                <option value="10">10秒</option>
                <option value="30">30秒</option>
                <option value="60">1分钟</option>
              </Select>
            </SettingControl>
          </SettingItem>
        </SettingsCard>

        <SettingsCard theme={theme}>
          <CardTitle theme={theme}>数据设置</CardTitle>
          
          <SettingItem theme={theme}>
            <SettingInfo>
              <SettingLabel theme={theme}>数据源</SettingLabel>
              <SettingDescription theme={theme}>
                选择数据来源
              </SettingDescription>
            </SettingInfo>
            <SettingControl>
              <Select theme={theme}>
                <option value="demo">演示数据</option>
                <option value="api">API数据</option>
                <option value="ws">WebSocket</option>
              </Select>
            </SettingControl>
          </SettingItem>

          <SettingItem theme={theme}>
            <SettingInfo>
              <SettingLabel theme={theme}>缓存数据</SettingLabel>
              <SettingDescription theme={theme}>
                缓存历史数据以提高性能
              </SettingDescription>
            </SettingInfo>
            <SettingControl>
              <Checkbox theme={theme} type="checkbox" defaultChecked />
            </SettingControl>
          </SettingItem>
        </SettingsCard>

        <SettingsCard theme={theme}>
          <CardTitle theme={theme}>通知设置</CardTitle>
          
          <SettingItem theme={theme}>
            <SettingInfo>
              <SettingLabel theme={theme}>价格提醒</SettingLabel>
              <SettingDescription theme={theme}>
                启用价格变动提醒
              </SettingDescription>
            </SettingInfo>
            <SettingControl>
              <Checkbox theme={theme} type="checkbox" />
            </SettingControl>
          </SettingItem>

          <SettingItem theme={theme}>
            <SettingInfo>
              <SettingLabel theme={theme}>邮件通知</SettingLabel>
              <SettingDescription theme={theme}>
                通过邮件接收重要通知
              </SettingDescription>
            </SettingInfo>
            <SettingControl>
              <Checkbox theme={theme} type="checkbox" />
            </SettingControl>
          </SettingItem>
        </SettingsCard>
      </SettingsGrid>
    </PageContainer>
  );
};

export default SettingsPage;
