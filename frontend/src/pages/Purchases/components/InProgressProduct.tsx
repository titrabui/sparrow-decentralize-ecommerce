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
import RefundModal from './RefundModal';

interface IInProgressProductProps {
  data: any;
  fetchOrder: Function;
}

const InProgressProduct: React.FC<IInProgressProductProps> = (props: IInProgressProductProps) => {
  const { data, fetchOrder } = props;
  const [openModal, setOpenModal] = useState(false);
  const { account, connector, library } = useWallet();

  const { quantity } = data;
  const price = data?.price;
  const shippingFee = data?.shippingFee;
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handelBuyerReceiveOrder = async (orderId: number) => {
    if (connector) {
      const contract = await getContract(connector);
      await contract.methods
        .receiveOrder(Number(orderId))
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
            description: 'Order has been received successfully!',
            message: 'Success'
          });
          request
            .putData('/orders/update-order-status', {
              id: orderId.toString(),
              status: ORDER_STATUS.RECEIVED
            })
            .then(() => {
              fetchOrder();
            });
        });
    }
  };

  const renderStatus = () => {
    switch (data.status) {
      case ORDER_STATUS.PAID:
        return 'Wait for Seller to confirm';
      case ORDER_STATUS.READY_TO_PICKUP:
        return 'Ready to Pick Up';
      case ORDER_STATUS.CONFIRMED_PICKUP:
        return 'Confirmed Pick Up';
      default:
        return '';
    }
  };

  // ** Only allow handler button when shipper confirm order */
  const isShipperConfirm = data.status !== ORDER_STATUS.CONFIRMED_PICKUP
  
  return (
    <Container>
      <TransactionModal status='The transaction is in processing...' visible={isModalVisible} />
      <RefundModal setOpenModal={setOpenModal} fetchOrder={fetchOrder} visible={openModal} orderId={data.id} />
      <ImageWrapper>
        <img src={getImage(data.productId)} alt='img' />
      </ImageWrapper>
      <Content>
        <Name>{data.name}</Name>
        <SizeAndColor>
          <Text strong $color='black'>
            Size
          </Text>
          <SizeButton>{data.size}ft</SizeButton>
          {/* <Text strong $color='black'>
            Color
          </Text>
          <ColorButton>
            {' '}
            <Color className={data?.color || ''} /> {data.color}
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
        {data.status === 'wait' ? (
          <>
            {' '}
            <AddPlusButton $bgType='accent'>Change Address</AddPlusButton>
            <AddPlusButton $color='black'>Cancel Order</AddPlusButton>
          </>
        ) : (
          <>
            <AddPlusButton disabled={isShipperConfirm} $bgType='accent' onClick={() => handelBuyerReceiveOrder(data.id)}>
              Order Received
            </AddPlusButton>
            <AddPlusButton disabled={isShipperConfirm} $color='black' onClick={() => setOpenModal(true)}>
              Request Refund
            </AddPlusButton>
          </>
        )}
      </Amount>
      <Price>
        <Status>{renderStatus()}</Status>
        <PriceText>{(quantity * price + shippingFee).toFixed(4)} ETH</PriceText>
      </Price>
    </Container>
  );
};

const Price = styled.div`
  position: relative;
  width: 210px;
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
  color: #e86c13;
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
  font-weight: bold;
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
  &.White {
    background: #ebebeb;
  }
  &.Orange {
    background: #e86c13;
  }
  &.Violet {
    background: #7b61ff;
  }
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

export default InProgressProduct;
