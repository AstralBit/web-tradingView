import { type OrderBookEntry } from "@/hooks/useOrderBookWebSocket";
import type {
  MouseEvent as ReactMouseEvent,
  TouchEvent as ReactTouchEvent,
} from "react";
import { useState } from "react";
import styled, { keyframes, css } from "styled-components";
import OrderBookToolTip from "./OrderBookToolTip";
import { useTheme } from "@/contexts/ThemeContext";
const OrderList = ({
  orders,
  type,
  maxVolume,
  animatingOrders,
}: {
  orders?: OrderBookEntry[];
  type: "ask" | "bid";
  maxVolume: number;
  animatingOrders: Record<number, boolean>;
}) => {
  const displayOrders = orders?.slice(0, 10);

  const [currentRowId, setCurrentRowId] = useState<string | null>(null);
  const [showToolTip, setShowToolTip] = useState<boolean>(false);
  const [tooltipPosition, setTooltipPosition] = useState<{
    x: number;
    y: number;
  }>({ x: 0, y: 0 });

  const handleOrderRowMouseEnter = (
    e: ReactMouseEvent,
    type: "ask" | "bid",
    price: number,
    amount: number,
    total: number,
    sum: number,
    totalSum: number,
    rowId: string
  ) => {
    console.log(
      "handleOrderRowMouseEnter",
      e,
      type,
      price,
      amount,
      total,
      sum,
      totalSum,
      rowId
    );
    setCurrentRowId(rowId);
    setShowToolTip(true);

    // 计算 ToolTip 位置
    const rect = e.currentTarget.getBoundingClientRect();
    const tooltipWidth = 140; // ToolTip 宽度
    const tooltipHeight = 80; // ToolTip 高度
    setTooltipPosition({
      x: rect.left - tooltipWidth - 10, // 在行左侧显示，向左偏移弹窗宽度
      y: rect.top - tooltipHeight / 2 + 10,
    });
  };
  const handleOrderRowMouseLeave = () => {
    console.log("handleOrderRowMouseLeave");
    setShowToolTip(false);
    setCurrentRowId(null);
  };
  const handleOrderRowTouch = (
    e: ReactTouchEvent,
    type: "ask" | "bid",
    price: number,
    amount: number,
    total: number,
    sum: number,
    totalSum: number,
    rowId: string
  ) => {
    console.log(
      "handleOrderRowTouch",
      e,
      type,
      price,
      amount,
      total,
      sum,
      totalSum,
      rowId
    );
  };
  const { theme } = useTheme();

  if (!orders || orders.length === 0) return null;

  return (
    <OrderListStyled>
      {displayOrders?.map((order, index) => {
        // Generate a unique row ID
        const rowId = `${type}-${index}`;
        // Calculate depth percentage for visualization
        // const sumPercentage = Math.min(
        //   (order.sum / displayOrders?.length * 100),
        //   100
        // );
        const volumePercentage = (order.amount / maxVolume) * 100;

        // Check if this order is animating
        const isAnimating = animatingOrders[order.price] || false;

        // console.log("isAnimating", isAnimating);
        const totalSum =
          displayOrders?.length > 0
            ? displayOrders[displayOrders.length - 1].sum
            : 0;

        // 判断当前行是否应该置灰（当前行ID在悬浮行ID之后）
        const shouldGrayOut = Boolean(
          currentRowId &&
            currentRowId.split("-")[1] &&
            rowId.split("-")[1] &&
            parseInt(rowId.split("-")[1]) >=
              parseInt(currentRowId.split("-")[1])
        );

        return (
          <OrderListRowStyled
            key={rowId}
            type={type}
            isAnimating={isAnimating}
            shouldGrayOut={shouldGrayOut}
            isCurrentRow={currentRowId === rowId}
            theme={theme}
            onMouseEnter={(e) =>
              handleOrderRowMouseEnter(
                e,
                type,
                order.price,
                order.amount,
                order.price * order.amount,
                order.sum,
                totalSum,
                rowId
              )
            }
            onMouseLeave={handleOrderRowMouseLeave}
            onTouchStart={(e) =>
              handleOrderRowTouch(
                e,
                type,
                order.price,
                order.amount,
                order.price * order.amount,
                order.sum,
                totalSum,
                rowId
              )
            }
          >
            <OrderProgressStyled type={type} progress={volumePercentage} />

            <OrderListRowPriceStyled type={type}>
              {order?.price?.toFixed(2)}
            </OrderListRowPriceStyled>

            <OrderListRowTAmountStyled>
              {order?.amount?.toFixed(8)}
            </OrderListRowTAmountStyled>

            <OrderListRowTotalPriceStyled>
              {order?.sum?.toFixed(4)}
            </OrderListRowTotalPriceStyled>

            <OrderBookToolTip
              isVisible={showToolTip && currentRowId === rowId}
              position={tooltipPosition}
              content={
                <OrderListRowToolTipContentStyled>
                  <div>
                    均价:{" "}
                    {(
                      displayOrders?.reduce(
                        (sum, order) => sum + order.price,
                        0
                      ) / (displayOrders?.length || 1)
                    ).toFixed(2)}
                  </div>
                  <div>
                    合计(USD):{" "}
                    {displayOrders
                      ?.reduce((sum, order) => sum + order?.price, 0)
                      ?.toFixed(2)}
                  </div>
                  <div>
                    合计(BTC):{" "}
                    {displayOrders
                      ?.reduce((sum, order) => sum + order.sum, 0)
                      ?.toFixed(4)}
                  </div>
                </OrderListRowToolTipContentStyled>
              }
            />
          </OrderListRowStyled>
        );
      })}
    </OrderListStyled>
  );
};

