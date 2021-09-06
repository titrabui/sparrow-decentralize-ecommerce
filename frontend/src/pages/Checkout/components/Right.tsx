/* eslint-disable no-unused-vars */
import { Input } from 'antd';
import React from 'react';
import styled from 'styled-components';
import Box from 'ui/Box';
import Button from 'ui/Button';
import { Text } from 'ui/Typography';

interface IRightProps {
  total: number;
  checkoutData: any;
}

const Right: React.FC<IRightProps> = (props: IRightProps) => {
  const { total, checkoutData } = props;
  return (
    <Container w='1200px' h='400px'>
      <Summary>
        <SummaryTitle>ORDER SUMMARY (1 Items)</SummaryTitle>
        <SummaryContent>
          Subtotal :{' '}
          <Text strong $color='#4F4F4F' $size='18px'>
            {(checkoutData?.price * checkoutData?.amount || 0).toFixed(2)} ETH
          </Text>
        </SummaryContent>
        <SummaryContent>
          Shipping Fee :{' '}
          <Text strong $color='#4F4F4F' $size='18px'>
            {' '}
            {(checkoutData?.shippingFee || 0).toFixed(2)} ETH
          </Text>
        </SummaryContent>
      </Summary>
      <Address>
        <AddressTitle>Gift card or discount code</AddressTitle>
        <DiscountInput>
          <Input />
          <Button $color='black'>Apply</Button>
        </DiscountInput>
      </Address>
      <Checkout>
        <CheckoutContent>
          <Text strong $color='#4F4F4F'>
            Total :{' '}
          </Text>
          <Text strong $color='#4F4F4F' $size='18px'>
            {' '}
            {(checkoutData?.price * checkoutData?.amount + checkoutData?.shippingFee || 0).toFixed(2)} ETH
          </Text>
        </CheckoutContent>
      </Checkout>
    </Container>
  );
};

const Container = styled(Box)`
  background: white;
  border-radius: 24px;
  position: relative;
  width: 330px;
  height: 350px;
`;

const Summary = styled.div`
  margin: 20px 0;
  border-bottom: 1px solid rgba(79, 79, 79, 0.2);
  padding: 0 0 10px 30px;
`;

const SummaryContent = styled.div`
  display: flex;
  justify-content: space-between;
  margin-right: 25px;
  margin-bottom: 10px;
  align-items: center;
`;

const SummaryTitle = styled(Text)`
  font-size: 14px;
  font-weight: bold;
  color: #4f4f4f;
  display: block;
  margin-bottom: 20px;
`;

const Checkout = styled.div`
  margin: 20px 0;
  padding: 0 0 10px 30px;
`;

const CheckoutContent = styled.div`
  display: flex;
  justify-content: space-between;
  margin-right: 25px;
  margin-bottom: 10px;
  align-items: center;
`;

const Address = styled.div`
  margin: 20px 0;
  border-bottom: 1px solid rgba(79, 79, 79, 0.2);
  padding: 0 0 20px 30px;
`;

const AddressTitle = styled(Text)`
  font-size: 14px;
  font-weight: bold;
  color: #4f4f4f;
  display: block;
`;

const DiscountInput = styled(Text)`
  font-size: 14px;
  color: #4f4f4fcc;
  width: 280px;
  display: flex;
  margin-top: 10px;
  input {
    margin-right: 10px;
    border-radius: 8px;
  }
  button {
    border-radius: 8px;
  }
`;

export default Right;
