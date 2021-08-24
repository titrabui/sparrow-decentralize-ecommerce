import React, { useState } from 'react';
import MainContainer from 'ui/MainContainer';
import Box from 'ui/Box';
import styled from 'styled-components';
import { Text } from 'ui/Typography';
import Right from './Right';
import Left from './Left';

const Cart: React.FC = () => {
  const [total, setTotal] = useState(0);
  return (
    <MainContainer mt='60px'>
      <PageName>Cart</PageName>
      <StyledBox w='1200px' m='auto'>
        <Left setTotal={setTotal} />
        <Right total={total} />
      </StyledBox>
    </MainContainer>
  );
};

const PageName = styled(Text)`
  font-size: 24px;
  color: black;
  display: block;
  font-weight: bold;
  width: 1200px;
  margin: 20px auto;
`;

const StyledBox = styled(Box)`
  position: relative;
  height: 1100px;
  display: flex;
  justify-content: space-between;
`;

export default Cart;
