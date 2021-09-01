import React, { useState } from 'react';
import Modal from 'ui/Modal';
import Button from 'ui/Button';
import styled from 'styled-components';
import useWallet from 'hooks/useWallet';
import { getContract } from 'utils/getContract';
import { ERROR_STATUS, ORDER_STATUS } from 'utils/constants';
import request from 'utils/request';
import { Space, Radio, notification } from 'antd';
import { Text } from 'ui/Typography';
import { Link } from 'react-router-dom';

interface IModalProps {
  setOpenModal: any;
  visible: boolean;
  orderId: string;
}

const RefundModal: React.FC<IModalProps> = (props: IModalProps) => {
  const { setOpenModal, visible, orderId } = props;
  const [completed, setCompleted] = useState(false);
  const [reasonError, setReasonError] = useState(ERROR_STATUS.REFUNDED_PRODUCT_ERROR)
  const { account, connector } = useWallet();

  const handleSubmit = async () => {
    if (connector) {
      const contract = await getContract(connector);

      await contract.methods
        .requestRefund(orderId, reasonError)
        .send({
          from: account,
          type: '0x2'
        }).on('receipt', async () => {
          notification.success({
            description: 'Order has been request refund successfully!',
            message: 'Success'
          });

          request.putData('/orders/update-order-status', {
            id: orderId,
            status: ORDER_STATUS.REQUEST_REFUND,
            statusErrorType: reasonError
          });
        });
      setOpenModal(false);
      setCompleted(true);
    }
  };

  return (
    <>
      <StyledModal title='Refund Request' visible={visible} onCancel={() => setOpenModal(false)}>
        I would like to cancel my order (Order ID: {orderId}) because of *:
        <CheckBoxContainer>
          <Radio.Group onChange={(e) => setReasonError(e.target.value)} value={reasonError}>
            <Space direction='vertical'>
              <Radio value={ERROR_STATUS.REFUNDED_PRODUCT_ERROR}>Production Error</Radio>
              <Radio value={ERROR_STATUS.REFUNDED_SHIPPING_ERROR}>Damage while shipping</Radio>
            </Space>
          </Radio.Group>
        </CheckBoxContainer>
        <StyledRadio value={1} />
        <Text>
          I Agree with <Link to='/'>Term and Use</Link> and <Link to='/'>Refund Policy</Link>
        </Text>
        <ButtonContainer>
          <CancelButton $color='black' onClick={() => setOpenModal(false)}>
            Cancel
          </CancelButton>
          <SubmitButton onClick={handleSubmit}>Submit</SubmitButton>
        </ButtonContainer>
      </StyledModal>
      {completed && (
        <StyledModal title='Request Completed!' visible onCancel={() => setCompleted(false)}>
          <br />
          You order (Order ID: <Link to='/'>{orderId}</Link>) has been transfer to our
          department to process. Please check the Refund status in{' '}
          <Link to='/purchases'>My Purchases</Link> tab. We will check and get back to you soon.
          <br />
          <br />
          We are very sorry about this! Thank you for shopping with us.
          <ButtonContainer>
            <SubmitButton onClick={() => setCompleted(false)}>OK</SubmitButton>
          </ButtonContainer>
        </StyledModal>
      )}
    </>
  );
};
const SubmitButton = styled(Button)`
  margin: 0 5px;
  color: white;
  background: #7b61ff;
  border: none;
  box-sizing: border-box;
`;
const CancelButton = styled(Button)`
  margin: 0 5px;
  color: black;
`;

const ButtonContainer = styled.div`
  margin-top: 20px;
  display: flex;
  width: 100%;
  justify-content: flex-end;
`;

const StyledRadio = styled(Radio)`
  margin-top: 20px;
`;

const CheckBoxContainer = styled.div`
  .ant-typography {
    margin-left: 10px;
    color: black;
  }
  margin-top: 5px;
  &:first-child {
    margin-top: 20px;
  }
  .ant-checkbox-inner {
    width: 28px;
    height: 28px;
  }
  .ant-checkbox-checked::after {
    border: none;
  }
  display: flex;
  align-items: center;
`;

const StyledModal = styled(Modal)`
  .ant-modal-footer {
    display: none;
  }
  .ant-modal-body {
    padding-top: 10px;
  }
`;
export default RefundModal;
