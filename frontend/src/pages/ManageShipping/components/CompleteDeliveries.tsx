import { DatePicker } from 'antd';
import React from 'react';
import styled from 'styled-components';
import { Text } from 'ui/Typography';
import ButtonShipping from './ButtonShipping';
import CompleteTable from './CompleteTable';
import DropdownShipping from './DropdownShipping';

const CompleteDeliveries: React.FC = () => (
  <Container>
    <Title>
      <Text ml='20px' strong $size='17px' $color='#fff'>
        Complete Deliveries
      </Text>
    </Title>
    <Filter>
      <StyleText>Filter deliveries from</StyleText>
      <StyleDatePicker />
      <StyleText ml='15px'>to</StyleText>
      <StyleDatePicker />
      <ButtonShipping.ButtonSearch />
      <DropdownShipping />
      <ButtonShipping.ButtonExport />
    </Filter>
    <CompleteTable />
  </Container>
);

const Container = styled.div`
  width: 100 %;
  height: 600px;
  margin-top: 30px;
  background-color: #f4f8ff;
  border-top: 1px solid #dbdbdc;
`;

const Title = styled.div`
  width: 100%;
  height: 30px;
  background: linear-gradient(45deg, #8736bd 0%, #38e5f2 99.99%);
`;

const Filter = styled.div`
  width: 95%;
  height: 50px;
  margin: auto;
  display: flex;
`;

const StyleText = styled(Text)`
  margin-top: 15px;
  font-weight: bold;
  font-size: 16px;
`;

const StyleDatePicker = styled(DatePicker)`
  margin: 10px 0 0 15px;
  height: 35px;
`;

export default CompleteDeliveries;
