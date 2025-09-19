import React from "react";
import ThemeToggle from "@/components/ThemeToggle";
import type { Theme } from "@/components/styled/App.styled";
import {
  PageContainer,
  PageTitle,
  SettingsGrid,
  SettingsCard,
  CardTitle,
  SettingItem,
  SettingInfo,
  SettingLabel,
  SettingDescription,
  SettingControl,
  Select,
  Input,
  Checkbox,
} from "@/pages/styles/SettingsPage.styled";

interface SettingsPageProps {
  theme: Theme;
}

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
