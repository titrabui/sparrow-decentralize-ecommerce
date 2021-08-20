import React from 'react';
import MainContainer from 'ui/MainContainer';
import Box from 'ui/Box';
import Card from 'ui/Card';
import styled from 'styled-components';
import { Row } from 'antd';
import { Text } from 'ui/Typography';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
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
        <StyledText>
          <LeftOutlined />{' '}
          Best Seller Product{' '}
          <RightOutlined />
        </StyledText>
      </CardContainer>
    </StyledBox>
  </MainContainer>
);

const StyledText = styled(Text)`
  font-size: 24px;
  transform: rotate(-90deg);
  background: linear-gradient(45deg, #8736bd 0%, #38e5f2 99.99%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  position: absolute;
  top: 400px;
  left: -90px;
  display:flex;
  align-items: center;
  .anticon {
    font-size:14px;
    font-weight:bold;
    margin:0 10px;
  }
`;
const StyledBox = styled(Box)`
  position: relative;
  height: 1100px;
`;
const CardContainer = styled.div`
  position: absolute;
  top: 270px;
  width: 1200px;
  display: flex;
  justify-content: center;
  .ant-row {
    justify-content: space-evenly;
    width:1120px;
  }
`;

export default HomePage;
