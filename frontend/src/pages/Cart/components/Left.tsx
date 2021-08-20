/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Box from 'ui/Box';
import { Checkbox } from 'antd';
import Product from './Product';

interface ILeftProps {
  setTotal: (total: number) => void;
}

const Left: React.FC<ILeftProps> = (props: ILeftProps) => {
  const { setTotal } = props;
  const [data, setData] = useState([] as any);
  const [checkAll, setCheckAll] = useState(false);

  useEffect(() => {
    setData([
      {
        id: 1,
        name: 'Shipping Container 01 ',
        price: 0.65,
        size: 'S',
        color: 'White',
        addr: '368 Tran Hung Dao, An Hai Tay, Son Tra, Da Nang',
        amount: 1
      },
      {
        id: 2,
        name: 'Shipping Container 01 ',
        price: 0.65,
        size: 'S',
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

  const handleChangeAmount = (id: number, amount: number) => {
    const validatedAmount = amount > 0 ? amount : 0;
    const newData = data.map((item: any) => {
      if (item.id === id) return { ...item, amount: validatedAmount };
      return item;
    });
    setData(newData);
  };

  const handleChangeCheck = (id: number, checked: boolean) => {
    const newData = data.map((item: any) => {
      if (item.id === id) return { ...item, checked };
      return item;
    });
    const isCheckedAll = newData.reduce((prev: any, curr: any) => prev && curr.checked, true);
    setCheckAll(isCheckedAll);
    setData(newData);
  };

  const handleCheckAll = (checked: boolean) => {
    const newData = data.map((item: any) => ({ ...item, checked }));
    setData(newData);
    setCheckAll(checked);
  };

  return (
    <Container w='1200px' h='400px'>
      <CheckAll>
        {' '}
        <Checkbox checked={checkAll} onChange={() => handleCheckAll(!checkAll)} />
      </CheckAll>

      {data.map((item: any) => (
        <Product
          data={item}
          key={item?.id}
          handleChangeAmount={handleChangeAmount}
          handleChangeCheck={handleChangeCheck}
        />
      ))}
    </Container>
  );
};

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
