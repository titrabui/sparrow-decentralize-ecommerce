import React, { useState, useEffect } from 'react';
import MainContainer from 'ui/MainContainer';
import Box from 'ui/Box';
import styled from 'styled-components';
import { Collapse } from 'antd';
import { Text } from 'ui/Typography';
import useWallet from 'hooks/useWallet';
import { getContract } from 'utils/getContract';
import ToShip from './ToShip';
import Shipping from './Shipping';
import ReturnRefund from './ReturnRefund';
import Completed from './Completed';

const { Panel } = Collapse;
const MySales: React.FC = () => {
  const [, setTotal] = useState(0);
  const [orders, setOrders] = useState([] as any);
  const { account, connector } = useWallet();
  const sellerAddress = process.env.SELLER_ACCOUNT_ADDRESS || '0x520C5A9555f73E4935048954e7f660ED27886a03'
  useEffect(() => {
    if (account) {
      const fetchOrderCreated = async () => {
        const contract = await getContract(connector);
        const allOrders = await contract.methods.getAllOrders().call();
        const ordersFiltered = allOrders.filter((item: any) => item[1] === sellerAddress);
        setOrders(ordersFiltered);
      }
      fetchOrderCreated()
    }
  }, [account, connector, sellerAddress])

  return (
    <MainContainer mt='60px'>
      <PageName>My Sales</PageName>
      <StyledBox w='1200px' m='auto'>
        <StyledCollapse defaultActiveKey={['1']}>
          <Panel header='To Ship' key='1'>
            {' '}
            <ToShip setTotal={setTotal} orders={orders} />
          </Panel>
          <Panel header='Shipping' key='2'>
            {' '}
            <Shipping setTotal={setTotal} orders={orders} />
          </Panel>
          <Panel header='Completed' key='3'>
            {' '}
            <Completed setTotal={setTotal} orders={orders} />
          </Panel>
          <Panel header='Return/Refund' key='4'>
            {' '}
            <ReturnRefund setTotal={setTotal} orders={orders} />
          </Panel>
        </StyledCollapse>
      </StyledBox>
    </MainContainer>
  );
};

const PageName = styled(Text)`
  font-size: 24px;
  color: black;
  display: block;
  font-weight: bold;
  width: 1200px;
  margin: 20px auto;
`;

const StyledBox = styled(Box)`
  position: relative;
  height: auto;
  display: flex;
  justify-content: space-between;
`;

const StyledCollapse = styled(Collapse)`
  width: 100%;
  background-color: #f4f8ff !important;
  .ant-collapse-content-box {
    padding: 0;
    background-color: #f4f8ff !important;
  }
  .ant-collapse-content,
  .ant-collapse-header {
    background-color: #f4f8ff !important;
  }
`;

export default MySales;
