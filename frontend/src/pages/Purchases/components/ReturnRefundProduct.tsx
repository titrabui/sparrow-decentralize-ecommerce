/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Text } from 'ui/Typography';
import Button from 'ui/Button';
import request from 'utils/request';
import p2 from 'assets/images/p2.png';
import useWallet from 'hooks/useWallet';
import { ORDER_STATUS } from 'utils/constants';

interface IReturnRefundProductProps {
  data: any;
}

const ReturnRefundProduct: React.FC<IReturnRefundProductProps> = (
  props: IReturnRefundProductProps
) => {
  const { data } = props;

  const { library } = useWallet();
  const [newOrder, setNewOrder] = useState({ name: null, size: null, color: null, shippingAddress: null });
  const quantity = data[6];
  const price = library?.utils?.fromWei(data[7], 'ether');
  const shippingFee = library?.utils?.fromWei(data[8], 'ether');

  let orderStatus;
  if (data[4] === ORDER_STATUS.REQUEST_REFUND) {
    orderStatus = 'Refund Request Processing';
  } else if (data[4] === ORDER_STATUS.REJECT_REFUND) {
    orderStatus = 'Request has been rejected';
  } else {
    orderStatus = 'Refund Completed';
  }

  useEffect(() => {
    const fetchOrder = async () => {
      const response = await request.getData(`/orders/${data[0]}`, {})
      setNewOrder(response.data[0])
    }
    fetchOrder();
  }, [data]);

  return (
    <Container>
      <ImageWrapper>
        <img src={p2} alt='img' />
      </ImageWrapper>
      <Content>
        <Name>{newOrder.name}</Name>
        <SizeAndColor>
          <Text strong $color='black'>
            Size
          </Text>
          <SizeButton>{newOrder.size}</SizeButton>
          <Text strong $color='black'>
            Color
          </Text>
          <ColorButton>
            {' '}
            <Color className={newOrder?.color || ''} /> {newOrder.color}
          </ColorButton>
        </SizeAndColor>
        <Shipping>
          <ShippingTitle>Shipping Address:</ShippingTitle>
          <ShippingAddress $color='black'>{newOrder.shippingAddress}</ShippingAddress>
        </Shipping>
        <Shipping>
          <ShippingTitle>Order ID</ShippingTitle>
          <ShippingAddress $color='black'>{data[0]}</ShippingAddress>
        </Shipping>
      </Content>
      <Amount>
        <AddPlusButton $bgType='accent'>Rate</AddPlusButton>
      </Amount>
      <Price>
        <Status>{orderStatus}</Status>
        <PriceText>{(quantity * price) + parseFloat(shippingFee)} ETH</PriceText>
      </Price>
    </Container>
  );
};

const Price = styled.div`
  position: relative;
  width: 230px;
  margin-top:5px;
`;

const PriceText = styled(Text)`
  font-size: 24px;
  color: #e86c13;
  display: block;
  text-align: right;
`;

const Status = styled(Text)`
  font-size: 18px;
  color: #e86c13;
  display: block;
  text-align: right;
`;
const AddPlusButton = styled(Button)`
  box-shadow: 0px 4px 12px rgba(41, 43, 50, 0.04);
  font-size: 16px;
  width: 150px;
  margin: 0 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px;
`;

const Amount = styled.div`
  display: flex;
  margin-top: 15px;
  align-items: center;
  position: relative;
`;

const Shipping = styled.div`
  display: flex;
  width: 300px;
  .ant-typography {
    display: block;
  }
  margin-top: 15px;
`;

const ShippingTitle = styled(Text)`
  font-weight: bold;
  color: black;
  width: 140px;
  font-size: 14px;
`;

const ShippingAddress = styled(Text)`
  width: 180px;
  font-size: 14px;
`;

const Color = styled.div`
  display: inline-block;
  width: 20px;
  height: 20px;
  background: #ebebeb;
  border: 2px solid #ffffff;
  box-sizing: border-box;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.2);
  border-radius: 50%;
  margin-right: 5px;
  &.White {
    background: #ebebeb;
  }
  &.Orange {
    background: #e86c13;
  }
  &.Violet {
    background: #7b61ff;
  }
`;

const SizeButton = styled(Button)`
  width: 60px;
  height: 32px;
  color: black;
  background: #a5a6f6;
  border: none;
  box-sizing: border-box;
  margin: 0 30px 0 15px;
`;

const ColorButton = styled(Button)`
  width: 110px;
  height: 32px;
  color: #4f4f4fcc;
  font-weight: 400;
  background: #a5a6f6;
  border: none;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 30px 0 15px;
`;

const SizeAndColor = styled(Text)`
  display: flex;
  align-items: center;
`;

const Name = styled(Text)`
  font-size: 22px;
  font-weight: 400;
  display: block;
  margin-bottom: 10px;
`;

const Content = styled.div`
  margin-left: 20px;
`;

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 20px;
  justify-content: space-between;
  position: relative;
  border-bottom: 1px solid rgba(79, 79, 79, 0.2);
`;

const ImageWrapper = styled.div`
  width: 140px;
  height: 150px;
  background: radial-gradient(
    50% 50% at 50% 50%,
    rgba(255, 255, 255, 0.25) 0%,
    rgba(255, 255, 255, 0.5) 94.27%
  );
  border: 1px solid #cfcfcf;
  box-sizing: border-box;
  backdrop-filter: blur(40px);
  border-radius: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: 85%;
  }
`;

export default ReturnRefundProduct;
