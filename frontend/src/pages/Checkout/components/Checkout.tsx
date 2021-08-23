import React, { useState } from 'react';
import MainContainer from 'ui/MainContainer';
import styled from 'styled-components';
import Right from './Right';
import Left from './Left';

const Checkout: React.FC = () => {
  const [total, setTotal] = useState(0);
  const [step, setStep] = useState(1);

  return (
    <MainContainer mt='60px'>
      <StyledBox style={{ justifyContent: step === 4 ? 'center' : 'space-between' }}>
        <Left setTotal={setTotal} step={step} setStep={setStep} />
        {step !== 4 && <Right total={total} />}
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
