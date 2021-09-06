import { Button, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Text } from 'ui/Typography';
import { ORDER_STATUS } from 'utils/constants';
import request from 'utils/request';

interface ICompleteTableProps {
  searchInput: any;
  isSearch: boolean;
  setIsSearch: Function;
}
const CompleteTable: React.FC<ICompleteTableProps> = (props: ICompleteTableProps) => {
  const { searchInput, isSearch, setIsSearch } = props;
  const [searchData, setSearchData] = useState([] as any);
  const [data, setData] = useState([] as any);

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
  }, [data, searchInput, setIsSearch]);

  useEffect(() => {
    const fetchOrderPending = async () => {
      const result = await request.getData(`/orders/${ORDER_STATUS.RECEIVED}`, {});
      if (result && result.status === 200) {
        const ordersPending = [];
        for (let i = 0; i < result.data.length; i += 1) {
          const convertedOrdeDate = new Date(result.data[i].createdAt).toISOString().slice(0, 10);
          ordersPending.push({
            key: result.data[i].key,
            orderDate: convertedOrdeDate,
            status: 'Completed',
            orderId: result.data[i].id,
            parcelType: 'California USA'
          });
        }
        setData(ordersPending);
      }
    };
    fetchOrderPending();
  }, []);

  const columns = [
    {
      title: 'Order Date',
      dataIndex: 'orderDate',
      width: 150
    },
    {
      title: 'Status',
      dataIndex: 'status',
      width: 150
    },
    {
      title: 'Order ID',
      dataIndex: 'orderId'
    },
    {
      title: 'Parcel Type',
      dataIndex: 'parcelType'
    },
    {
      title: 'View More',
      dataIndex: 'viewMore',
      render: () => (
        <StyleButton>
          <Text $color='#40a9ff'>View More</Text>
        </StyleButton>
      )
    },
    {
      title: '',
      dataIndex: 'confirmShipping'
    }
  ];
  return (
    <Container>
      <StyleTable
        columns={columns}
        dataSource={isSearch ? searchData : data}
        scroll={{ y: 400 }}
        pagination={false}
      />
    </Container>
  );
};

const Container = styled.div`
  width: 95%;
  height: auto;
  margin: auto;
  border: 1px solid #dbdbdc;
  margin-top: 10px;
`;

const StyleTable = styled(Table)`
  .ant-table-thead > tr > th {
    font-weight: bold;
  }
`;

const StyleButton = styled(Button)`
  font-weight: bold;
  border: none;
`;

export default CompleteTable;
