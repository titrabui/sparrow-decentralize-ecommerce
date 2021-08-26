import React from 'react';
import { Text } from 'ui/Typography';
import styled from 'styled-components';
import { CheckCircleOutlined } from '@ant-design/icons';

interface ICompletedProps {
  checkoutData: any;
}

const Completed: React.FC<ICompletedProps> = (props: ICompletedProps) => {
  const { checkoutData } = props;
  const {
    firstName,
    lastName,
    address,
    country,
    state,
    billingAddress,
    shippingMethod,
    orderId,
    amount,
    price,
    shippingFee
  } = checkoutData;
  return (
    <div>
      <Thankyou>
        <CheckCircleOutlined />
        <div>
          {' '}
          <Text $size='16px'>Order {orderId}</Text>
          <Text $size='24px' strong>
            Thank you, {`${firstName || ''} ${lastName}`}!
          </Text>
        </div>
      </Thankyou>
      <Message>
        {' '}
        <Text>Your order is confirmed.</Text>
        <Text>We&apos;ve accepted your order and we&apos;re getting it ready.</Text>
      </Message>
      <Info>
        {' '}
        <Text $size='20px!important' strong>
          Customer Information .
        </Text>
        <InfoContainer>
          <div>
            <Text strong>Shipping Address</Text>
            <Text>{`${firstName || ''} ${lastName}`}</Text>
            <Text>{`${address || ''}, ${state}, ${country}`}</Text>
          </div>
          <div>
            <Text strong>Billing Address</Text>
            <Text>{`${firstName || ''} ${lastName}`}</Text>
            <Text>{billingAddress || ''}</Text>
          </div>
          <div>
            <Text strong>Shipping Method</Text>
            <Text>{shippingMethod || ''}</Text>
          </div>
          <div>
            <Text strong>Payment Method</Text>
            <Text>Ending in 3217 — {amount * price + shippingFee} ETH</Text>
          </div>
        </InfoContainer>
      </Info>
    </div>
  );
};

const Info = styled.div`
  padding: 30px 50px;
  color: black;
  .ant-typography {
    display: block;
    color: black;
    font-size: 16px;
    margin-bottom: 10px;
    max-width: 300px;
  }
`;

const InfoContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  div {
    width: 50%;
  }
`;

const Message = styled.div`
  padding: 30px 50px;
  border-bottom: 1px solid rgba(79, 79, 79, 0.2);
  color: black;
  .ant-typography {
    display: block;
    color: black;
    font-size: 16px;
    margin-bottom: 10px;
  }
`;

const Thankyou = styled.div`
  padding: 30px 50px;
  border-bottom: 1px solid rgba(79, 79, 79, 0.2);
  color: black;
  .anticon {
    font-size: 60px;
    margin-right: 20px;
  }
  .ant-typography {
    display: block;
    color: black;
  }
  display: flex;
  align-items: center;
`;

export default Completed;
