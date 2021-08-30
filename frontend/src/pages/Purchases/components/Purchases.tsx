import { Collapse } from 'antd';
import React, { useState } from 'react';
import styled from 'styled-components';
import Box from 'ui/Box';
import MainContainer from 'ui/MainContainer';
import { Text } from 'ui/Typography';
import Completed from './Completed';
import InProgress from './InProgress';
import ReturnRefund from './ReturnRefund';

const { Panel } = Collapse;
const Purchases: React.FC = () => {
  const [, setTotal] = useState(0);
  return (
    <MainContainer mt='60px'>
      <PageName> Purchases</PageName>
      <StyledBox w='1200px' m='auto'>
        <StyledCollapse defaultActiveKey={['1']}>
          <Panel header='In-Progress Order' key='1'>
            {' '}
            <InProgress setTotal={setTotal} />
          </Panel>
          <Panel header='Completed Order  ' key='2'>
            {' '}
            <Completed setTotal={setTotal} />
          </Panel>
          <Panel header='Returned/Refund' key='3'>
            {' '}
            <ReturnRefund setTotal={setTotal} />
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
