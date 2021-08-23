/* eslint-disable no-unused-vars */
import React from 'react';
import { Text } from 'ui/Typography';
import Box from 'ui/Box';
import styled from 'styled-components';
import { CheckCircleOutlined } from '@ant-design/icons';

const Completed = () => (
  <div>
    <Thankyou>
      <CheckCircleOutlined />
      <div>
        {' '}
        <Text $size='16px'>Order 131217312</Text>
        <Text $size='24px' strong>
          Thank you, James!
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
          <Text>James Smith</Text>
          <Text>368 Tran Hung Dao, An Hai Tay, Son Tra, Da Nang</Text>
        </div>
        <div>
          <Text strong>Billing Address</Text>
          <Text>James Smith</Text>
          <Text>368 Tran Hung Dao, An Hai Tay, Son Tra, Da Nang</Text>
        </div>
        <div>
          <Text strong>Shipping Method</Text>
          <Text>UPS Ground (Estimated ship time of 3-6 days)</Text>
        </div>
        <div>
          <Text strong>Payment Method</Text>
          <Text>Ending in 3217 — ETH 0.021</Text>
        </div>
      </InfoContainer>
    </Info>
  </div>
);

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
