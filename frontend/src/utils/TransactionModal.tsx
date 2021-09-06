import { LoadingOutlined } from '@ant-design/icons';
import React from 'react';
import styled from 'styled-components';
import Modal from 'ui/Modal';
import { Text } from 'ui/Typography';

interface TransactionModalProps {
  status: string;
  visible: boolean;
}

const TransactionModal: React.FC<TransactionModalProps> = (props: TransactionModalProps) => {
  const { status, visible } = props;
  return (
    <Modal footer={null} visible={visible}>
      <LoadingOutlined style={{ fontSize: 30, color: 'blue' }} spin />
      <StyleText>{status}</StyleText>
    </Modal>
  );
};

const StyleText = styled(Text)`
  font-size: 25px;
  font-color: blue;
  font-weight: bold;
  margin-left: 30px;
`;

export default TransactionModal;
