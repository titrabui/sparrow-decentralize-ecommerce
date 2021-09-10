import { Radio } from 'antd';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Box from 'ui/Box';
import Button from 'ui/Button';
import { Text } from 'ui/Typography';

interface IShippingMethodProps {
  setStep: any;
  setCheckoutData: any;
  checkoutData: any;
}
const ShippingMethod: React.FC<IShippingMethodProps> = (props: IShippingMethodProps) => {
  const { setStep, setCheckoutData, checkoutData } = props;
  const { firstName, lastName, address, country, state, shippingMethod } = checkoutData;

  const renderAddress = () => {
    const renderText = (value: string) => {
      if (value) return `${value},`;
      return '';
    };
    return `${renderText(`${firstName} ${lastName}`)} ${renderText(address)} ${renderText(
      country
    )} ${renderText(state)} `;
  };

  const handleSelectShippingMethod = (method: string) => {
    let shippingFee = 0;
    switch (method) {
      case 'Land Shipping':
        shippingFee = 0.001;
        break;
      case 'Sea Shipping':
        shippingFee = 0.002;
        break;
      case 'Air Shipping':
        shippingFee = 0.003;
        break;
      default:
        shippingFee = 0;
        break;
    }
    setCheckoutData({ ...checkoutData, shippingFee, shippingMethod: method });
  };

  useEffect(() => {
    if (!shippingMethod) handleSelectShippingMethod('Land Shipping');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shippingMethod]);

  return (
    <Container>
      <Address>
        <TextContainer>
          {' '}
          <Text strong>Shipping Address</Text>
          <Text $color='black'>{renderAddress()}</Text>
        </TextContainer>
      </Address>
      <Method>
        <Title>Shipping Method</Title>
        <RadioContainer>
          <Radio
            checked={shippingMethod === 'Land Shipping'}
            onClick={() => {
              handleSelectShippingMethod('Land Shipping');
            }}
          >
            Land Shipping
          </Radio>
          <Text strong>0.001 ETH</Text>
        </RadioContainer>
        <RadioContainer>
          <Radio
            checked={shippingMethod === 'Sea Shipping'}
            onClick={() => {
              handleSelectShippingMethod('Sea Shipping');
            }}
          >
            Sea Shipping
          </Radio>
          <Text strong>0.002 ETH</Text>
        </RadioContainer>
        <RadioContainer>
          <Radio
            checked={shippingMethod === 'Air Shipping'}
            onClick={() => {
              handleSelectShippingMethod('Air Shipping');
            }}
          >
            Air Shipping
          </Radio>
          <Text strong> 0.003 ETH</Text>
        </RadioContainer>
      </Method>

      <Navigation>
        <Link
          to='/'
          onClick={(e) => {
            e.preventDefault();
            setStep(1);
          }}
        >
          {'<'} Return to Customer Information
        </Link>
        <Button $bgType='accent' onClick={() => setStep(3)}>
          Continue to Payment Method
        </Button>
      </Navigation>
    </Container>
  );
};

const RadioContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-top: 10px;
`;

const Method = styled.div`
  padding: 20px 30px;
  border-bottom: 1px solid rgba(79, 79, 79, 0.2);
`;

const Title = styled(Text)`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
  display: block;
`;

const TextContainer = styled.div``;

const Address = styled.div`
  padding: 20px 30px;
  border-bottom: 1px solid rgba(79, 79, 79, 0.2);
  display: flex;
  justify-content: space-between;
  .ant-typography {
    margin-right: 10px;
  }
  .ant-typography:last-child {
    cursor: pointer;
  }
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
export default ShippingMethod;
