import { Button } from 'antd';
import React from 'react';
import styled from 'styled-components';
import { Text } from 'ui/Typography';

const ButtonSearch: React.FC = () => (
  <StyleButtonSearch>
    <Text strong $color='#fff'>
      Search
    </Text>
  </StyleButtonSearch>
);

const ButtonExport: React.FC = () => (
  <StyleButtonExport>
    <Text strong $color='#fff'>
      Export
    </Text>
  </StyleButtonExport>
);

const StyleButtonSearch = styled(Button)`
  margin: 12px 0 0 20px;
  height: 30px;
  width: 100px;
  box-shadow: 2px 2px 3px #b1b1fc;
  border-radius: 8px;
  border: none;
  background: #7b61ff;
  &:hover,
  &:focus {
    background: #7b61ff;
  }
  &:active {
    background: #a5a6f6;
  }
`;

const StyleButtonExport = styled(Button)`
  margin-top: 12px;
  margin-left: 20px;
  height: 30px;
  width: 100px;
  box-shadow: 2px 2px 3px #b1b1fc;
  border-radius: 8px;
  border: none;
  background: #4cd038;
  &:hover,
  &:focus {
    background: #4cd038;
  }
  &:active {
    background: #45f248;
  }
`;

export default { ButtonSearch, ButtonExport };
