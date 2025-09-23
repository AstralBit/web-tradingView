import { useMemo, useRef, useState } from "react";
import styled from "styled-components";
import { ScaleLoader } from "react-spinners";
import { useTheme } from "@/contexts/ThemeContext";
import OrderBook from "./OrderBook";

export type TimeFrame = "1H" | "1D" | "1W" | "1M" | "1Y" | "ALL";

// 主容器组件
const TradingViewIframeStyled = styled.div`
  display: grid;
  /* 默认左右布局，右侧320px */
  grid-template-columns: 70% 30%;

  /* 768px以下变为上下布局 */
  @media (max-width: 768px) {
    grid-template-columns: 1fr; /* 单列布局 */
    grid-template-rows: auto auto; /* 两行自动高度 */
  }
`;

// 左侧内容区域
const LeftPanel = styled.div`
  width: 100%;
  height: 500px;
`;

// 右侧内容区域（固定320px宽）
const RightPanel = styled.div`
  /* 在桌面视图中固定宽度，与grid布局保持一致 */
  width: 100%;
  /* 在移动视图中占满宽度 */
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const buildTradingViewUrl = (config: Record<string, string>) => {
  const params = new URLSearchParams();

  params.set("interval", config.interval || "1D");
  params.set("symbol", config.symbol || "BITFINEX:BTCUSD");
  params.set("theme", config.theme || "dark");
  params.set("style", config.style || "1");
  params.set("locale", config.locale || "en");
  params.set("enable_publishing", config.enable_publishing || "false");
  params.set("allow_symbol_change", config.allow_symbol_change || "false");
  params.set("hide_side_toolbar", config.hide_side_toolbar || "false");
  params.set("save_image", config.save_image || "false");
  params.set("studies", config.studies || "[]");
  params.set("backgroundColor", config.backgroundColor || "rgba(10,11,13,1)");
  params.set("gridColor", config.gridColor || "rgba(51,51,51,0.4)");
  params.set("upColor", config.upColor || "#4CAF50");
  params.set("downColor", config.downColor || "#F44336");
  // ... 其他参数

  return `https://www.tradingview.com/widgetembed/?${params.toString()}`;
};

// Mapping our app timeframes to TradingView intervals for the iframe widget
const timeframeMap: Record<TimeFrame, string> = {
  "1H": "60",
  "1D": "1D",
  "1W": "1W",
  "1M": "1M",
  "1Y": "12M",
  ALL: "all",
};

const TradingViewIframe = () => {
  // 使用主题上下文
  const { theme: contextTheme } = useTheme();

  const [isLoaded, setIsLoaded] = useState(false);

  // Use a ref to store the iframe element
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const initialSrc = useMemo(
    () =>
      buildTradingViewUrl({
        interval: timeframeMap["1D"],
        symbol: "BITFINEX:BTCUSD",
        theme: contextTheme,
        style: "1",
        locale: "en",
        enable_publishing: "false",
        allow_symbol_change: "false",
        hide_side_toolbar: "false",
        save_image: "false",
        studies: "[]",
        backgroundColor:
          contextTheme === "dark" ? "rgba(10,11,13,1)" : "rgba(255,255,255,1)",
        gridColor: "rgba(51,51,51,0.4)",
        upColor: "#4CAF50",
        downColor: "#F44336",
        borderUpColor: "#4CAF50",
        borderDownColor: "#F44336",
        wickUpColor: "#4CAF50",
        wickDownColor: "#F44336",
      }),
    [contextTheme]
  );

  const handleIframeLoad = () => {
    console.log("Iframe loaded");
    setIsLoaded(true);
  };

  return (
    <TradingViewIframeStyled>
      <LeftPanel>
        {!isLoaded && (
          <LodaingStyled theme={contextTheme}>
            <ScaleLoader
              color={contextTheme === "dark" ? "#ffffff" : "#000000"}
            />
          </LodaingStyled>
        )}
        <iframe
          ref={iframeRef}
          src={initialSrc || ""}
          onLoad={handleIframeLoad}
          style={{
            width: "100%",
            height: "100%",
          }}
          frameBorder="0"
          scrolling="no"
          allowFullScreen
          title="TradingView BTC/USD Chart"
        />
      </LeftPanel>
      <RightPanel>
        <OrderBook />
      </RightPanel>
    </TradingViewIframeStyled>
  );
};

const LodaingStyled = styled.div<{ theme: string }>`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) =>
    theme === "dark" ? "#0a0b0d" : "#ffffff"};
`;

export default TradingViewIframe;
