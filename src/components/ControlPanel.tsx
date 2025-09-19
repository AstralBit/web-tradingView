import React from "react";
import ThemeToggle from "./ThemeToggle";
import {
  ControlPanel as StyledControlPanel,
  ControlPanelTitle,
  Controls,
  ControlLabel,
} from "./styled/App.styled";
import type { Theme } from "./styled/App.styled";

interface ControlPanelProps {
  theme: Theme;
  useSampleData: boolean;
  showVolume: boolean;
  showLine: boolean;
  showCandlestick: boolean;
  onUseSampleDataChange: (checked: boolean) => void;
  onShowVolumeChange: (checked: boolean) => void;
  onShowLineChange: (checked: boolean) => void;
  onShowCandlestickChange: (checked: boolean) => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  theme,
  useSampleData,
  showVolume,
  showLine,
  showCandlestick,
  onUseSampleDataChange,
  onShowVolumeChange,
  onShowLineChange,
  onShowCandlestickChange,
}) => {
  return (
    <StyledControlPanel theme={theme}>
      <ControlPanelTitle theme={theme}>图表控制面板</ControlPanelTitle>

      <Controls>
        <ControlLabel theme={theme}>
          <input
            type="checkbox"
            checked={useSampleData}
            onChange={(e) => onUseSampleDataChange(e.target.checked)}
          />
          使用示例数据
        </ControlLabel>
        <ControlLabel theme={theme}>
          <input
            type="checkbox"
            checked={showCandlestick}
            onChange={(e) => onShowCandlestickChange(e.target.checked)}
          />
          显示K线图
        </ControlLabel>
        <ControlLabel theme={theme}>
          <input
            type="checkbox"
            checked={showLine}
            onChange={(e) => onShowLineChange(e.target.checked)}
          />
          显示折线图
        </ControlLabel>
        <ControlLabel theme={theme}>
          <input
            type="checkbox"
            checked={showVolume}
            onChange={(e) => onShowVolumeChange(e.target.checked)}
          />
          显示成交量
        </ControlLabel>
      </Controls>

      {/* 主题切换组件 */}
      <div
        style={{
          marginTop: "1rem",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <ThemeToggle />
      </div>
    </StyledControlPanel>
  );
};

export default ControlPanel;
