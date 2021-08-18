import React from 'react';
import p2 from 'assets/images/p2.png';
import styled from 'styled-components';

const Card = () => (
  <Container>
    <img src={p2} alt='x' width='85%' />
  </Container>
);

const Container = styled.div`
  width: 300px;
  height: 300px;
  background: radial-gradient(
    50% 50% at 50% 50%,
    rgba(255, 255, 255, 0.25) 0%,
    rgba(255, 255, 255, 0.5) 94.27%
  );
  backdrop-filter: blur(40px);

  border-radius: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default Card;
