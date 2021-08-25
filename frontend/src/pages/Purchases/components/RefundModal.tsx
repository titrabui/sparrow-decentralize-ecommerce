import React, { useState } from 'react';
import Modal from 'ui/Modal';
import Button from 'ui/Button';
import styled from 'styled-components';
import { Checkbox, Radio } from 'antd';
import { Text } from 'ui/Typography';
import { Link } from 'react-router-dom';

interface IModalProps {
  setOpenModal: any;
  visible: boolean;
}
const RefundModal: React.FC<IModalProps> = (props: IModalProps) => {
  const { setOpenModal, visible } = props;
  const [completed, setCompleted] = useState(false);

  const handleSubmit = () => {
    setCompleted(true);
    setOpenModal(false);
  };
  return (
    <>
      <StyledModal title='Refund Request' visible={visible} onCancel={() => setOpenModal(false)}>
        I would like to cancel my order (Order ID: BK20210800002) because of *:
        <CheckBoxContainer>
          <Checkbox /> <Text>Production Error</Text>
        </CheckBoxContainer>
        <CheckBoxContainer>
          <Checkbox /> <Text>Damage while shipping</Text>
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
          You order (Order ID: <Link to='/'>BK20210800002</Link>) has been transfer to our
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
