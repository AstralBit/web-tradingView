import OrderList from "./OrderList";
import { useOrderBookDealData } from "@/hooks/useOrderBookDealData";
import styled from "styled-components";
import OrderBookHeader from "./OrderBookHeader";
import { useTheme } from "@/contexts/ThemeContext";
import { ScaleLoader } from "react-spinners";

const OrderBook = () => {
  const {
    orderBookDealData,
    isLoading,
    animatingAsks,
    animatingBids,
    maxVolume,
  } = useOrderBookDealData();
  const { theme: contextTheme } = useTheme();

  // if (isLoading)
  //   return (
  //     <WsChangeEleLoadingStyled>
  //       <ScaleLoader color={contextTheme === "dark" ? "#ffffff" : "#000000"} />
  //     </WsChangeEleLoadingStyled>
  //   );
  // if (error) return <div>错误: {error.message}</div>;
  if (!orderBookDealData || isLoading)
    return (
      <WsChangeEleLoadingStyled>
        <ScaleLoader color={contextTheme === "dark" ? "#ffffff" : "#000000"} />
      </WsChangeEleLoadingStyled>
    );

  const { asks, bids } = orderBookDealData || { asks: [], bids: [] };

  return (
    <WsChangeEleStyled>
      <OrderBookHeader />
      <OrderList
        orders={asks}
        type="ask"
        maxVolume={maxVolume}
        animatingOrders={animatingAsks}
      />
      <OrderList
        orders={bids}
        type="bid"
        maxVolume={maxVolume}
        animatingOrders={animatingBids}
      />
    </WsChangeEleStyled>
  );
};

const WsChangeEleStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 0 10px;
`;

const WsChangeEleLoadingStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;

export default OrderBook;
