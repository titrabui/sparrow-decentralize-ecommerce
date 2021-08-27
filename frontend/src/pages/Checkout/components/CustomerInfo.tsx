/* eslint-disable no-unused-vars */
import { Form, Input, Select } from 'antd';
import { Country, State } from 'country-state-city';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Box from 'ui/Box';
import Button from 'ui/Button';
import { Text } from 'ui/Typography';

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

  const onFinish = () => setStep(2);

  return (
    <Container>
      <Form name='basic' onFinish={onFinish}>
        <Email>
          <Title>Customer Information</Title>
          <Form.Item
            name='email'
            rules={[
              {
                required: true,
                message: 'Please input your Email!'
              }
            ]}
          >
            <Input
              placeholder='Email'
              value={checkoutData.email}
              onChange={(e) => handleChangeCheckoutData('email', e.target.value)}
            />
          </Form.Item>
        </Email>

        <Shipping>
          <ShippingTitle>Shipping Address</ShippingTitle>

          <Form.Item
            name='firstName'
            rules={[
              {
                required: true,
                message: 'Please input your First Name!'
              }
            ]}
          >
            <FirstName
              placeholder='First Name'
              value={checkoutData.firstName}
              onChange={(e) => handleChangeCheckoutData('firstName', e.target.value)}
            />
          </Form.Item>
          <Form.Item
            name='lastName'
            rules={[
              {
                required: true,
                message: 'Please input your Last Name!'
              }
            ]}
          >
            <LastName
              placeholder='Last Name'
              value={checkoutData.lastName}
              onChange={(e) => handleChangeCheckoutData('lastName', e.target.value)}
            />
          </Form.Item>
          <Form.Item
            name='company'
            rules={[
              {
                required: false,
                message: 'Please input your company!'
              }
            ]}
          >
            <Company
              placeholder='Company (optional)'
              value={checkoutData.company}
              onChange={(e) => handleChangeCheckoutData('company', e.target.value)}
            />
          </Form.Item>
          <Form.Item
            name='address'
            rules={[
              {
                required: true,
                message: 'Please input your address!'
              }
            ]}
          >
            <Address
              placeholder='Address'
              value={checkoutData.address}
              onChange={(e) => handleChangeCheckoutData('address', e.target.value)}
            />
          </Form.Item>
          <Form.Item
            name='apt'
            rules={[
              {
                required: false,
                message: 'Please input your apt!'
              }
            ]}
          >
            <Apt
              placeholder='Apt (optional)'
              value={checkoutData.apt}
              onChange={(e) => handleChangeCheckoutData('apt', e.target.value)}
            />
          </Form.Item>

          <Form.Item
            name='country'
            rules={[
              {
                required: true,
                message: 'Please select your country!'
              }
            ]}
          >
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
          </Form.Item>

          <Form.Item
            name='state'
            rules={[
              {
                required: false,
                message: 'Please select your state!'
              }
            ]}
          >
            <StyledSelect
              defaultValue='State'
              value={checkoutData.state || 'State'}
              onChange={(state: any) => {
                handleChangeCheckoutData(
                  'state',
                  State.getStateByCodeAndCountry(state, country)?.name
                );
              }}
            >
              {states.map((state: any) => (
                <Option value={state?.isoCode} key={state?.isoCode}>
                  {state.name}
                </Option>
              ))}
            </StyledSelect>
          </Form.Item>
          <Form.Item
            name='zip'
            rules={[
              {
                required: false,
                message: 'Please input your zip!'
              }
            ]}
          >
            <Zip
              placeholder='Zip (optional)'
              value={checkoutData.zip}
              onChange={(e) => handleChangeCheckoutData('zip', e.target.value)}
            />
          </Form.Item>
        </Shipping>
        <Form.Item>
          <Navigation>
            <Link to='/cart'>{'<'} Return to Cart</Link>
            <Button htmlType='submit' $bgType='primary'>
              Continue to Shipping Method
            </Button>
          </Navigation>
        </Form.Item>
      </Form>
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
  .ant-select {
    width: 50px;
  }
  .ant-select-arrow {
    margin-top: 0px;
  }
`;
const FirstName = styled(Input)`
  flex-basis: 49%;
  width: 380px;
`;
const LastName = styled(Input)`
  flex-basis: 49%;
  width: 380px;
`;
const Company = styled(Input)`
  flex-basis: 100%;
  width: 290px;
`;
const Address = styled(Input)`
  flex-basis: 69%;
  width: 290px;
`;
const Apt = styled(Input)`
  flex-basis: 29%;
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
