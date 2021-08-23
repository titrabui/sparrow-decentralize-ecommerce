/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Box from 'ui/Box';
import { Text } from 'ui/Typography';
import Button from 'ui/Button';
import { DatePicker } from 'antd';
import Search from 'antd/lib/transfer/search';
import InProgressProduct from './InProgressProduct';

interface IInProgressProps {
  setTotal: (total: number) => void;
}

const InProgress: React.FC<IInProgressProps> = (props: IInProgressProps) => {
  const { setTotal } = props;
  const [data, setData] = useState([] as any);
  const [checkAll, setCheckAll] = useState(false);

  useEffect(() => {
    setData([
      {
        id: 1,
        name: 'Shipping Container 01 ',
        price: 0.65,
        size: '20ft',
        color: 'White',
        addr: '368 Tran Hung Dao, An Hai Tay, Son Tra, Da Nang',
        amount: 1,
        status: 'wait'
      },
      {
        id: 2,
        name: 'Shipping Container 01 ',
        price: 0.65,
        size: '20ft',
        color: 'White',
        addr: '368 Tran Hung Dao, An Hai Tay, Son Tra, Da Nang',
        amount: 1,
        status: 'ship'
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
        <Text>Item Name</Text>
        <Search />
        <Text>Order Date</Text>
        <DatePicker />
        <Text>to</Text>
        <DatePicker />
        <StyledButton>Search</StyledButton>
      </CheckAll>

      {data.map((item: any) => (
        <InProgressProduct
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
  .ant-input {
    width: 300px;
    border-radius: 8px;
  }
  .anticon-search {
    display: none;
  }
  .ant-typography {
    margin: 0 20px;
    color: black;
  }
  .ant-typography:first-child {
    margin: 0 20px 0 0;
  }
`;

const Container = styled(Box)`
  background-color: #f4f8ff !important;
  backdrop-filter: blur(40px);
  position: relative;
  width: 100%;
  min-height: 600px;
  height: auto;
  max-height: 82vh;
  overflow-x: auto;
`;

const StyledButton = styled(Button)`
  height: 32px;
  color: white;
  background: #a5a6f6;
  border: none;
  border: none;
  box-sizing: border-box;
  border-radius: 8px;
  margin: 0 30px 0;
  padding: 0 20px;
  font-size: 16px;
`;

export default InProgress;
