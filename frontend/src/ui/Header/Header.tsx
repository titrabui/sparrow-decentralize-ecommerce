import React from 'react';
import { Col, Row } from 'antd';
import { NavLink, useLocation } from 'react-router-dom';
import { routesEnum } from 'routes/routesData';
import styled from 'styled-components';
import RightHeader from './RightHeader';
import ShoppingBag from './ShoppingBag';

const CommonHeader: React.FC = () => {
  const location = useLocation();
  return (
    <Container>
      <Row>
        <Col span={8}>
          <RightHeader />
        </Col>
        <Col span={8} style={{ alignItems: 'center' }}>
          <TabContainer>
            <Tab data-active={location.pathname === routesEnum.home} to={routesEnum.home}>
              Home
            </Tab>
            <Tab to={routesEnum.home}>Product</Tab>
            <Tab to={routesEnum.home}>Blog</Tab>
            <Tab to={routesEnum.home}>Contact</Tab>
          </TabContainer>
        </Col>
        <Col span={8}>
          <ShoppingBag />
        </Col>
      </Row>
    </Container>
  );
};

const Container = styled.div`
  height: 64px;
  max-width: 100vw;
  background-color: ${(p) => p.theme.background};
  width: 100%;
  top: 0;
  z-index: 100;
  color: white;
  .ant-row {
    height: 100%;
    width: 1200px;
    margin: 0 auto;
  }
`;

const TabContainer = styled.ul`
  display: flex;
  align-items: center;
  height: 100%;
  margin-bottom: 0 !important;
  justify-content: center;
  padding-left: 0;
`;

const Tab = styled(NavLink)<any>`
  list-style-type: none;
  color: ${(p) => p.theme.text};
  font-size: 16px;
  cursor: pointer;
  height: 100%;
  width: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: ${(p) =>
    p['data-active'] ? `4px solid ${p.theme.background}` : `4px solid ${p.theme.background}`};
  background: ${(p) =>
    p['data-active'] ? `linear-gradient(45deg, #8736bd 0%, #38e5f2 99.99%)` : p.theme.background};
  font-weight: bolder;
  &:hover {
    background-color: ${(p) => p.theme.background};
    font-weight: bold;
  }
  -webkit-background-clip: ${(p) => (p['data-active'] ? `text` : null)};
  -webkit-text-fill-color: ${(p) => (p['data-active'] ? `transparent` : null)};
`;

export default CommonHeader;
