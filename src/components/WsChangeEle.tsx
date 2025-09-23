import OrderList from "./OrderList";
import { useOrderBookDealData } from "@/hooks/useOrderBookDealData";
import styled from "styled-components";
import OrderBookHeader from "./OrderBookHeader";

const WsChangeEleStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 0 10px;
`;

const WsChangeEle = () => {
  const {
    orderBookDealData,
    isLoading,
    animatingAsks,
    animatingBids,
    maxVolume,
  } = useOrderBookDealData();

  if (isLoading) return <div>连接中...</div>;
  // if (error) return <div>错误: {error.message}</div>;
  if (!orderBookDealData) return <div>暂无数据</div>;

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

export default WsChangeEle;
