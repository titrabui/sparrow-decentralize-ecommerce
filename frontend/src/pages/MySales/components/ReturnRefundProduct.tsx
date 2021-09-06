/* eslint-disable no-unused-vars */
import { notification } from 'antd';
import useWallet from 'hooks/useWallet';
import React, { useState } from 'react';
import styled from 'styled-components';
import Button from 'ui/Button';
import { Text } from 'ui/Typography';
import { ORDER_STATUS } from 'utils/constants';
import { getContract } from 'utils/getContract';
import getImage from 'utils/getImage';
import request from 'utils/request';
import TransactionModal from 'utils/TransactionModal';

interface IReturnRefundProductProps {
  data: any;
}

const ReturnRefundProduct: React.FC<IReturnRefundProductProps> = (
  props: IReturnRefundProductProps
) => {
  const { data } = props;

  const { account, connector } = useWallet();

  const renderStatus = () => {
    switch (data.status) {
      case ORDER_STATUS.REQUEST_REFUND:
        return <Status $color='#e86c13'>Wait for Confirmation</Status>;
      case ORDER_STATUS.REJECT_REFUND:
        return <Status $color='red'>Refund Reject</Status>;
      case ORDER_STATUS.APPROVAL_REFUND:
        return <Status $color='green'>Refund Confirmed</Status>;
      default:
        return '';
    }
  };

  const { quantity, price, shippingFee } = data;

  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleConfirmRefundOrder = async (orderId: string) => {
    if (connector) {
      const contract = await getContract(connector);
      await contract.methods
        .acceptRefundOrder(orderId)
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
            description: 'Order has been accepted request refund successfully!',
            message: 'Success'
          });

          request.putData('/orders/update-order-status', {
            id: orderId.toString(),
            status: ORDER_STATUS.APPROVAL_REFUND
          });
        });
    }
  };

  const handleRejectRequestRefund = async (orderId: string) => {
    if (connector) {
      const contract = await getContract(connector);
      await contract.methods
        .rejectRefundOrder(orderId)
        .send({
          from: account,
          type: '0x2'
        })
        .on('transactionHash', async () => {
          setIsModalVisible(true);
        })
        .on('receipt', async () => {
          setIsModalVisible(false)
          notification.success({
            description: 'Order has been reject request refund successfully!',
            message: 'Success'
          });

          request.putData('/orders/update-order-status', {
            id: orderId.toString(),
            status: ORDER_STATUS.REJECT_REFUND
          });
        });
    }
  }

  return (
    <Container>
      <TransactionModal status='transaction in progress...' visible={isModalVisible} />
      <ImageWrapper>
        <img src={getImage(data.productId)} alt='img' />
      </ImageWrapper>
      <Content>
        <Name>{data.name}</Name>
        <SizeAndColor>
          <Text strong $color='black'>
            Size
          </Text>
          <SizeButton>{data.size}</SizeButton>
          {/* <Text strong $color='black'>
            Color
          </Text>
          <ColorButton>
            {' '}
            <Color /> {data.color}
          </ColorButton> */}
        </SizeAndColor>
        <Shipping>
          <ShippingTitle>Shipping Address:</ShippingTitle>
          <ShippingAddress $color='black'>{data.shippingAddress}</ShippingAddress>
        </Shipping>
        <Shipping>
          <ShippingTitle>Order ID</ShippingTitle>
          <ShippingAddress $color='black'>{data.id}</ShippingAddress>
        </Shipping>
      </Content>
      <Amount>
        {
          data.status === ORDER_STATUS.APPROVAL_REFUND || data.status === ORDER_STATUS.REJECT_REFUND ? (
            <AddPlusButton $bgType='accent'>Rate</AddPlusButton>
          ) : (
            <>
              <AddPlusButton $bgType='error' onClick={() => handleRejectRequestRefund(data.id)}>Reject</AddPlusButton>
              <AddPlusButton $color='black' onClick={() => handleConfirmRefundOrder(data.id)}>Confirm</AddPlusButton>
            </>
          )
        }

      </Amount>
      <Price>
        {renderStatus()}
        <PriceText>{(quantity * price + shippingFee).toFixed(4)} ETH</PriceText>
      </Price>
    </Container>
  );
};

const Price = styled.div`
  position: relative;
  width: 230px;
  margin-top: 5px;
`;

const PriceText = styled(Text)`
  font-size: 24px;
  color: #e86c13;
  display: block;
  text-align: right;
`;

const Status = styled(Text)`
  font-size: 18px;
  display: block;
  text-align: right;
`;
const AddPlusButton = styled(Button)`
  box-shadow: 0px 4px 12px rgba(41, 43, 50, 0.04);
  font-size: 16px;
  width: 150px;
  margin: 0 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px;
`;

const Amount = styled.div`
  display: flex;
  margin-top: 10px;
  align-items: center;
  position: relative;
`;

const Shipping = styled.div`
  display: flex;
  width: 300px;
  .ant-typography {
    display: block;
  }
  margin-top: 15px;
`;

const ShippingTitle = styled(Text)`
  font-weight: bold;
  color: black;
  width: 140px;
  font-size: 14px;
`;

const ShippingAddress = styled(Text)`
  width: 180px;
  font-size: 14px;
`;

const Color = styled.div`
  display: inline-block;
  width: 20px;
  height: 20px;
  background: #ebebeb;
  border: 2px solid #ffffff;
  box-sizing: border-box;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.2);
  border-radius: 50%;
  margin-right: 5px;
`;

const SizeButton = styled(Button)`
  width: 60px;
  height: 32px;
  color: black;
  background: #a5a6f6;
  border: none;
  box-sizing: border-box;
  margin: 0 30px 0 15px;
`;

const ColorButton = styled(Button)`
  width: 110px;
  height: 32px;
  color: #4f4f4fcc;
  font-weight: 400;
  background: #a5a6f6;
  border: none;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 30px 0 15px;
`;

const SizeAndColor = styled(Text)`
  display: flex;
  align-items: center;
`;

const Name = styled(Text)`
  font-size: 22px;
  font-weight: 400;
  display: block;
  margin-bottom: 10px;
`;

const Content = styled.div`
  margin-left: 20px;
`;

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 20px;
  justify-content: space-between;
  position: relative;
  border-bottom: 1px solid rgba(79, 79, 79, 0.2);
`;

const ImageWrapper = styled.div`
  width: 140px;
  height: 150px;
  background: radial-gradient(
    50% 50% at 50% 50%,
    rgba(255, 255, 255, 0.25) 0%,
    rgba(255, 255, 255, 0.5) 94.27%
  );
  border: 1px solid #cfcfcf;
  box-sizing: border-box;
  backdrop-filter: blur(40px);
  border-radius: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: 85%;
  }
`;

export default ReturnRefundProduct;
