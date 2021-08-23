import React, { useState } from 'react';
import MainContainer from 'ui/MainContainer';
import Box from 'ui/Box';
import styled from 'styled-components';
import { Collapse } from 'antd';
import InProgress from './InProgress';
import Completed from './Completed';
import ReturnRefund from './ReturnRefund';

const { Panel } = Collapse;
const Purchases: React.FC = () => {
  const [, setTotal] = useState(0);
  return (
    <MainContainer mt='60px'>
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
