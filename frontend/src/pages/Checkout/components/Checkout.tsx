import React, { useState, useEffect } from 'react';
import MainContainer from 'ui/MainContainer';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import Right from './Right';
import Left from './Left';

const Checkout: React.FC = () => {
  const [total, setTotal] = useState(0);
  const [step, setStep] = useState(1);
  const [checkoutData, setCheckoutData] = useState({});
  useEffect(() => {
    const cart = localStorage.getItem('cart');
    if (cart) {
      const parseCart = JSON.parse(cart);
      setCheckoutData({ ...parseCart[0], orderId: uuidv4() });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <MainContainer mt='60px'>
      <StyledBox style={{ justifyContent: step === 4 ? 'center' : 'space-between' }}>
        <Left
          setTotal={setTotal}
          step={step}
          setStep={setStep}
          setCheckoutData={setCheckoutData}
          checkoutData={checkoutData}
        />
        {step !== 4 && <Right total={total} checkoutData={checkoutData} />}
      </StyledBox>
    </MainContainer>
  );
};

const StyledBox = styled.div`
  position: relative;
  height: 1100px;
  display: flex;
  margin: auto;
  width: 1200px;
`;

export default Checkout;
