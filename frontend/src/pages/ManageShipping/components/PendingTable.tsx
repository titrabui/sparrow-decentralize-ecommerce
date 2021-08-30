import { notification, Table } from 'antd';
import useWallet from 'hooks/useWallet';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'ui/Typography';
import { ORDER_STATUS } from 'utils/constants';
import { getContract } from 'utils/getContract';
import request from 'utils/request';

const PendingTable: React.FC = () => {
  const [data, setData] = useState([] as any);
  const { account, connector, library } = useWallet();
  useEffect(() => {
    const fetchOrderPending = async () => {
      if (account) {
        const contract = await getContract(connector);
        const orders = await contract.methods.getAllOrders().call();
        const ordersFiltered = orders.filter((item: any) => Number(item[4]) === ORDER_STATUS.READY_TO_PICKUP)

        const promises = [];
        for (let i = 0; i < ordersFiltered.length; i += 1) {
          promises.push(getUser(ordersFiltered[i][0]));
        }

        const ordersPending = [];
        const users = await Promise.all(promises);
        users.sort((a, b) => b.id - a.id);
        for (let j = 0; j < users.length; j += 1) {
          const convertedOrdeDate = new Date(users[j].createdAt).toISOString().slice(0, 10);
          ordersPending.push({
            key: users[j].id,
            orderDate: convertedOrdeDate,
            status: 'Ready to Pickup',
            orderId: users[j].id,
            parcelType: 'California USA',
            quantity: users[j].quantity,
            price: users[j].price
          });
        }
        setData(ordersPending);
      }
    };
    fetchOrderPending();
  }, [account, connector]);

  const getUser = async (userId: number) => {
    const response = await request.getData(`/orders/${userId}`, {});
    return response.data[0];
  }

  const handleShipperPickupOrder = async (event: any, record: any) => {
    event.preventDefault();
    const orderId = record?.orderId;
    const amount = (record.price * record.quantity * 20) / 100;
    if (connector) {
      const contract = await getContract(connector);
      await contract.methods
        .shipperStakeOrder(orderId)
        .send({
          from: account,
          type: '0x2',
          value: library && library.utils && library.utils.toWei(amount.toString(), 'ether')
        })
        .on('receipt', async () => {
          notification.success({
            description: 'Order has been picked up successfully. Please delivery to customer!',
            message: 'Success'
          });

          request.putData('/orders/update-order-status', {
            id: orderId,
            status: ORDER_STATUS.CONFIRMED_PICKUP
          });
        });
    }
  };

  const handleCancelOrderPickedUp = async (event: any, record: any) => {
    event.preventDefault();
    const orderId = record?.orderId;
    const amount = (record.price * record.quantity * 20) / 100;
    if (connector) {
      const contract = await getContract(connector);
      await contract.methods
        .shipperCancelOrder(orderId)
        .send({
          from: account,
          type: '0x2',
          value: library && library.utils && library.utils.toWei(amount.toString(), 'ether')
        })
        .on('receipt', async () => {
          notification.success({
            description: 'You are cancelled order successfully.!',
            message: 'Success'
          });

          request.putData('/orders/update-order-status', {
            id: orderId,
            status: ORDER_STATUS.READY_TO_PICKUP
          });
        });
    }
  };

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
      title: 'Confirm Shipping',
      dataIndex: 'confirmShipping',
      render: (record: any) => (
        <div style={{ fontWeight: 'bold' }}>
          <Link $color='#4cd038' href='http' onClick={(e) => handleShipperPickupOrder(e, record)}>
            Confirm
          </Link>
          {' | '}
          <Link $color='#ff5e5e' href='http' onClick={(e) => handleCancelOrderPickedUp(e, record)}>
            Reject
          </Link>
        </div>
      )
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

export default PendingTable;
