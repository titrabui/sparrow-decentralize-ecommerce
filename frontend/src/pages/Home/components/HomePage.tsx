import React from 'react';
import MainContainer from 'ui/MainContainer';
import Box from 'ui/Box';
import Card from 'ui/Card';
import styled from 'styled-components';
import { Row } from 'antd';
import Banner from './Banner';

const HomePage: React.FC = () => (
  <MainContainer mt='60px'>
    <StyledBox w='1200px' m='auto'>
      <Banner />
      <CardContainer>
        <Row>
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </Row>
      </CardContainer>
    </StyledBox>
  </MainContainer>
);
const StyledBox = styled(Box)`
  position: relative;
  height: 1100px;
`;
const CardContainer = styled.div`
  position: absolute;
  top: 270px;
  width: 1200px;
  .ant-row {
    justify-content: space-evenly;
  }
`;

export default HomePage;
