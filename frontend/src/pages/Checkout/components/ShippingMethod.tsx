import React from 'react';
import Box from 'ui/Box';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Button from 'ui/Button';
import { Text } from 'ui/Typography';
import { Radio } from 'antd';

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
      case 'UPS Ground':
        shippingFee = 0.001;
        break;
      case 'UPS 3 Day Select':
        shippingFee = 0.002;
        break;
      case 'UPS 2nd Day Air':
        shippingFee = 0.003;
        break;
      case 'UPS Next Day Air':
        shippingFee = 0.005;
        break;
      default:
        shippingFee = 0;
        break;
    }
    setCheckoutData({ ...checkoutData, shippingFee, shippingMethod: method });
  };
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
            checked={shippingMethod === 'UPS Ground'}
            onClick={() => {
              handleSelectShippingMethod('UPS Ground');
            }}
          >
            UPS Ground
          </Radio>
          <Text strong>0.001 ETH</Text>
        </RadioContainer>
        <RadioContainer>
          <Radio
            checked={shippingMethod === 'UPS 3 Day Select'}
            onClick={() => {
              handleSelectShippingMethod('UPS 3 Day Select');
            }}
          >
            UPS 3 Day Select
          </Radio>
          <Text strong>0.002 ETH</Text>
        </RadioContainer>
        <RadioContainer>
          <Radio
            checked={shippingMethod === 'UPS 2nd Day Air'}
            onClick={() => {
              handleSelectShippingMethod('UPS 2nd Day Air');
            }}
          >
            UPS 2nd Day Air
          </Radio>
          <Text strong> 0.003 ETH</Text>
        </RadioContainer>
        <RadioContainer>
          <Radio
            checked={shippingMethod === 'UPS Next Day Air'}
            onClick={() => {
              handleSelectShippingMethod('UPS Next Day Air');
            }}
          >
            UPS Next Day Air
          </Radio>
          <Text strong>0.005 ETH</Text>
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
