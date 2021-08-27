/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import styled from 'styled-components';
import Box from 'ui/Box';
import { Text } from 'ui/Typography';
import Product from './Product';

interface ILeftProps {
  setTotal: any;
  data: any;
  setData: any;
}

const Left: React.FC<ILeftProps> = (props: ILeftProps) => {
  const { setTotal, data, setData } = props;

  useEffect(() => {
    const total = data.reduce((prev: any, curr: any) => prev + curr?.price * curr?.amount, 0);
    setTotal(total);
  }, [data, setTotal]);

  const handleChangeAmount = (id: number, amount: number) => {
    const validatedAmount = amount > 0 ? amount : 1;
    const newData = data.map((item: any) => {
      if (item.id === id) return { ...item, amount: validatedAmount };
      return item;
    });
    setData(newData);
  };

  return (
    <Container w='1200px' h='400px'>
      {data.length > 0 ? (
        <>
          {data.map((item: any) => (
            <Product data={item} key={item?.id} handleChangeAmount={handleChangeAmount} />
          ))}
        </>
      ) : (
        <EmptyText>There is nothing in your shopping cart. </EmptyText>
      )}
    </Container>
  );
};

const EmptyText = styled(Text)`
  font-size: 20px;
  color: black;
  display: block;
  width: 100%;
  text-align: center;
  margin-top: 50px;
`;

const CheckAll = styled.div`
  width: 100%;
  padding: 20px;
  border-bottom: 1px solid rgba(79, 79, 79, 0.2);
`;

const Container = styled(Box)`
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(40px);
  border-radius: 24px;
  position: relative;
  width: 900px;
  min-height: 600px;
  height: auto;
  max-height: 82vh;
  overflow-x: auto;
`;

export default Left;
