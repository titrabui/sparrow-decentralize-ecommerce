import { Button, notification, Table } from 'antd';
import useWallet from 'hooks/useWallet';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Text } from 'ui/Typography';
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

        const promisesGetUsers = [];
        const orderInfo = [];
        for (let i = 0; i < ordersFiltered.length; i += 1) {
          promisesGetUsers.push(getUser(ordersFiltered[i][0]));
          const orderItem = {
            id: ordersFiltered[i][0],
            quantity: ordersFiltered[i][6],
            price: library?.utils?.fromWei(ordersFiltered[i][7], 'ether')
          }
          orderInfo.push(orderItem)
        }

        const ordersPending = [];
        const users = await Promise.all(promisesGetUsers);
        users.sort((a, b) => b.id - a.id);
        for (let j = 0; j < users.length; j += 1) {
          const convertedOrderDate = new Date(users[j].createdAt).toISOString().slice(0, 10);
          ordersPending.push({
            key: users[j].id,
            orderDate: convertedOrderDate,
            status: 'Ready to Pickup',
            orderId: orderInfo[j].id,
            parcelType: 'California USA',
            quantity: orderInfo[j].quantity,
            price: orderInfo[j].price,
            confirmShipping: orderInfo[j]
          });
        }
        setData(ordersPending);
      }
    };
    fetchOrderPending();
  }, [account, connector, library]);

  const getUser = async (userId: number) => {
    const response = await request.getData(`/orders/${userId}`, {});
    return response.data[0];
  }

  const handleShipperPickupOrder = async (event: any, record: any) => {
    event.preventDefault();
    const orderId = Number(record?.id);
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

        window.location.reload();
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

        window.location.reload();
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
        <StyleButton>
          <Text $color='#40a9ff'>View More</Text>
        </StyleButton>
      )
    },
    {
      title: 'Confirm Shipping',
      dataIndex: 'confirmShipping',
      render: (record: any) => (
        <div>
          <StyleButton onClick={(e) => handleShipperPickupOrder(e, record)}>
            <Text $color='#4cd038'>Confirm</Text>
          </StyleButton>
          <StyleButton
            style={{ marginLeft: '10px' }}
            onClick={(e) => handleCancelOrderPickedUp(e, record)}
          >
            <Text $color='#ff5e5e'>Reject</Text>
          </StyleButton>
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

const StyleButton = styled(Button)`
  font-weight: bold;
  border: none;
`;

export default PendingTable;
