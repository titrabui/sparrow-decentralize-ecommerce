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
import isMember from 'utils/isMember';
import request from 'utils/request';
import ReturnRefundProduct from './ReturnRefundProduct';

interface IReturnRefundProps {
  setTotal: (total: number) => void;
}

const ReturnRefund: React.FC<IReturnRefundProps> = (props: IReturnRefundProps) => {
  const { setTotal } = props;
  const [data, setData] = useState([] as any);
  const { account } = useWallet();

  useEffect(() => {
    const fetchOrderRefund = async () => {
      if (account) {
        const type = isMember(account || 'buyer').toLowerCase()
        const getOrderApprovalRefund = await request.getData(`/orders/${ORDER_STATUS.APPROVAL_REFUND}/${account}/${type}`, {})
        const getOrderRejectRefund = await request.getData(`/orders/${ORDER_STATUS.REJECT_REFUND}/${account}/${type}`, {})
        if (getOrderApprovalRefund && getOrderApprovalRefund.status === 200 && getOrderRejectRefund && getOrderRejectRefund.status === 200) {
          const result = getOrderApprovalRefund.data.concat(getOrderRejectRefund.data);
          setData(result);
        }
      }

    }
    fetchOrderRefund();
  }, [account]);

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
        <Search />
        <Text>Order Date</Text>
        <DatePicker />
        <Text>to</Text>
        <DatePicker />
        <StyledButton>Search</StyledButton>
      </CheckAll>

      {data?.length ? (
        data.map((item: any) => <ReturnRefundProduct data={item} key={item?.id} />)
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

export default ReturnRefund;
