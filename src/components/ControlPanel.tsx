import React from "react";
import {
  ControlPanel as StyledControlPanel,
  Controls,
  ControlLabel,
} from "@/components/styled/App.styled";
import type { Theme } from "@/components/styled/App.styled";

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
    </StyledControlPanel>
  );
};

export default ControlPanel;
