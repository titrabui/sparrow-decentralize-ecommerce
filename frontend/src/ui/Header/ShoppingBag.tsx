import React from 'react';
import shoppingBag from 'assets/images/shoppingBag.svg';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import useWallet from 'hooks/useWallet';
import Button from 'ui/Button';

const ShoppingBag: React.FC = () => {
  const { connect, active, account } = useWallet();
  const handleConnectWallet = async (): Promise<any> => {
    await connect();
  };

  return (
    <Container>
      <Button onClick={handleConnectWallet} $bgType='primary'>
        {active ? account?.slice(0, 10) : 'Connect Wallet'}
      </Button>
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
`;

export default ShoppingBag;