// 定义动画关键帧
const flashGreen = keyframes`
  0% {
    background-color: rgba(39, 173, 117, 0.15);
  }
  50% {
    background-color: rgba(39, 173, 117, 0.1);
  }
  100% {
    background-color: transparent;
  }
`;

const flashRed = keyframes`
  0% {
    background-color: rgba(240, 97, 109, 0.15);
  }
  50% {
    background-color: rgba(240, 97, 109, 0.1);
  }
  100% {
    background-color: transparent;
  }
`;

const OrderListRowToolTipContentStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const OrderListStyled = styled.div`
  display: flex;
  flex-direction: column;
  /* gap: 4px; */
  overflow-y: auto;
  padding-right: 5%;
  font-size: 12px;
`;

const OrderListRowStyled = styled.div<{
  type: "ask" | "bid";
  isAnimating: boolean;
  shouldGrayOut: boolean;
  isCurrentRow: boolean;
  theme: string;
}>`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  position: relative;
  background-color: ${({ shouldGrayOut, theme }) =>
    shouldGrayOut
      ? `${
          theme === "dark"
            ? "rgba(255, 255, 255, 0.1)"
            : "rgba(172, 169, 169, 0.1)"
        }`
      : "transparent"};
  transition: opacity 0.2s ease;
  padding: 2px 0;
  cursor: pointer;
  border-top: ${({ isCurrentRow, theme }) =>
    isCurrentRow
      ? `1px dashed ${theme === "dark" ? "#656565" : "#b4b0b0"}`
      : "none"};

  /* 添加动画效果 - 使用 css 辅助函数 */
  ${({ type, isAnimating }) =>
    isAnimating &&
    css`
      animation: ${type === "ask" ? flashRed : flashGreen} 100ms ease-out
        forwards;
    `}
`;

const OrderListRowPriceStyled = styled.div<{ type: "ask" | "bid" }>`
  display: flex;
  justify-content: right;
  align-items: center;
  color: ${({ type }) => (type === "ask" ? "#f2495e" : "#30bf87")};
`;

const OrderListRowTAmountStyled = styled.div`
  display: flex;
  justify-content: right;
  align-items: center;
`;

const OrderListRowTotalPriceStyled = styled.div`
  display: flex;
  justify-content: right;
  align-items: center;
`;

const OrderProgressStyled = styled.div<{
  type: "ask" | "bid";
  progress: number;
}>`
  position: absolute;
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
  height: 100%;
  width: ${({ progress }) => progress}%;
  background-color: ${({ type }) => (type === "ask" ? "#f2495e" : "#30bf87")};
  opacity: 0.2;
`;

export default OrderList;
