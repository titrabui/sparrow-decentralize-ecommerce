import { Button, notification, Table } from 'antd';
import useWallet from 'hooks/useWallet';
import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Text } from 'ui/Typography';
import { ORDER_STATUS, SHIPPER_STAKE_PERCENT } from 'utils/constants';
import { getContract } from 'utils/getContract';
import request from 'utils/request';
import TransactionModal from 'utils/TransactionModal';

interface IPendingTableProps {
  searchInput: any;
  isSearch: boolean;
  setIsSearch: Function;
}
const PendingTable: React.FC<IPendingTableProps> = (props: IPendingTableProps) => {
  const { searchInput, isSearch, setIsSearch } = props;
  const [data, setData] = useState([] as any);
  const [searchData, setSearchData] = useState([] as any);

  const { account, connector, library } = useWallet();

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

  const fetchOrderPending = useCallback(async () => {
    if (account) {
      const contract = await getContract(connector);
      const orders = await contract.methods.getAllOrders().call();
      const ordersFiltered = orders.filter(
        (item: any) =>
          Number(item[4]) === ORDER_STATUS.READY_TO_PICKUP ||
          Number(item[4]) === ORDER_STATUS.CONFIRMED_PICKUP
      );

      const promisesGetUsers = [];
      const orderInfo = [];
      for (let i = 0; i < ordersFiltered.length; i += 1) {
        promisesGetUsers.push(getUser(ordersFiltered[i][0]));
        const orderItem = {
          id: ordersFiltered[i][0],
          quantity: ordersFiltered[i][6],
          price: library?.utils?.fromWei(ordersFiltered[i][7], 'ether'),
          status: ordersFiltered[i][4]
        };
        orderInfo.push(orderItem);
      }

      const ordersPending = [];
      const users = await Promise.all(promisesGetUsers);
      users.sort((a, b) => b.id - a.id);
      for (let j = 0; j < users.length; j += 1) {
        const convertedOrdeDate = new Date(users[j].createdAt).toISOString().slice(0, 10);
        ordersPending.push({
          key: users[j].id,
          orderDate: convertedOrdeDate,
          createdAt: users[j].createdAt,
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
  }, [account, connector, library]);

  useEffect(() => {
    fetchOrderPending();
  }, [fetchOrderPending]);

  const getUser = async (userId: number) => {
    const response = await request.getData(`/orders/${userId}`, {});
    return response.data[0];
  };

  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleShipperPickupOrder = async (event: any, record: any) => {
    event.preventDefault();
    const orderId = Number(record?.id);
    const amount = (
      (parseFloat(record.price) * record.quantity * SHIPPER_STAKE_PERCENT) /
      100
    ).toFixed(4);
    if (connector) {
      const contract = await getContract(connector);
      await contract.methods
        .shipperStakeOrder(orderId)
        .send({
          from: account,
          type: '0x2',
          value: library && library.utils && library.utils.toWei(amount.toString(), 'ether')
        })
        .on('transactionHash', async () => {
          setIsModalVisible(true);
        })
        .on('receipt', async () => {
          setIsModalVisible(false);
          notification.success({
            description: 'Order has been picked up successfully. Please delivery to customer!',
            message: 'Success'
          });

          request
            .putData('/orders/update-order-status', {
              id: orderId.toString(),
              status: ORDER_STATUS.CONFIRMED_PICKUP
            })
            .then(() => {
              fetchOrderPending();
            });
        });
    }
  };

  const handleCancelOrderPickedUp = async (event: any, record: any) => {
    event.preventDefault();
    const orderId = record?.id;
    if (connector) {
      const contract = await getContract(connector);
      await contract.methods
        .shipperCancelOrder(orderId)
        .send({
          from: account,
          type: '0x2'
        })
        .on('transactionHash', async () => {
          setIsModalVisible(true);
        })
        .on('receipt', async () => {
          setIsModalVisible(false);
          notification.success({
            description: 'You are cancelled order successfully.!',
            message: 'Success'
          });

          request
            .putData('/orders/update-order-status', {
              id: orderId.toString(),
              status: ORDER_STATUS.READY_TO_PICKUP
            })
            .then(() => {
              fetchOrderPending();
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
        <StyleButton>
          <Text $color='#40a9ff'>View More</Text>
        </StyleButton>
      )
    },
    {
      title: 'Confirm Shipping',
      dataIndex: 'confirmShipping',
      render: (record: any) => {
        const { status } = record;
        return (
          <div style={{ fontWeight: 'bold' }}>
            {status === ORDER_STATUS.READY_TO_PICKUP.toString() ? (
              <StyleButton onClick={(e) => handleShipperPickupOrder(e, record)}>
                <Text $color='#4cd038'>Confirm</Text>
              </StyleButton>
            ) : (
              <StyleButton onClick={(e) => handleCancelOrderPickedUp(e, record)}>
                <Text $color='#ff5e5e'>Cancel</Text>
              </StyleButton>
            )}
          </div>
        );
      }
    }
  ];

  return (
    <Container>
      <TransactionModal status='The transaction is in processing...' visible={isModalVisible} />
      <StyleTable
        columns={columns}
        dataSource={isSearch ? searchData : data}
        scroll={{ y: 400 }}
        pagination={false}
        rowKey='orderId'
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

export default PendingTable;
