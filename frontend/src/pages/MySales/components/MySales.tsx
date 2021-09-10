import { Collapse } from 'antd';
import { SELLER_ACCOUNT_ADDRESS } from 'environment';
import useWallet from 'hooks/useWallet';
import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import Box from 'ui/Box';
import MainContainer from 'ui/MainContainer';
import { Text } from 'ui/Typography';
import { getContract } from 'utils/getContract';
import request from 'utils/request';
import Completed from './Completed';
import ReturnRefund from './ReturnRefund';
import Shipping from './Shipping';
import ToShip from './ToShip';

const { Panel } = Collapse;
const MySales: React.FC = () => {
  const [, setTotal] = useState(0);
  const [ordersBE, setOrdersBE] = useState([] as any);
  const { account, connector } = useWallet();

  const fetchOrder = useCallback(async () => {
    const contract = await getContract(connector);
    const allOrders = await contract.methods.getAllOrders().call();
    const ordersFiltered = allOrders.filter((item: any) => item.seller === SELLER_ACCOUNT_ADDRESS);
    const result = await request.getData(`/orders/buyers`, {});
    const orderMapWithSC = result?.data?.filter((item: any) =>
      ordersFiltered.some((order: any) => order[0] === item.id)
    );
    setOrdersBE(orderMapWithSC);
  }, [connector]);

  useEffect(() => {
    if (account) {
      fetchOrder();
    }
  }, [account, fetchOrder]);

  return (
    <MainContainer mt='60px'>
      <PageName>My Sales</PageName>
      <StyledBox w='1200px' m='auto'>
        <StyledCollapse defaultActiveKey={['1']}>
          <Panel header='To Ship' key='1'>
            {' '}
            <ToShip setTotal={setTotal} orders={ordersBE} fetchOrder={fetchOrder} />
          </Panel>
          <Panel header='Shipping' key='2'>
            {' '}
            <Shipping setTotal={setTotal} orders={ordersBE} />
          </Panel>
          <Panel header='Completed' key='3'>
            {' '}
            <Completed setTotal={setTotal} orders={ordersBE} />
          </Panel>
          <Panel header='Return/Refund' key='4'>
            {' '}
            <ReturnRefund setTotal={setTotal} orders={ordersBE} fetchOrder={fetchOrder} />
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
