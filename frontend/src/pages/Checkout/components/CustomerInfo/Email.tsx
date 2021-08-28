import React from 'react';
import styled from 'styled-components';
import { Text } from 'ui/Typography';

const Email: React.FC = () => (
  <Container>
    <Title>Customer Information</Title>
    {/* <Form.Item name='email' rules={[{ required: true, message: 'Please input your Email!' }]}>
      <Input
        placeholder='Email'
        value={email}
        onChange={(e) => handleChangeCheckoutData('email', e.target.value)}
      />
    </Form.Item> */}
  </Container>
);

const Container = styled.div`
  border-bottom: 1px solid rgba(79, 79, 79, 0.2);
  padding: 0px 30px;
`;

const Title = styled(Text)`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
  display: block;
`;

export default Email;
