import React, { useState } from 'react';
import MainContainer from 'ui/MainContainer';
import Box from 'ui/Box';
import styled from 'styled-components';
import Right from './Right';
import Left from './Left';

const Cart: React.FC = () => {
  const [total, setTotal] = useState(0);
  return (
    <MainContainer mt='60px'>
      <StyledBox w='1200px' m='auto'>
        <Left setTotal={setTotal} />
        <Right total={total} />
      </StyledBox>
    </MainContainer>
  );
};

const StyledBox = styled(Box)`
  position: relative;
  height: 1100px;
  display: flex;
  justify-content: space-between;
`;

export default Cart;
