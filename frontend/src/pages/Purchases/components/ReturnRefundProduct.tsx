/* eslint-disable no-unused-vars */
import React from 'react';
import styled from 'styled-components';
import { Text } from 'ui/Typography';
import Button from 'ui/Button';
import p2 from 'assets/images/p2.png';

interface IReturnRefundProductProps {
  data: any;
  handleChangeAmount: (id: number, amount: number) => void;
  handleChangeCheck: (id: number, checked: boolean) => void;
}

const ReturnRefundProduct: React.FC<IReturnRefundProductProps> = (
  props: IReturnRefundProductProps
) => {
  const { data, handleChangeAmount, handleChangeCheck } = props;

  return (
    <Container>
      <ImageWrapper>
        <img src={p2} alt='img' />
      </ImageWrapper>
      <Content>
        <Name>{data.name}</Name>
        <SizeAndColor>
          <Text strong $color='black'>
            Size
          </Text>
          <SizeButton>{data.size}</SizeButton>
          <Text strong $color='black'>
            Color
          </Text>
          <ColorButton>
            {' '}
            <Color /> {data.color}
          </ColorButton>
        </SizeAndColor>
        <Shipping>
          <ShippingTitle>Shipping Address:</ShippingTitle>
          <ShippingAddress $color='black'>{data.addr}</ShippingAddress>
        </Shipping>
      </Content>
      <Amount>
        <AddPlusButton $bgType='accent' $color='white'>Rate</AddPlusButton>
      </Amount>
      <Price>
        <Status>{data.status === 'wait' ? 'Refund Request Processing' : 'Refund Completed'}</Status>
        <PriceText>{(data.price * data.amount).toFixed(2)} ETH</PriceText>
      </Price>
    </Container>
  );
};

const Price = styled.div`
  position: relative;
  top: -45px;
  width: 230px;
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
  border-radius: 8px;
  font-size: 16px;
  width: 150px;
  margin: 0 10px;
  font-weight: bold;
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
  top: -65px;
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
`;

const SizeButton = styled(Button)`
  width: 60px;
  height: 32px;
  color: black;
  font-weight: bold;
  background: #a5a6f6;
  border: none;
  box-sizing: border-box;
  border-radius: 8px;
  margin: 0 30px 0 15px;
`;

const ColorButton = styled(Button)`
  width: 100px;
  height: 32px;
  color: #4f4f4fcc;
  font-weight: 400;
  background: #a5a6f6;
  border: none;
  box-sizing: border-box;
  border-radius: 8px;
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
  align-items: center;
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
