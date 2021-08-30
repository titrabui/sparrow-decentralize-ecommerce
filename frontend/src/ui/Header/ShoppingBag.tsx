import { message, Radio } from 'antd';
import shoppingBag from 'assets/images/shoppingBag.svg';
import useWallet from 'hooks/useWallet';
import React from 'react';
import { Link } from 'react-router-dom';
import { routesEnum } from 'routes/routesData';
import { history } from 'store';
import styled from 'styled-components';
import Button from 'ui/Button';
import Modal from 'ui/Modal';
import isMember from 'utils/isMember';

const ShoppingBag: React.FC = () => {
  const [visible, setVisible] = React.useState(false);
  const [memberType, setMemberType] = React.useState('Buyer');
  const { connect, active, account } = useWallet();
  const handleConnectWallet = async (): Promise<any> => {
    await connect();
  };
  const isAMember = isMember(account || '');
  const onChange = (e: any) => {
    setMemberType(e.target.value);
  };
  let route = '';

  const handleSubmit = () => {
    const currentRoute = history.location.pathname;
    switch (memberType) {
      case 'Buyer':
        route = routesEnum.purchases;
        break;
      case 'Seller':
        route = routesEnum.mySales;
        break;
      case 'Shipper':
        route = routesEnum.shipping;
        break;
      default:
        route = routesEnum.home;
    }
    const buyers = localStorage.getItem('Buyer') && JSON.parse(localStorage.getItem('Buyer') || '');
    const sellers =
      localStorage.getItem('Seller') && JSON.parse(localStorage.getItem('Seller') || '');
    const shippers =
      localStorage.getItem('Shipper') && JSON.parse(localStorage.getItem('Shipper') || '');
    if (buyers)
      localStorage.setItem(
        'Buyer',
        JSON.stringify(buyers.filter((buyer: string) => buyer !== account))
      );
    if (sellers)
      localStorage.setItem(
        'Seller',
        JSON.stringify(sellers.filter((seller: string) => seller !== account))
      );
    if (shippers)
      localStorage.setItem(
        'Shipper',
        JSON.stringify(shippers.filter((shipper: string) => shipper !== account))
      );
    const data = localStorage.getItem(memberType);
    if (!data) localStorage.setItem(memberType, JSON.stringify([account]));
    else {
      const parseData = JSON.parse(data);
      const uniqueData = [...new Set([...parseData, account])];
      localStorage.setItem(memberType, JSON.stringify(uniqueData));
    }
    message.success(`You are now a ${memberType}`);
    setVisible(false);
    if (currentRoute !== routesEnum.home) history.push(route);
    window.location.reload();
  };
  return (
    <Container>
      {visible && (
        <StyledModal visible title='Change Member Role' onCancel={() => setVisible(false)}>
          <Radio.Group onChange={onChange} value={memberType}>
            {isAMember !== 'Buyer' && <Radio value='Buyer'>Buyer</Radio>}
            {isAMember !== 'Seller' && <Radio value='Seller'>Seller</Radio>}
            {isAMember !== 'Shipper' && <Radio value='Shipper'>Shipper</Radio>}
          </Radio.Group>
          <ButtonContainer>
            <CancelButton $color='black' onClick={() => setVisible(false)}>
              Cancel
            </CancelButton>
            <SubmitButton onClick={handleSubmit}>Submit</SubmitButton>
          </ButtonContainer>
        </StyledModal>
      )}
      <Button onClick={handleConnectWallet} $bgType='primary'>
        {active ? account?.slice(0, 10) : 'Connect Wallet'}
      </Button>
      {isAMember && (
        <Button onClick={() => setVisible(true)} $bgType='primary'>
          {isAMember}
        </Button>
      )}
      <Link to='/cart'>
        <img src={shoppingBag} alt='shoppingBag' width='50px' height='100px' />
      </Link>
    </Container>
  );
};

const Container = styled.div`
  text-align: right;
  img {
    cursor: pointer;
  }
  button {
    margin-right: 10px;
  }
`;

const StyledModal = styled(Modal)`
  .ant-modal-footer {
    display: none;
  }
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

export default ShoppingBag;
