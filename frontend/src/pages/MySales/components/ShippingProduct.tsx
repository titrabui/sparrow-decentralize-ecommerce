/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Text } from 'ui/Typography';
import Button from 'ui/Button';
import useWallet from 'hooks/useWallet';
import p2 from 'assets/images/p2.png';
import request from 'utils/request';
import getImage from 'utils/getImage';
import RefundModal from './RefundModal';

interface IToShipProductProps {
  data: any;
}

const ToShipProduct: React.FC<IToShipProductProps> = (props: IToShipProductProps) => {
  const { data } = props;
  const [openModal, setOpenModal] = useState(false);
  const { account, connector, library } = useWallet();
  const { quantity, price, shippingFee } = data;

  return (
    <Container>
      <RefundModal setOpenModal={setOpenModal} visible={openModal} />
      <ImageWrapper>
        <img src={getImage(data.productId)} alt='img' />
      </ImageWrapper>
      <Content>
        <Name>{data.name}</Name>
        <SizeAndColor>
          <Text strong $color='black'>
            Size
          </Text>
          <SizeButton>{data.size}</SizeButton>
          {/* <Text strong $color='black'>
            Color
          </Text>
          <ColorButton>
            {' '}
            <Color className={data?.color || ''} /> {data.color}
          </ColorButton> */}
        </SizeAndColor>
        <Shipping>
          <ShippingTitle>Shipping Address:</ShippingTitle>
          <ShippingAddress $color='black'>{data.shippingAddress}</ShippingAddress>
        </Shipping>
      </Content>
      <OrderInfo>
        <div>
          <OrderText strong>Order ID</OrderText>
          <OrderText>{data.id}</OrderText>
        </div>
        <div>
          <OrderText strong>Parcel Code</OrderText>
          <OrderText>AV90909090</OrderText>
        </div>
      </OrderInfo>
      <Price>
        <Status>{data.status === 'wait' ? 'Ready To Pickup' : 'Shipping'}</Status>
        <PriceText>{(quantity * price + shippingFee).toFixed(4)} ETH</PriceText>
      </Price>
    </Container>
  );
};
const OrderInfo = styled.div`
  div {
    margin-bottom: 10px;
    margin-top: 5px;
  }
`;
const OrderText = styled(Text)`
  color: black;
  margin-right: 20px;
`;
const Price = styled.div`
  position: relative;
  width: 210px;
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
  font-weight: bold;
`;

const Amount = styled.div`
  display: flex;
  margin-top: 15px;
  align-items: center;
  position: relative;
  top: -65px;
`;

const Shipping = styled.div`
  display: flex;
  width: 350px;
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
  width: 160px;
  height: 160px;
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

export default ToShipProduct;
