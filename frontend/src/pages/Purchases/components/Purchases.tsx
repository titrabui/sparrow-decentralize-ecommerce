import { Collapse } from 'antd';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Box from 'ui/Box';
import MainContainer from 'ui/MainContainer';
import { Text } from 'ui/Typography';
import useWallet from 'hooks/useWallet';
import { getContract } from 'utils/getContract';
import { SELLER_ACCOUNT_ADDRESS } from 'environment';
import Completed from './Completed';
import InProgress from './InProgress';
import ReturnRefund from './ReturnRefund';

const { Panel } = Collapse;
const Purchases: React.FC = () => {
  const [, setTotal] = useState(0);
  const [orders, setOrders] = useState([] as any);
  const { account, connector } = useWallet();
  useEffect(() => {
    if (account) {
      const fetchOrderCreated = async () => {
        const contract = await getContract(connector);
        const allOrders = await contract.methods.getAllOrders().call();
        const ordersFiltered = allOrders.filter((item: any) => item[1] === SELLER_ACCOUNT_ADDRESS);
        setOrders(ordersFiltered);
      }
      fetchOrderCreated()
    }
  }, [account, connector])

  return (
    <MainContainer mt='60px'>
      <PageName> Purchases</PageName>
      <StyledBox w='1200px' m='auto'>
        <StyledCollapse defaultActiveKey={['1']}>
          <Panel header='In-Progress Order' key='1'>
            {' '}
            <InProgress setTotal={setTotal} orders={orders} />
          </Panel>
          <Panel header='Completed Order' key='2'>
            {' '}
            <Completed setTotal={setTotal} orders={orders} />
          </Panel>
          <Panel header='Returned/Refund' key='3'>
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

export default Purchases;
