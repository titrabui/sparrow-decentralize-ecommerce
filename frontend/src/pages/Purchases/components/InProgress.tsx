/* eslint-disable no-unused-vars */
import { DatePicker, Empty } from 'antd';
import Search from 'antd/lib/transfer/search';
import useWallet from 'hooks/useWallet';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Box from 'ui/Box';
import Button from 'ui/Button';
import { Text } from 'ui/Typography';
import { ORDER_STATUS } from 'utils/constants';
import { getContract } from 'utils/getContract';
import isMember from 'utils/isMember';
import InProgressProduct from './InProgressProduct';

interface IInProgressProps {
  setTotal: (total: number) => void;
  orders: any;
}

const InProgress: React.FC<IInProgressProps> = (props: IInProgressProps) => {
  const { setTotal, orders } = props;
  const [data, setData] = useState([] as any);
  const { account } = useWallet();

  useEffect(() => {
    if (account) {
      const fetchOrderCreated = async () => {
        const ordersFiltered = await orders.filter((item: any) => (Number(item[4]) === ORDER_STATUS.PAID || Number(item[4]) === ORDER_STATUS.READY_TO_PICKUP || Number(item[4]) === ORDER_STATUS.CONFIRMED_PICKUP) && Number(item[0]) !== 0)
        setData(ordersFiltered);
      }
      fetchOrderCreated()
    }
  }, [account, orders]);


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

      {data?.length ? (
        data.map((item: any) => <InProgressProduct data={item} key={item?.id} />)
      ) : (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      )}
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
