import { useMemo, useRef } from "react";
import styled from "styled-components";
import { useTheme } from "@/contexts/ThemeContext";

export type TimeFrame = "1H" | "1D" | "1W" | "1M" | "1Y" | "ALL";

const TradingViewIframeStyled = styled.div`
  height: 600px;
  background-color: #0a0b0d;
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

  // Use a ref to store the iframe element
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const initialSrc = useMemo(() => (
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
      backgroundColor: contextTheme === 'dark' ? "rgba(10,11,13,1)" : "rgba(255,255,255,1)",
      gridColor: "rgba(51,51,51,0.4)",
      upColor: "#4CAF50",
      downColor: "#F44336",
      borderUpColor: "#4CAF50",
      borderDownColor: "#F44336",
      wickUpColor: "#4CAF50",
      wickDownColor: "#F44336",
    })
  ), [contextTheme])



  return (
    <TradingViewIframeStyled>
      <iframe
        ref={iframeRef}
        src={initialSrc || ""}
        style={{
          width: "100%",
          height: "100%",
        }}
        frameBorder="0"
        scrolling="no"
        allowFullScreen
        title="TradingView BTC/USD Chart"
      />
    </TradingViewIframeStyled>
  );
};

export default TradingViewIframe;
