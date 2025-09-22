import { type OrderBookEntry } from "@/hooks/useOrderBookWebSocket";
import styled from "styled-components";

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
  console.log("asks123", orders);

  if (!orders || orders.length === 0) return null;

  return (
    <OrderListStyled>
      {orders?.slice(0, 10)?.map((order, index) => {
        // Generate a unique row ID
        const rowId = `${type}-${index}`;

        return (
          <OrderListRowStyled key={rowId}>
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

const OrderListStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  overflow-y: auto;
  padding-right: 5%;
  font-size: 12px;
`;

const OrderListRowStyled = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
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

export default OrderList;
