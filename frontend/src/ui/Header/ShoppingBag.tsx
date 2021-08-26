import React from 'react';
import shoppingBag from 'assets/images/shoppingBag.svg';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import useWallet from 'hooks/useWallet';
import { getContract } from 'utils/getContract';
import Button from 'ui/Button'

const ShoppingBag: React.FC = () => {
  const { connect,active,account,connector } = useWallet();
  const handleConnectWallet = async (): Promise<any> => {
    await connect();
    handleCallSC()
  };

  const handleCallSC = async () => { 
    if (connector) {
      const contract  = await getContract(connector);
      await contract.methods.createOrder('122223',account,10,1,1).send({from:account,type: '0x2',value:11}).on('receipt', async () => {
        console.log('SUCCESS')
      })
    }
  }
  const getOrder = async () => {
    if (connector) {
      const contract  = await getContract(connector);
      const result = await contract.methods.getOrderInfo('123').call()
      console.log({result})
    }
    
  }
  return (
    <Container>
      <Button onClick={handleConnectWallet} $bgType='primary'>{active ? account?.slice(0,10) : 'Connect Wallet'}</Button>
      {active && <Button onClick={handleCallSC} $bgType='primary'>Call SC</Button>}
      {active && <Button onClick={getOrder} $bgType='primary'>get order</Button>}

      <Link to='/cart'>
        <img src={shoppingBag} alt='shoppingBag' width='50px' height='100px' />
      </Link>
    </Container>
  )
} 

const Container = styled.div`
  text-align: right;
  img {
    cursor: pointer;
  }
`;

export default ShoppingBag;
