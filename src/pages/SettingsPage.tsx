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
      <PageTitle theme={theme}>Settings</PageTitle>
      
      <SettingsGrid>
        <SettingsCard theme={theme}>
          <CardTitle theme={theme}>Appearance Settings</CardTitle>
          
          <SettingItem theme={theme}>
            <SettingInfo>
              <SettingLabel theme={theme}>Theme Mode</SettingLabel>
              <SettingDescription theme={theme}>
                Select your favorite theme mode
              </SettingDescription>
            </SettingInfo>
            <SettingControl>
              <ThemeToggle />
            </SettingControl>
          </SettingItem>

          <SettingItem theme={theme}>
            <SettingInfo>
              <SettingLabel theme={theme}>Chart Theme</SettingLabel>
              <SettingDescription theme={theme}>
                Set the theme for the chart display
              </SettingDescription>
            </SettingInfo>
            <SettingControl>
              <Select theme={theme}>
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="auto">Follow System</option>
              </Select>
            </SettingControl>
          </SettingItem>
        </SettingsCard>

        <SettingsCard theme={theme}>
          <CardTitle theme={theme}>Chart Settings</CardTitle>
          
          <SettingItem theme={theme}>
            <SettingInfo>
              <SettingLabel theme={theme}>Default Chart Height</SettingLabel>
              <SettingDescription theme={theme}>
                Set the default height of the chart (pixels)
              </SettingDescription>
            </SettingInfo>
            <SettingControl>
              <Input theme={theme} type="number" defaultValue="500" min="300" max="800" />
            </SettingControl>
          </SettingItem>

          <SettingItem theme={theme}>
            <SettingInfo>
              <SettingLabel theme={theme}>Auto Refresh</SettingLabel>
              <SettingDescription theme={theme}>
                Enable automatic data refresh
              </SettingDescription>
            </SettingInfo>
            <SettingControl>
              <Checkbox theme={theme} type="checkbox" defaultChecked />
            </SettingControl>
          </SettingItem>

          <SettingItem theme={theme}>
            <SettingInfo>
              <SettingLabel theme={theme}>Refresh Interval</SettingLabel>
              <SettingDescription theme={theme}>
                Data refresh interval (seconds)
              </SettingDescription>
            </SettingInfo>
            <SettingControl>
              <Select theme={theme}>
                <option value="5">5 seconds</option>
                <option value="10">10 seconds</option>
                <option value="30">30 seconds</option>
                <option value="60">1 minute</option>
              </Select>
            </SettingControl>
          </SettingItem>
        </SettingsCard>

        <SettingsCard theme={theme}>
          <CardTitle theme={theme}>Data Settings</CardTitle>
          
          <SettingItem theme={theme}>
            <SettingInfo>
              <SettingLabel theme={theme}>Data Source</SettingLabel>
              <SettingDescription theme={theme}>
                Select the data source
              </SettingDescription>
            </SettingInfo>
            <SettingControl>
              <Select theme={theme}>
                <option value="demo">Demo Data</option>
                <option value="api">API Data</option>
                <option value="ws">WebSocket</option>
              </Select>
            </SettingControl>
          </SettingItem>

          <SettingItem theme={theme}>
            <SettingInfo>
              <SettingLabel theme={theme}>Cache Data</SettingLabel>
              <SettingDescription theme={theme}>
                Cache historical data to improve performance
              </SettingDescription>
            </SettingInfo>
            <SettingControl>
              <Checkbox theme={theme} type="checkbox" defaultChecked />
            </SettingControl>
          </SettingItem>
        </SettingsCard>

        <SettingsCard theme={theme}>
          <CardTitle theme={theme}>Notification Settings</CardTitle>
          
          <SettingItem theme={theme}>
            <SettingInfo>
              <SettingLabel theme={theme}>Price Alert</SettingLabel>
              <SettingDescription theme={theme}>
                Enable price change alert
              </SettingDescription>
            </SettingInfo>
            <SettingControl>
              <Checkbox theme={theme} type="checkbox" />
            </SettingControl>
          </SettingItem>

          <SettingItem theme={theme}>
            <SettingInfo>
              <SettingLabel theme={theme}>Email Notification</SettingLabel>
              <SettingDescription theme={theme}>
                Receive important notifications via email
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
