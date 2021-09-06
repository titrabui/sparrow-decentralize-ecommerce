import React, { useState } from 'react';
import Box from 'ui/Box';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Button from 'ui/Button';
import Input from 'ui/Input';
import { Text } from 'ui/Typography';
import { Checkbox, notification, Radio } from 'antd';
import useWallet from 'hooks/useWallet';
import { getContract } from 'utils/getContract';
import request from 'utils/request';
import { ORDER_STATUS } from 'utils/constants';
import { SELLER_ACCOUNT_ADDRESS } from 'environment';

interface IPaymentProps {
  setStep: any;
  setCheckoutData: any;
  checkoutData: any;
}

const Payment: React.FC<IPaymentProps> = (props: IPaymentProps) => {
  const { setStep, setCheckoutData, checkoutData } = props;
  const { address, country, state, amount, price, shippingFee, id, name, size, color } =
    checkoutData;
  const { account, connector, library } = useWallet();

  const [type, setType] = useState(0);
  const [billingAddress, setBillingAddress] = useState('');

  const renderAddress = () => `${address ? `${address},` : ''} ${state ? `${state},` : ''} ${country ? `${country}` : ''
    }`;

  const handleComplete = async () => {
    if (type === 0) setCheckoutData({ ...checkoutData, billingAddress: renderAddress() });
    else setCheckoutData({ ...checkoutData, billingAddress });
    const totalAmount = (amount * price + shippingFee).toFixed(4);
    if (connector) {
      const contract = await getContract(connector);
      const order = await contract.methods
        .createOrder(
          SELLER_ACCOUNT_ADDRESS,
          amount,
          library?.utils?.toWei(price, 'ether'),
          library?.utils?.toWei(shippingFee.toString(), 'ether')
        )
        .send({
          from: account,
          type: '0x2',
          value: library?.utils?.toWei(totalAmount.toString(), 'ether')
        })
        .on('receipt', async () => {
          localStorage.removeItem('cart');
          notification.success({
            description: 'Order created',
            message: 'Success'
          });
        });

      request.postData('/orders/create', {
        id: order.events.Ordered.returnValues.orderId,
        buyer: account,
        shippingAddress: renderAddress(),
        billingAddress: type === 0 ? renderAddress() : billingAddress,
        productId: id,
        name,
        quantity: amount,
        price: Number(price),
        shippingFee,
        totalAmount,
        status: ORDER_STATUS.PAID,
        size,
        color
      });
    }

    setStep(4);
  };

  return (
    <Container>
      <Method>
        <Title>Billing Address</Title>
        <RadioContainer>
          <Radio
            checked={type === 0}
            onClick={() => {
              setType(0);
            }}
          />
          Same as shipping address
        </RadioContainer>
        <RadioContainer>
          <Radio
            checked={type === 1}
            onClick={() => {
              setType(1);
            }}
          />
          Use a different billing address
        </RadioContainer>
        {type === 1 && (
          <Input
            placeholder='Enter billing address'
            value={billingAddress}
            onChange={(e) => setBillingAddress(e.target.value)}
          />
        )}
      </Method>
      <Method>
        <Title>Remember Me</Title>
        <RadioContainer>
          <Checkbox />
          Save my information for a faster checkout
        </RadioContainer>
      </Method>
      <Navigation>
        <Link
          to='/'
          onClick={(e) => {
            e.preventDefault();
            setStep(2);
          }}
        >
          {'<'} Return to Shipping Information
        </Link>
        <Button $bgType='accent' onClick={handleComplete}>
          Completed Order
        </Button>
      </Navigation>
    </Container>
  );
};

const RadioContainer = styled.div`
  display: flex;
  width: 100%;
  margin-top: 10px;
  align-items: center;
  .ant-radio {
    margin-right: 5px;
  }
  .ant-checkbox {
    margin-right: 10px;
  }
  color: black;
  margin-bottom: 10px;
`;

const Method = styled.div`
  padding: 20px 30px;
  border-bottom: 1px solid rgba(79, 79, 79, 0.2);
  .ant-input {
    margin-top: 20px;
  }
`;

const Title = styled(Text)`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
  display: block;
`;

const Container = styled(Box)`
  input {
    border-radius: 8px;
  }
`;

const Navigation = styled.div`
  padding: 20px 30px;
  display: flex;
  justify-content: space-between;
  button {
    font-size: 16px;
    height: auto;
  }
`;
export default Payment;
