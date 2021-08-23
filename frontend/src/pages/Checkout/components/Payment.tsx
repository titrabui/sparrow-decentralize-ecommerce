import React from 'react';
import Box from 'ui/Box';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Button from 'ui/Button';
import { Text } from 'ui/Typography';
import { Checkbox, Radio } from 'antd';

interface IPaymentProps {
  setStep: any;
}
const Payment: React.FC<IPaymentProps> = (props: IPaymentProps) => {
  const { setStep } = props;

  return (
    <Container>
      <Method>
        <Title>Billing Address</Title>
        <RadioContainer>
          <Radio />
          Same as shipping address
        </RadioContainer>
        <RadioContainer>
          <Radio />
          Use a different billing address
        </RadioContainer>
      </Method>
      <Method>
        <Title>Remember Me</Title>
        <RadioContainer>
          <Checkbox />
          Save my information for a faster checkout
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
        <Button $bgType='accent' onClick={() => setStep(4)}>
          Completed Order
        </Button>
      </Navigation>
    </Container>
  );
};

const RadioContainer = styled.div`
  display: flex;
  width: 100%;
  margin-top: 10px;
  align-items: center;
  .ant-radio {
    margin-right: 5px;
  }
  .ant-checkbox {
    margin-right: 10px;
  }
  color: black;
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
export default Payment;
