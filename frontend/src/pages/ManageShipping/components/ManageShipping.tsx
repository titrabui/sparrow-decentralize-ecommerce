import React from 'react';
import styled from 'styled-components';
import MainContainer from 'ui/MainContainer';
import CompleteDeliveries from './CompleteDeliveries';
import PendingDeliveries from './PendingDeliveries';
import TextShipping from './TextShipping';

const ManageShipping: React.FC = () => (
  <MainContainer mt='60px'>
    <Container>
      <PendingDeliveries />
      <TextShipping />
      <CompleteDeliveries />
    </Container>
  </MainContainer>
);

const Container = styled.div`
  width: 80%;
  margin: auto;
  background-color: #f4f8ff;
  border-bottom: 1px solid #dbdbdc;
  border-left: 1px solid #dbdbdc;
  border-right: 1px solid #dbdbdc;
`;

export default ManageShipping;
