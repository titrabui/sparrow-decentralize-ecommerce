import React from 'react';
import shoppingBag from 'assets/images/shoppingBag.svg';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const ShoppingBag: React.FC = () => (
  <Container>
    <Link to='/cart'>
      <img src={shoppingBag} alt='shoppingBag' width='50px' height='100px' />
    </Link>
  </Container>
);

const Container = styled.div`
  text-align: right;
  img {
    cursor: pointer;
  }
`;

export default ShoppingBag;
