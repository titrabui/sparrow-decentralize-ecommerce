import { Table } from 'antd';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ORDER_STATUS } from 'utils/constants';
import request from 'utils/request';
import { Link } from 'ui/Typography';

const CompleteTable: React.FC = () => {

  const [data, setData] = useState([] as any);

  useEffect(() => {
    const fetchOrderPending = async () => {
      const result = await request.getData(`/orders/${ORDER_STATUS.RECEIVED}`, {})
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
          })
        }
        setData(ordersPending);
      }
    }
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
        <Link $color='#40a9ff' href='http'>
          View More
        </Link>
      )
    },
    {
      title: '',
      dataIndex: 'confirmShipping'
    }
  ];
  return (
    <Container>
      <StyleTable columns={columns} dataSource={data} scroll={{ y: 400 }} pagination={false} />
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

export default CompleteTable;
