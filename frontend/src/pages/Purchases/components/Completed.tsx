/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
import { DatePicker, Empty } from 'antd';
import Search from 'antd/lib/transfer/search';
import useWallet from 'hooks/useWallet';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Box from 'ui/Box';
import Button from 'ui/Button';
import { Text } from 'ui/Typography';
import { ORDER_STATUS } from 'utils/constants';
import CompletedProduct from './CompletedProduct';

interface ICompletedProps {
  setTotal: (total: number) => void;
  orders: any;
}

const Completed: React.FC<ICompletedProps> = (props: ICompletedProps) => {
  const { setTotal, orders } = props;
  const [data, setData] = useState([] as any);
  const [searchData, setSearchData] = useState([] as any);
  const [searchInput, setSearchInput] = useState({
    text: '',
    from: '',
    to: ''
  });
  const [isSearch, setIsSearch] = useState(false);
  const { account } = useWallet();

  useEffect(() => {
    if (account) {
      const fetchOrderCompleted = async () => {
        const ordersFiltered = await orders.filter(
          (item: any) => item.status === ORDER_STATUS.RECEIVED
        );
        setData(ordersFiltered);
      };
      fetchOrderCompleted();
    }
  }, [account, orders]);

  useEffect(() => {
    const filterData = data.filter((order: any) =>
      JSON.stringify(order).includes(searchInput?.text)
    );
    const filterByFromData =
      searchInput.from !== ''
        ? filterData.filter((item: any) => item.createdAt > searchInput.from)
        : filterData;
    const filterByToData =
      searchInput.to !== ''
        ? filterByFromData.filter((item: any) => item.createdAt < searchInput.to)
        : filterByFromData;
    setSearchData(filterByToData);
    if (searchInput.from === '' && searchInput.text === '' && searchInput.to === '')
      setIsSearch(false);
  }, [data, searchInput]);

  const handleSearch = () => {
    setIsSearch(true);
  };
  const handleChangeSearch = (key: string, value: any) => {
    setSearchInput({ ...searchInput, [key]: value });
  };

  const mapData = isSearch ? searchData : data;

  useEffect(() => {
    const total = data.reduce(
      (prev: any, curr: any) => (curr.checked ? prev + curr?.price * curr?.amount : prev),
      0
    );
    setTotal(total);
  }, [data, setTotal]);

  return (
    <Container w='1200px' h='400px'>
      <CheckAll>
        <Text>Item Name</Text>
        <Search
          onChange={(e: any) => handleChangeSearch('text', e.target.value)}
          value={searchInput?.text}
          handleClear={() => handleChangeSearch('text', '')}
        />
        <Text>Order Date</Text>
        <DatePicker
          onChange={(e: any) => handleChangeSearch('from', e ? new Date(e._d).getTime() : '')}
        />
        <Text>to</Text>
        <DatePicker
          onChange={(e: any) => handleChangeSearch('to', e ? new Date(e._d).getTime() : '')}
        />
        <StyledButton onClick={handleSearch}>Search</StyledButton>
      </CheckAll>

      {mapData?.length ? (
        mapData.map((item: any) => <CompletedProduct data={item} key={item?.id} />)
      ) : (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      )}
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
  height: auto;
  max-height: 82vh;
  overflow-x: auto;
`;

const StyledButton = styled(Button)`
  height: 32px;
  color: white;
  background: #7b61ff;
  border: none;
  box-sizing: border-box;
  margin: 0 30px 0;
  padding: 0 20px;
  font-size: 16px;
`;

export default Completed;
