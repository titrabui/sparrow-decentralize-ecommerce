/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Text } from 'ui/Typography';
import Box from 'ui/Box';
import styled from 'styled-components';
import { Input, Select } from 'antd';
import { Link } from 'react-router-dom';
import Button from 'ui/Button';
import { Country, State } from 'country-state-city';

interface ICustomerInfoProps {
  setStep: any;
  setCheckoutData: any;
  checkoutData: any;
}
const { Option } = Select;
const CustomerInfo: React.FC<ICustomerInfoProps> = (props: ICustomerInfoProps) => {
  const { setStep, setCheckoutData, checkoutData } = props;
  const [states, setStates] = useState([] as any);
  const [country, setCountry] = useState('');

  const countries = Country.getAllCountries();
  const handleChangeCheckoutData = (key: string, value: any) => {
    setCheckoutData({ ...checkoutData, [key]: value });
  };
  return (
    <Container>
      <Email>
        <Title>Customer Information</Title>
        <Input
          placeholder='Email'
          value={checkoutData.email}
          onChange={(e) => handleChangeCheckoutData('email', e.target.value)}
        />
      </Email>
      <Shipping>
        <ShippingTitle>Shipping Address</ShippingTitle>
        <FirstName
          placeholder='First Name'
          value={checkoutData.firstName}
          onChange={(e) => handleChangeCheckoutData('firstName', e.target.value)}
        />
        <LastName
          placeholder='Last Name'
          value={checkoutData.lastName}
          onChange={(e) => handleChangeCheckoutData('lastName', e.target.value)}
        />
        <Company
          placeholder='Company'
          value={checkoutData.company}
          onChange={(e) => handleChangeCheckoutData('company', e.target.value)}
        />
        <Address
          placeholder='Address'
          value={checkoutData.address}
          onChange={(e) => handleChangeCheckoutData('address', e.target.value)}
        />
        <Apt
          placeholder='Apt (optional)'
          value={checkoutData.apt}
          onChange={(e) => handleChangeCheckoutData('apt', e.target.value)}
        />
        <StyledSelect
          defaultValue='Country'
          value={checkoutData.country || 'Country'}
          onChange={(item: any) => {
            setStates(State.getStatesOfCountry(item));
            setCountry(item);
            handleChangeCheckoutData('country', Country.getCountryByCode(item)?.name);
          }}
        >
          {countries.map((item: any) => (
            <Option value={item?.isoCode} key={item?.isoCode}>
              {item.name}
            </Option>
          ))}
        </StyledSelect>
        <StyledSelect
          defaultValue='State'
          value={checkoutData.state || 'State'}
          onChange={(state: any) => {
            handleChangeCheckoutData('state', State.getStateByCodeAndCountry(state, country)?.name);
          }}
        >
          {states.map((state: any) => (
            <Option value={state?.isoCode} key={state?.isoCode}>
              {state.name}
            </Option>
          ))}
        </StyledSelect>
        <Zip
          placeholder='Zip'
          value={checkoutData.zip}
          onChange={(e) => handleChangeCheckoutData('zip', e.target.value)}
        />
      </Shipping>
      <Navigation>
        <Link to='/cart'>{'<'} Return to Cart</Link>
        <Button $bgType='accent' onClick={() => setStep(2)}>
          Continue to Shipping Method
        </Button>
      </Navigation>
    </Container>
  );
};
const Navigation = styled.div`
  padding: 20px 30px;
  display: flex;
  justify-content: space-between;
  button {
    font-size: 16px;
    height: auto;
  }
`;

const Zip = styled(Input)`
  flex-basis: 19%;
`;
const StyledSelect = styled(Select)`
  flex-basis: 39%;
`;
const Address = styled(Input)`
  flex-basis: 69%;
`;
const Apt = styled(Input)`
  flex-basis: 29%;
`;
const Company = styled(Input)`
  flex-basis: 100%;
`;
const FirstName = styled(Input)`
  flex-basis: 49%;
`;
const LastName = styled(Input)`
  flex-basis: 49%;
`;

const Email = styled.div`
  border-bottom: 1px solid rgba(79, 79, 79, 0.2);
  padding: 20px 30px;
`;
const Shipping = styled.div`
  border-bottom: 1px solid rgba(79, 79, 79, 0.2);
  padding: 20px 30px;
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  justify-content: space-between;
  input {
    margin-bottom: 20px;
  }
  .ant-select-selector {
    border-radius: 8px !important;
  }
  .ant-select-arrow {
    top: 33%;
  }
`;
const ShippingTitle = styled(Text)`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
  flex-basis: 100%;
  width: 100%;
`;
const Container = styled(Box)`
  input {
    border-radius: 8px;
  }
`;
const Title = styled(Text)`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
  display: block;
`;
export default CustomerInfo;
