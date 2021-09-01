/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
import { DatePicker, Empty } from 'antd';
import useWallet from 'hooks/useWallet';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Box from 'ui/Box';
import Button from 'ui/Button';
import { Text } from 'ui/Typography';
import { ORDER_STATUS } from 'utils/constants';
import ShippingProduct from './ShippingProduct';

interface IShippingProps {
  setTotal: (total: number) => void;
  orders: any;
}

const Shipping: React.FC<IShippingProps> = (props: IShippingProps) => {
  const { setTotal, orders } = props;
  const [data, setData] = useState([] as any);
  const { account } = useWallet();
  const [searchData, setSearchData] = useState([] as any);
  const [searchInput, setSearchInput] = useState({
    text: '',
    from: '',
    to: ''
  });
  const [isSearch, setIsSearch] = useState(false);

  useEffect(() => {
    const filterByFromData =
      searchInput.from !== ''
        ? data.filter((item: any) => item.createdAt > searchInput.from)
        : data;
    const filterByToData =
      searchInput.to !== ''
        ? filterByFromData.filter((item: any) => item.createdAt < searchInput.to)
        : filterByFromData;
    setSearchData(filterByToData);
    if (searchInput.from === '' && searchInput.text === '' && searchInput.to === '')
      setIsSearch(false);
  }, [data, searchInput]);


  useEffect(() => {
    if (account) {
      const fetchOrderConfirmed = async () => {
        const ordersFiltered = await orders.filter(
          (item: any) =>
            item.status === ORDER_STATUS.READY_TO_PICKUP ||
            item.status=== ORDER_STATUS.CONFIRMED_PICKUP &&
            item.id !== 0
        );
        setData(ordersFiltered);
      };
      fetchOrderConfirmed();
    }
  }, [account, orders]);

  useEffect(() => {
    const total = data.reduce(
      (prev: any, curr: any) => (curr.checked ? prev + curr?.price * curr?.amount : prev),
      0
    );
    setTotal(total);
  }, [data, setTotal]);

  const handleChangeSearch = (key: string, value: any) => {
    setSearchInput({ ...searchInput, [key]: value });
  };

  const handleSearch = () => {
    setIsSearch(true);
  };

  const mapData = isSearch ? searchData : data;

  return (
    <Container w='1200px' h='400px'>
      <FilterContainer>
        <Text>Order Date</Text>
        <DatePicker
          onChange={(e: any) => handleChangeSearch('from', e ? new Date(e._d).getTime() : '')}
        />
        <Text>to</Text>
        <DatePicker
          onChange={(e: any) => handleChangeSearch('to', e ? new Date(e._d).getTime() : '')}
        />
        <StyledButton onClick={handleSearch}>Search</StyledButton>
      </FilterContainer>

      {mapData?.length ? (
        mapData.map((item: any) => <ShippingProduct data={item} key={item?.id} />)
      ) : (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      )}
    </Container>
  );
};

const FilterContainer = styled.div`
  width: 100%;
  padding: 20px;
  border-bottom: 1px solid rgba(79, 79, 79, 0.2);
  text-align: right;
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
  margin-left: 30px;
  padding: 0 20px;
  font-size: 16px;
`;

export default Shipping;
