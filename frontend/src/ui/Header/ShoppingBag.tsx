import React from 'react';
import shoppingBag from 'assets/images/shoppingBag.svg';
import styled from 'styled-components';

const ShoppingBag: React.FC = () => (
  <Container>
    <img src={shoppingBag} alt='shoppingBag' width='50px' height='100px' />
  </Container>
);

const Container = styled.div`
  text-align: right;
  img {
    cursor: pointer;
  }
`;

export default ShoppingBag;
