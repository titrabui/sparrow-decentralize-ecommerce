import { Table } from 'antd';
import React from 'react';
import styled from 'styled-components';
import { Link } from 'ui/Typography';

const PendingTable: React.FC = () => {
  const data = [];
  for (let i = 0; i < 100; i += 1) {
    data.push({
      key: i,
      orderDate: `03/07/2021`,
      status: 'Ready to Pickup',
      oderId: `89752${i}`,
      parcelType: 'California USA'
    });
  }
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
    dataIndex: 'oderId'
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
    title: 'Confirm Shipping',
    dataIndex: 'confirmShipping',
    render: () => (
      <div style={{ fontWeight: 'bold' }}>
        <Link $color='#4cd038' href='http'>
          Confirm
        </Link>
        {' | '}
        <Link $color='#ff5e5e' href='http'>
          Reject
        </Link>
      </div>
    )
  }
];

export default PendingTable;
