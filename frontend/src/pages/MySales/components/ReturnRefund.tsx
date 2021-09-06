/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
import { DatePicker, Empty, Select } from 'antd';
import useWallet from 'hooks/useWallet';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Box from 'ui/Box';
import Button from 'ui/Button';
import { Text } from 'ui/Typography';
import { ERROR_STATUS, ORDER_STATUS } from 'utils/constants';
import ReturnRefundProduct from './ReturnRefundProduct';

const { Option } = Select;

interface IReturnRefundProps {
  setTotal: (total: number) => void;
  orders: any;
}

const ReturnRefund: React.FC<IReturnRefundProps> = (props: IReturnRefundProps) => {
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

  const handleChangeSearch = (key: string, value: any) => {
    setSearchInput({ ...searchInput, [key]: value });
  };

  const handleSearch = () => {
    setIsSearch(true);
  };

  const mapData = isSearch ? searchData : data;

  useEffect(() => {
    if (account) {
      const fetchOrderCompleted = async () => {
        const ordersFiltered = await orders.filter(
          (item: any) =>
            (item.status === ERROR_STATUS.REFUNDED_PRODUCT_ERROR ||
              item.status === ORDER_STATUS.REQUEST_REFUND ||
              item.status === ORDER_STATUS.REJECT_REFUND ||
              item.status === ERROR_STATUS.REFUNDED_SHIPPING_ERROR) &&
            item.id !== 0
        );
        setData(ordersFiltered);
      };
      fetchOrderCompleted();
    }
  }, [account, orders]);

  useEffect(() => {
    const total = data.reduce(
      (prev: any, curr: any) => (curr.checked ? prev + curr?.price * curr?.amount : prev),
      0
    );
    setTotal(total);
  }, [data, setTotal]);

  return (
    <Container w='1200px' h='400px'>
      <FilterContainer>
        <DatePicker
          onChange={(e: any) => handleChangeSearch('from', e ? new Date(e._d).getTime() : '')}
        />
        <Text>to</Text>
        <DatePicker
          onChange={(e: any) => handleChangeSearch('to', e ? new Date(e._d).getTime() : '')}
        />
        <Select defaultValue='Refund Status'>
          <Option value='wait'>Wait for Confirmation</Option>
          <Option value='reject'>Refund Reject</Option>
          <Option value='confirm'>Confirmed</Option>
          <Option value='complete'>Refund Completed</Option>
        </Select>
        <StyledButton onClick={handleSearch}>Search</StyledButton>
      </FilterContainer>

      {mapData?.length ? (
        mapData.map((item: any) => <ReturnRefundProduct data={item} key={item?.id} />)
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
  .ant-select {
    width: 200px;
    color: black;
    text-align: left;
    padding-left: 10px;
    margin-left: 20px;
  }
  .ant-select-selector {
    border-radius: 8px !important;
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

export default ReturnRefund;
