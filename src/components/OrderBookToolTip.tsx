import React from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import { useTheme } from "@/contexts/ThemeContext";

interface OrderBookToolTipProps {
  isVisible: boolean;
  position: { x: number; y: number };
  content?: React.ReactNode;
}

const OrderBookToolTip = ({
  isVisible,
  position,
  content,
}: OrderBookToolTipProps) => {
  if (!isVisible) return null;

  // 使用主题上下文
  const { theme: contextTheme } = useTheme();

  return createPortal(
    <OrderBookToolTipStyled
      style={{
        left: position.x,
        top: position.y,
      }}
      theme={contextTheme}
    >
      {content || "test"}
    </OrderBookToolTipStyled>,
    document.body
  );
};

const OrderBookToolTipStyled = styled.div<{ theme: string }>`
  position: fixed;
  min-width: 140px;
  height: 80px;
  z-index: 999999;
  border-radius: 4px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  padding: 8px;
  font-size: 12px;
  pointer-events: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
    background-color: ${({ theme }) =>
    theme === "dark" ? "#39393a" : "#ffffff"};

  /* 向右的三角符号 */
  &::after {
    content: "";
    position: absolute;
    left: 100%;
    top: 50%;
    transform: translateY(-50%);
    width: 0;
    height: 0;
    border-left: 6px solid ${({ theme }) =>
      theme === "dark" ? "#3a3b3c" : "#ffffff"};
    border-top: 6px solid transparent;
    border-bottom: 6px solid transparent;
  }

  /* 三角符号的边框 */
  &::before {
    content: "";
    position: absolute;
    left: 100%;
    top: 50%;
    transform: translateY(-50%);
    width: 0;
    height: 0;
    border-left: 7px solid ${({ theme }) =>
      theme === "dark" ? "#3a3b3c" : "#ffffff"};
    border-top: 7px solid transparent;
    border-bottom: 7px solid transparent;
    z-index: -1;
  }
`;

export default OrderBookToolTip;
