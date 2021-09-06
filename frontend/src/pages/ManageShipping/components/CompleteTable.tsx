import { Button, Table } from 'antd';
import useWallet from 'hooks/useWallet';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Text } from 'ui/Typography';
import { ORDER_STATUS } from 'utils/constants';
import { getContract } from 'utils/getContract';
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

  useEffect(() => {
    const fetchOrderCompleted = async () => {
      if (account) {
        const contract = await getContract(connector);
        const orders = await contract.methods.getAllOrders().call();
        const ordersFiltered = orders.filter(
          (item: any) =>
            Number(item[4]) === ORDER_STATUS.RECEIVED ||
            Number(item[4]) === ORDER_STATUS.REJECT_REFUND ||
            Number(item[4]) === ORDER_STATUS.APPROVAL_REFUND
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

        const ordersCompleted = [];
        const users = await Promise.all(promisesGetUsers);
        users.sort((a, b) => b.id - a.id);
        for (let j = 0; j < users.length; j += 1) {
          const convertedOrdeDate = new Date(users[j].createdAt).toISOString().slice(0, 10);
          ordersCompleted.push({
            key: users[j].id,
            orderDate: convertedOrdeDate,
            createdAt: users[j].createdAt,
            status: 'Completed',
            orderId: orderInfo[j].id,
            parcelType: 'California USA',
            quantity: orderInfo[j].quantity,
            price: orderInfo[j].price
          });
        }
        setData(ordersCompleted);
      }
    };
    fetchOrderCompleted();
  }, [account, connector, library]);

  const getUser = async (userId: number) => {
    const response = await request.getData(`/orders/${userId}`, {});
    return response.data[0];
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
