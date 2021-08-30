/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Box from 'ui/Box';
import { Text } from 'ui/Typography';
import Button from 'ui/Button';
import { DatePicker } from 'antd';
import request from 'utils/request';
import { ORDER_STATUS } from 'utils/constants';
import isMember from 'utils/isMember';
import useWallet from 'hooks/useWallet';
import ShippingProduct from './ShippingProduct';

interface IShippingProps {
  setTotal: (total: number) => void;
}

const Shipping: React.FC<IShippingProps> = (props: IShippingProps) => {
  const { setTotal } = props;
  const [data, setData] = useState([] as any);
  const { account } = useWallet();

  useEffect(() => {
    if (account) {
      const type = isMember(account || 'seller').toLowerCase()
      const fetchOrderConfirmed = async () => {
        const result = await request.getData(`/orders/${ORDER_STATUS.CONFIRMED_PICKUP}/${account}/${type}`, {})
        if (result && result.status === 200) {
          setData(result.data)
        }
      }
      fetchOrderConfirmed();
    }
  }, [account]);


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
        <ShippingProduct data={item} key={item?.id} />
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
  box-sizing: border-box;
  margin-left: 30px;
  padding: 0 20px;
  font-size: 16px;
`;

export default Shipping;
