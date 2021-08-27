import React from 'react';
import Button from 'ui/Button';
import Modal from 'ui/Modal';
import { message, Radio } from 'antd';
import styled from 'styled-components';
import useWallet from 'hooks/useWallet';
import isMember from 'utils/isMember';

const BecomeMember = () => {
  const { connect, active, account } = useWallet();
  const handleConnectWallet = async (): Promise<any> => {
    await connect();
  };

  const handleBecomeMember = () => {
    setVisible(true);
  };
  const handleSubmit = () => {
    if (!account) {
      message.error('You must connect to wallet');
    } else {
      const data = localStorage.getItem(memberType);
      if (!data) localStorage.setItem(memberType, JSON.stringify([account]));
      else {
        const parseData = JSON.parse(data);
        const uniqueData = [...new Set([...parseData, account])];
        localStorage.setItem(memberType, JSON.stringify(uniqueData));
      }
      message.success(`You are now a ${memberType}`);
      setVisible(false);
    }
  };
  const [memberType, setMemberType] = React.useState('Buyer');
  const [visible, setVisible] = React.useState(false);

  const onChange = (e: any) => {
    setMemberType(e.target.value);
  };

  return (
    <div>
      {visible && (
        <StyledModal visible title='Select Member Type'>
          <Radio.Group onChange={onChange} value={memberType}>
            <Radio value='Buyer'>Buyer</Radio>
            <Radio value='Seller'>Seller</Radio>
            <Radio value='Shipper'>Shipper</Radio>
          </Radio.Group>
          <ConnectButton onClick={handleConnectWallet} $bgType='accent'>
            {active ? account?.slice(0, 10) : 'Connect Wallet'}
          </ConnectButton>
          <ButtonContainer>
            <CancelButton $color='black' onClick={() => setVisible(false)}>
              Cancel
            </CancelButton>
            <SubmitButton onClick={handleSubmit}>Submit</SubmitButton>
          </ButtonContainer>
        </StyledModal>
      )}
      {!isMember(account || '') && (
        <StyledButton $bgType='accent' onClick={handleBecomeMember}>
          Become a member
        </StyledButton>
      )}
        {isMember(account || '') && (
        <StyledButton $bgType='accent'>
          Hello,  {isMember(account || '')}
        </StyledButton>
      )}
    </div>
  );
};

const StyledModal = styled(Modal)`
  .ant-modal-footer {
    display: none;
  }
`;

const StyledButton = styled(Button)`
  position: absolute;
  top: 230px;
  left: 100px;
`;

const ConnectButton = styled(Button)`
  display: block;
  margin-top: 20px;
`;

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

export default BecomeMember;
