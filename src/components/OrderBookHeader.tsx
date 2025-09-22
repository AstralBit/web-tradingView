import styled from "styled-components";

const OrderBookHeader = () => {
  const OrderBookHeaderTitle = [
    {
      title: "Amount",
      unit: "BTC",
    },
    {
      title: "Price",
      unit: "USD",
    },
    {
      title: "Sum",
      unit: "BTC",
    },
  ];

  return (
    <OrderBookHeaderStyled>
      {OrderBookHeaderTitle.map((item, index) => (
        <OrderBookHeaderTitleStyled key={index}>
          {item.title} ({item.unit})
        </OrderBookHeaderTitleStyled>
      ))}
    </OrderBookHeaderStyled>
  );
};

const OrderBookHeaderStyled = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  padding-right: 5%;
`;

const OrderBookHeaderTitleStyled = styled.div`
  display: flex;
  justify-content: right;
  align-items: center;
`;

export default OrderBookHeader;
