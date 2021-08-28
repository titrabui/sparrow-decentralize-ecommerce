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
import isMember from 'utils/isMember';
import { getContract } from 'utils/getContract';
import useWallet from 'hooks/useWallet';
import InProgressProduct from './InProgressProduct';

interface IInProgressProps {
  setTotal: (total: number) => void;
}

const InProgress: React.FC<IInProgressProps> = (props: IInProgressProps) => {
  const { setTotal } = props;
  const [data, setData] = useState([] as any);
  const { account, connector, library } = useWallet();
  useEffect(() => {
    if (account) {
      const type = isMember(account || 'buyer').toLowerCase()
      const fetchOrderCreated = async () => {
        const resultPaid = await request.getData(`/orders/${ORDER_STATUS.PAID}/${account}/${type}`, {})
        const resultReadyPickup = await request.getData(`/orders/${ORDER_STATUS.READY_TO_PICKUP}/${account}/${type}`, {})
        const resultConfirmedPickup = await request.getData(`/orders/${ORDER_STATUS.CONFIRMED_PICKUP}/${account}/${type}`, {})
        if (resultPaid && resultPaid.status === 200 && resultReadyPickup && resultReadyPickup.status === 200 && resultConfirmedPickup && resultConfirmedPickup.status === 200) {
          const result = resultPaid.data.concat(resultReadyPickup.data).concat(resultConfirmedPickup.data);
          // for (let index = 0; index < result.data.length; index += 1) {
          //   const element = result.data[index];
          //   const x = 1;
          //   const contract = await getContract(connector);
          //   const data = await contract.methods.getOrderInfo(orderId).call();
          //   const status = data[3];
          //   const quantity = library?.utils?.fromWei(data[5], 'ether');
          //   const price = library?.utils?.fromWei(data[6], 'ether');
          //   const shippingFee = library?.utils?.fromWei(data[7], 'ether');
          //   const deposit = library?.utils?.fromWei(data[8], 'ether');
          // }
          setData(result)
        }
      }
      fetchOrderCreated();
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
