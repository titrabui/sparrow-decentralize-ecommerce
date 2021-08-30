/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Box from 'ui/Box';
import { Text } from 'ui/Typography';
import Button from 'ui/Button';
import { DatePicker } from 'antd';
import useWallet from 'hooks/useWallet';
import { getContract } from 'utils/getContract';
import { ORDER_STATUS } from 'utils/constants';
import ToShipProduct from './ToShipProduct';

interface IToShipProps {
  setTotal: (total: number) => void;
}

const ToShip: React.FC<IToShipProps> = (props: IToShipProps) => {
  const { setTotal } = props;
  const [data, setData] = useState([] as any);
  const { account, connector } = useWallet();

  useEffect(() => {
    if (account) {
      const fetchOrderCreated = async () => {
        const contract = await getContract(connector);
        const orders = await contract.methods.getAllOrders().call();
        const ordersFiltered = orders.filter((item: any) => Number(item[5]) === ORDER_STATUS.PAID)
        setData(ordersFiltered);
      }
      fetchOrderCreated()
    }
  })

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
        <StyledButton>Search</StyledButton>
      </FilterContainer>

      {data.map((item: any) => (
        <ToShipProduct data={item} key={item?.id} />
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
  margin-left: 30px;
  padding: 0 20px;
  font-size: 16px;
`;

export default ToShip;
