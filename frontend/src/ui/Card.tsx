import React from 'react';
import p2 from 'assets/images/p2.png';
import styled from 'styled-components';
import { Text } from './Typography';

const Card: React.FC = () => (
  <Container>
    <img src={p2} alt='x' width='75%' />
    <TextContainer>
      <Name>Summer Fighting T-shirt 01 </Name>
      <Detail>Detail Product </Detail>
      <Price>ETH &nbsp; 00.65 </Price>
    </TextContainer>
  </Container>
);

const TextContainer = styled.div`
  position: absolute;
  top: 260px;
`;

const Name = styled(Text)`
  color: #341f62;
  font-size: 18px;
  display: block;
  font-weight: bold;
`;

const Detail = styled(Text)`
  color: #4f4f4f80;
  font-size: 14px;
  display: block;
`;

const Price = styled(Text)`
  color: #7b61ff;
  font-size: 28px;
  font-weight: bold;
  display: block;
`;

const Container = styled.div`
  width: 300px;
  margin: 0 10px;
  height: 368px;
  background: radial-gradient(
    50% 50% at 50% 50%,
    rgba(255, 255, 255, 0.25) 0%,
    rgba(255, 255, 255, 0.5) 94.27%
  );
  backdrop-filter: blur(40px);
  backdrop-filter: blur(40px);
  border-radius: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 50px;
  position: relative;
  img {
    position: absolute;
    top: 20px;
  }
`;

export default Card;
