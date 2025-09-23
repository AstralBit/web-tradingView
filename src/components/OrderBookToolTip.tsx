import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import { useTheme } from "@/contexts/ThemeContext";

interface OrderBookToolTipProps {
  isVisible: boolean;
  position: { x: number; y: number };
  content?: React.ReactNode;
  targetElement?: HTMLElement | null;
  onPositionUpdate?: (element: HTMLElement) => void;
}

const OrderBookToolTip = ({
  isVisible,
  position,
  content,
  targetElement,
  onPositionUpdate,
}: OrderBookToolTipProps) => {
  const [currentPosition, setCurrentPosition] = useState(position);
  const { theme: contextTheme } = useTheme();

  // 监听滚动和窗口大小变化，更新位置并触发内容重新计算
  useEffect(() => {
    if (!isVisible || !targetElement) return;

    const updatePosition = () => {
      if (targetElement) {
        const rect = targetElement.getBoundingClientRect();
        const newPosition = {
          x: rect.left - 150 - 10, // 向左偏移弹窗宽度
          y: rect.top - 40 + 10, // 垂直居中
        };
        setCurrentPosition(newPosition);
        
        // 触发父组件重新计算内容
        if (onPositionUpdate) {
          onPositionUpdate(targetElement);
        }
      }
    };

    // 初始位置更新
    updatePosition();

    // 监听滚动事件
    const handleScroll = () => updatePosition();
    const handleResize = () => updatePosition();

    window.addEventListener('scroll', handleScroll, true);
    window.addEventListener('resize', handleResize);
    document.addEventListener('scroll', handleScroll, true);

    return () => {
      window.removeEventListener('scroll', handleScroll, true);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('scroll', handleScroll, true);
    };
  }, [isVisible, targetElement]); // 移除 onPositionUpdate 依赖

  if (!isVisible) return null;

  return createPortal(
    <OrderBookToolTipStyled
      style={{
        left: currentPosition.x,
        top: currentPosition.y,
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
