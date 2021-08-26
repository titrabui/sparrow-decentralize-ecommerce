/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Box from 'ui/Box';
import { Text } from 'ui/Typography';
import Button from 'ui/Button';
import { DatePicker, Select } from 'antd';
import ReturnRefundProduct from './ReturnRefundProduct';

const { Option } = Select;

interface IReturnRefundProps {
  setTotal: (total: number) => void;
}

const ReturnRefund: React.FC<IReturnRefundProps> = (props: IReturnRefundProps) => {
  const { setTotal } = props;
  const [data, setData] = useState([] as any);

  useEffect(() => {
    setData([
      {
        id: 1,
        name: 'Shipping Container 01 ',
        price: 0.65,
        size: '20ft',
        color: 'White',
        addr: '368 Tran Hung Dao, An Hai Tay, Son Tra, Da Nang',
        amount: 1,
        status: 'wait'
      },
      {
        id: 2,
        name: 'Shipping Container 01 ',
        price: 0.65,
        size: '40ft',
        color: 'White',
        addr: '368 Tran Hung Dao, An Hai Tay, Son Tra, Da Nang',
        amount: 1,
        status: 'confirm'
      },
      {
        id: 3,
        name: 'Shipping Container 01 ',
        price: 0.65,
        size: '40ft',
        color: 'White',
        addr: '368 Tran Hung Dao, An Hai Tay, Son Tra, Da Nang',
        amount: 1,
        status: 'reject'
      },
      {
        id: 4,
        name: 'Shipping Container 01 ',
        price: 0.65,
        size: '40ft',
        color: 'White',
        addr: '368 Tran Hung Dao, An Hai Tay, Son Tra, Da Nang',
        amount: 1,
        status: 'complete'
      }
    ]);
  }, []);

  useEffect(() => {
    const total = data.reduce(
      (prev: any, curr: any) => (curr.checked ? prev + curr?.price * curr?.amount : prev),
      0
    );
    setTotal(total);
  }, [data, setTotal]);

  return (
    <Container w='1200px' h='400px'>
      <FilterContainer>
        <Text>Order Date</Text>
        <DatePicker />
        <Text>to</Text>
        <DatePicker />
        <Select defaultValue='Refund Status'>
          <Option value='wait'>Wait for Confirmation</Option>
          <Option value='reject'>Refund Reject</Option>
          <Option value='confirm'>Confirmed</Option>
          <Option value='complete'>Refund Completed</Option>
        </Select>
        <StyledButton>Search</StyledButton>
      </FilterContainer>

      {data.map((item: any) => (
        <ReturnRefundProduct data={item} key={item?.id} />
      ))}
    </Container>
  );
};

const FilterContainer = styled.div`
  width: 100%;
  padding: 20px;
  border-bottom: 1px solid rgba(79, 79, 79, 0.2);
  text-align: right;
  .ant-input {
    width: 300px;
    border-radius: 8px;
  }
  .anticon-search {
    display: none;
  }
  .ant-typography {
    margin: 0 20px;
    color: black;
  }
  .ant-typography:first-child {
    margin: 0 20px 0 0;
  }
  .ant-select {
    width: 200px;
    color: black;
    text-align: left;
    padding-left: 10px;
    margin-left: 20px;
  }
  .ant-select-selector {
    border-radius: 8px !important;
  }
`;

const Container = styled(Box)`
  background-color: #f4f8ff !important;
  backdrop-filter: blur(40px);
  position: relative;
  width: 100%;
  min-height: 600px;
  height: auto;
  max-height: 82vh;
  overflow-x: auto;
`;

const StyledButton = styled(Button)`
  height: 32px;
  color: white;
  background: #7b61ff;
  border: none;
  box-sizing: border-box;
  margin-left: 30px;
  padding: 0 20px;
  font-size: 16px;
`;

export default ReturnRefund;