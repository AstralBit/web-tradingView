import { type OrderBookEntry } from "@/hooks/useOrderBookWebSocket";
import styled, { keyframes, css } from "styled-components";

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

  // console.log("animatingOrders", animatingOrders);

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

        return (
          <OrderListRowStyled key={rowId} type={type} isAnimating={isAnimating}>
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

const OrderListStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  overflow-y: auto;
  padding-right: 5%;
  font-size: 12px;
`;

const OrderListRowStyled = styled.div<{
  type: "ask" | "bid";
  isAnimating: boolean;
}>`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  position: relative;


  /* 添加动画效果 - 使用 css 辅助函数 */
  ${({ type, isAnimating }) =>
    isAnimating &&
    css`
      animation: ${type === "ask" ? flashRed : flashGreen} 100ms ease-out forwards;
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
