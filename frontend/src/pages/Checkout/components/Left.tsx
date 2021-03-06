/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Box from 'ui/Box';
import Completed from './Completed';
import CustomerInfo from './CustomerInfo';
import Payment from './Payment';
import ShippingMethod from './ShippingMethod';

interface ILeftProps {
  setTotal: (total: number) => void;
  step: number;
  setStep: (step: number) => void;
  setCheckoutData: any;
  checkoutData: any;
}

const Left: React.FC<ILeftProps> = (props: ILeftProps) => {
  const { setTotal, step, setStep, setCheckoutData, checkoutData } = props;
  const [data, setData] = useState([] as any);
  useEffect(() => {
    setData([
      {
        id: 1,
        name: 'Shipping Container 01 ',
        price: 0.65,
        size: '20ft',
        color: 'White',
        addr: '368 Tran Hung Dao, An Hai Tay, Son Tra, Da Nang',
        amount: 1
      },
      {
        id: 2,
        name: 'Shipping Container 01 ',
        price: 0.65,
        size: '20ft',
        color: 'White',
        addr: '368 Tran Hung Dao, An Hai Tay, Son Tra, Da Nang',
        amount: 1
      }
    ]);
  }, []);

  useEffect(() => {
    const total = data.reduce(
      (prev: any, curr: any) => (curr.checked ? prev + curr?.price * curr?.amount : prev),
      0
    );
    setTotal(total);
  }, [data, setTotal]);

  return (
    <Container
      bgColor={step === 4 ? 'transparent' : 'rgba(255, 255, 255, 0.6)'}
      w={step === 4 ? '950px' : '830px'}
      h={step === 4 ? '600px' : '460px'}
    >
      {step === 1 && (
        <CustomerInfo
          setStep={setStep}
          setCheckoutData={setCheckoutData}
          checkoutData={checkoutData}
        />
      )}
      {step === 2 && (
        <ShippingMethod
          setStep={setStep}
          setCheckoutData={setCheckoutData}
          checkoutData={checkoutData}
        />
      )}
      {step === 3 && (
        <Payment setStep={setStep} setCheckoutData={setCheckoutData} checkoutData={checkoutData} />
      )}
      {step === 4 && <Completed checkoutData={checkoutData} />}
    </Container>
  );
};

const CheckAll = styled.div`
  width: 100%;
  padding: 20px;
  border-bottom: 1px solid rgba(79, 79, 79, 0.2);
`;

const Container = styled(Box)`
  border-radius: 24px;
  position: relative;
  max-height: 82vh;
`;

export default Left;
