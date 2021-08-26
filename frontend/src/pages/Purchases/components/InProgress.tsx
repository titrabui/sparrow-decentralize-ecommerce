/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Box from 'ui/Box';
import { Text } from 'ui/Typography';
import Button from 'ui/Button';
import { DatePicker } from 'antd';
import Search from 'antd/lib/transfer/search';
import request from 'utils/request';
import { ORDER_STATUS } from 'utils/constants';
import InProgressProduct from './InProgressProduct';

interface IInProgressProps {
  setTotal: (total: number) => void;
}

const InProgress: React.FC<IInProgressProps> = (props: IInProgressProps) => {
  const { setTotal } = props;
  const [data, setData] = useState([] as any);
  useEffect(() => {
    const fetchOrderCreated = async () => {
      const result = await request.getData(`/orders/${ORDER_STATUS.PAID}`, {})
      if (result && result.status === 200) {
        setData(result.data)
      }
    }

    fetchOrderCreated();
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
      <CheckAll>
        <Text>Item Name</Text>
        <Search />
        <Text>Order Date</Text>
        <DatePicker />
        <Text>to</Text>
        <DatePicker />
        <StyledButton>Search</StyledButton>
      </CheckAll>

      {data.map((item: any) => (
        <InProgressProduct data={item} key={item?.id} />
      ))}
    </Container>
  );
};

const CheckAll = styled.div`
  width: 100%;
  padding: 20px;
  border-bottom: 1px solid rgba(79, 79, 79, 0.2);
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
  border: none;
  box-sizing: border-box;
  border-radius: 8px;
  margin: 0 30px 0;
  padding: 0 20px;
  font-size: 16px;
`;

export default InProgress;
