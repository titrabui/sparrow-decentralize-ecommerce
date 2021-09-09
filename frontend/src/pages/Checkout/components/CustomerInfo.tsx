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
            style={{ marginTop: '10px' }}
            name='email'
            rules={[{ required: true, message: 'Please input your Email!' }]}
          >
            <Input
              placeholder='Email'
              value={checkoutData.email}
              onChange={(e) => handleChangeCheckoutData('email', e.target.value)}
            />
          </Form.Item>
        </Email>

        <Shipping>
          <Title style={{ width: '100%' }}>Shipping Address</Title>
          <InputContainer>
            <Form.Item
              style={{ width: '40%' }}
              name='firstName'
              rules={[{ required: true, message: 'Please input your First Name!' }]}
            >
              <Input
                placeholder='First Name'
                value={checkoutData.firstName}
                onChange={(e) => handleChangeCheckoutData('firstName', e.target.value)}
              />
            </Form.Item>
            <StyleItem
              style={{ width: '60%' }}
              name='lastName'
              rules={[{ required: true, message: 'Please input your Last Name!' }]}
            >
              <Input
                placeholder='Last Name'
                value={checkoutData.lastName}
                onChange={(e) => handleChangeCheckoutData('lastName', e.target.value)}
              />
            </StyleItem>
          </InputContainer>

          <InputContainer>
            <Form.Item
              style={{ width: '30%' }}
              name='company'
              rules={[{ required: false, message: 'Please input your Company!' }]}
            >
              <Input
                placeholder='Company (optional)'
                value={checkoutData.company}
                onChange={(e) => handleChangeCheckoutData('company', e.target.value)}
              />
            </Form.Item>
            <StyleItem
              style={{ width: '50%' }}
              name='address'
              rules={[{ required: true, message: 'Please input your Address!' }]}
            >
              <Input
                placeholder='Address'
                value={checkoutData.address}
                onChange={(e) => handleChangeCheckoutData('address', e.target.value)}
              />
            </StyleItem>
            <StyleItem
              style={{ width: '20%' }}
              name='apt'
              rules={[{ required: false, message: 'Please input your Apt!' }]}
            >
              <Input
                placeholder='Apt (optional)'
                value={checkoutData.apt}
                onChange={(e) => handleChangeCheckoutData('apt', e.target.value)}
              />
            </StyleItem>
          </InputContainer>
          <InputContainer>
            <Form.Item
              style={{ width: '40%' }}
              name='country'
              rules={[{ required: true, message: 'Please select your Country!' }]}
            >
              <Select
                placeholder='Country'
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
              </Select>
            </Form.Item>

            <Form.Item
              style={{ width: '40%' }}
              name='state'
              rules={[{ required: false, message: 'Please select your State!' }]}
            >
              <Select
                style={{ paddingLeft: '18px' }}
                placeholder='State (optional)'
                value={checkoutData.state || 'State'}
                onChange={(state: any) =>
                  handleChangeCheckoutData(
                    'state',
                    State.getStateByCodeAndCountry(state, country)?.name
                  )
                }
              >
                {states.map((state: any) => (
                  <Option value={state?.isoCode} key={state?.isoCode}>
                    {state.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <StyleItem
              style={{ width: '20%' }}
              name='zip'
              rules={[{ required: false, message: 'Please input your Zip!' }]}
            >
              <Input
                placeholder='Zip (optional)'
                value={checkoutData.zip}
                onChange={(e) => handleChangeCheckoutData('zip', e.target.value)}
              />
            </StyleItem>
          </InputContainer>
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

const InputContainer = styled.div`
  width: 100%;
  height: 55px;
  margin-top: 10px;
  display: flex;
`;

const StyleItem = styled(Form.Item)`
  padding-left: 18px;
`;

const Email = styled.div`
  height: 100px;
  border-bottom: 1px solid rgba(79, 79, 79, 0.2);
  padding: 0px 30px;
`;

const Shipping = styled.div`
  border-bottom: 1px solid rgba(79, 79, 79, 0.2);
  width: 93%;
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  .ant-select-selector {
    border-radius: 8px !important;
  }
`;

const Container = styled(Box)`
  weight: 100%;
  height: auto;
  margin: auto;
  input {
    border-radius: 8px;
  }
`;
const Title = styled(Text)`
  font-size: 20px;
  font-weight: bold;
  margin-top: 20px;
  display: block;
`;

export default CustomerInfo;
