import React from 'react';
import styled from 'styled-components';
import Box from 'ui/Box';
import { Text } from 'ui/Typography';
import Button from 'ui/Button';

interface IRightProps {
  total: number;
}

const Right: React.FC<IRightProps> = (props: IRightProps) => {
  const { total } = props;

  return (
    <Container w='1200px' h='400px'>
      <Address>
        <AddressTitle>Shipping Address</AddressTitle>
        <AddressContent>368 Tran Hung Dao, An Hai Tay, Sơn Tra, Da Nang</AddressContent>
      </Address>
      <Summary>
        <SummaryTitle>ORDER SUMMARY (02 Items)</SummaryTitle>
        <SummaryContent>
          Subtotal :{' '}
          <Text strong $color='#4F4F4F' $size='18px'>
            {total.toFixed(2)} ETH
          </Text>
        </SummaryContent>
        <SummaryContent>
          Shipping Fee :{' '}
          <Text strong $color='#4F4F4F' $size='18px'>
            {' '}
            0 ETH
          </Text>
        </SummaryContent>
      </Summary>
      <Checkout>
        <CheckoutContent>
          <Text strong $color='#4F4F4F'>
            Total :{' '}
          </Text>
          <Text strong $color='#4F4F4F' $size='18px'>
            {' '}
            {total.toFixed(2)} ETH
          </Text>
          <StyledButton>CHECK OUT</StyledButton>
        </CheckoutContent>
      </Checkout>
    </Container>
  );
};

const StyledButton = styled(Button)`
  background: #e86c13;
  border: 3px solid #ffffff;
  border-radius: 8px;
  color: white;
  height: 40px;
  font-weight: bold;
  &:hover {
    background: #e86c13;
    border: 3px solid #ffffff;
    color: white;
  }
  display: block;
  position: absolute;
  bottom: 20px;
  width: 250px;
  right: 15px;
`;

const Container = styled(Box)`
  background: white;
  border-radius: 24px;
  position: relative;
  width: 280px;
  height: 450px;
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

const AddressContent = styled(Text)`
  font-size: 14px;
  color: #4f4f4fcc;
  width: 200px;
  display: block; ;
`;

export default Right;