import { Col, Row } from 'antd';
import React from 'react';
import styled from 'styled-components';
import visa from 'assets/images/visa.svg';
import mastercard from 'assets/images/mastercard.svg';
import paypal from 'assets/images/paypal.svg';
import { Text } from './Typography';
import Input from './Input';
import Button from './Button';

const Footer: React.FC = () => (
  <Container>
    <StyledRow>
      <Col span={6}>
        <Title>NAPA E-Commerce</Title>
        <ImageWrapper>
          <img src={visa} alt='visa' />
          <img src={mastercard} alt='mastercard' />
          <img src={paypal} alt='paypal' />
        </ImageWrapper>
      </Col>
      <RightCol span={8}>
        <SubcribeContainer>
          <div>
            {' '}
            <RightTitle>Stay in Touch! Join our Newsletter.</RightTitle>
            <StyledInput placeholder='Enter your email' />
          </div>

          <StyledButton>Subcribe</StyledButton>
        </SubcribeContainer>
      </RightCol>
    </StyledRow>
  </Container>
);

const SubcribeContainer = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
`;

const StyledButton = styled(Button)`
  background: #e86c13;
  border: 3px solid #ffffff;
  border-radius: 8px;
  color: white;
  height: auto;
  &:hover {
    background: #e86c13;
    border: 3px solid #ffffff;
    color: white;
  }
`;

const StyledInput = styled(Input)`
  width: 290px;
  height: 32px;
  border-radius: 8px;
`;

const RightCol = styled(Col)`
  justify-content: flex-end;
`;

const RightTitle = styled(Text)`
  font-size: 18px;
  font-weight: bold;
  color: white;
  display: block;
  margin-bottom: 5px;
`;

const ImageWrapper = styled.div`
  display: flex;
  width: 100px;
  height: 50px;
  margin-left: -12px;
  img {
    width: 70px;
    height: 100%;
  }
`;

const StyledRow = styled(Row)`
  margin-top: 30px !important;
  padding-top: 20px;
  justify-content: space-between;
`;

const Title = styled(Text)`
  font-size: 24px;
  color: white;
  display: block;
`;

const Container = styled.div`
  width: 100%;
  height: 115px;
  background: linear-gradient(45deg, #8736bd 0%, #38e5f2 99.99%);
  .ant-row {
    width: 1200px;
    margin: 0 auto;
  }
`;

export default Footer;
