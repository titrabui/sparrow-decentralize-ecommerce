import React from 'react';
import Box from 'ui/Box';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Button from 'ui/Button';
import { Text } from 'ui/Typography';
import { Radio } from 'antd';

interface IShippingMethodProps {
  setStep: any;
}
const ShippingMethod: React.FC<IShippingMethodProps> = (props: IShippingMethodProps) => {
  const { setStep } = props;

  return (
    <Container>
      <Address>
        <TextContainer>
          {' '}
          <Text strong>Shipping Address</Text>
          <Text>368 Tran Hung Dao, An Hai Tay, Son Tra, Da Nang</Text>
        </TextContainer>
        <Text $color='#1890ff' strong onClick={() => {}}>
          Edit
        </Text>
      </Address>
      <Method>
        <Title>Shipping Method</Title>
        <RadioContainer>
          <Radio>UPS Ground</Radio>
          <Text strong>0.001 ETH</Text>
        </RadioContainer>
        <RadioContainer>
          <Radio>UPS 3 Day Select</Radio>
          <Text strong>0.002 ETH</Text>
        </RadioContainer>
        <RadioContainer>
          <Radio>UPS 2nd Day Air</Radio>
          <Text strong> 0.003 ETH</Text>
        </RadioContainer>
        <RadioContainer>
          <Radio>UPS Next Day Air</Radio>
          <Text strong>0.005 ETH</Text>
        </RadioContainer>
      </Method>

      <Navigation>
        <Link
          to='/'
          onClick={(e) => {
            e.preventDefault();
            setStep(1);
          }}
        >
          {'<'} Return to Customer Information
        </Link>
        <Button $bgType='accent' onClick={() => setStep(3)}>
          Continue to Payment Method
        </Button>
      </Navigation>
    </Container>
  );
};

const RadioContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-top: 10px;
`;

const Method = styled.div`
  padding: 20px 30px;
  border-bottom: 1px solid rgba(79, 79, 79, 0.2);
`;

const Title = styled(Text)`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
  display: block;
`;

const TextContainer = styled.div``;

const Address = styled.div`
  padding: 20px 30px;
  border-bottom: 1px solid rgba(79, 79, 79, 0.2);
  display: flex;
  justify-content: space-between;
  .ant-typography {
    margin-right: 10px;
  }
  .ant-typography:last-child {
    cursor: pointer;
  }
`;
const Container = styled(Box)`
  input {
    border-radius: 8px;
  }
`;

const Navigation = styled.div`
  padding: 20px 30px;
  display: flex;
  justify-content: space-between;
  button {
    font-size: 16px;
    height: auto;
  }
`;
export default ShippingMethod;
