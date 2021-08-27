import { Button } from 'antd';
import React from 'react';
import styled from 'styled-components';
import { Text } from 'ui/Typography';

const ButtonSize = (props: any) => {
  const { text, onClick, active } = props;

  const RenderButton = () => (
    <StyleButton onClick={onClick} className={active ? 'active' : ''}>
      <StyleText>{text}</StyleText>
    </StyleButton>
  );

  return <RenderButton />;
};

const StyleText = styled(Text)`
  font-size: 13px;
  font-weight: bold;
  margin-top: 4px;
`;

const StyleButton = styled(Button)`
  text-align: center;
  height: 40px;
  width: 52px;
  border: 2px;
  margin-left: 10px;
  border-radius: 10px;
  background-color: #e3eeff;
  text-decoration: none;
  border: 1px solid #d9d9ff;
  &.active {
    background-color: #a5a6f6;
    .ant-typography {
      color: #000;
    }
    border: 2px solid #6c6cff;
  }
  &:focus {
    background-color: #a5a6f6;
    border: 2px solid #6c6cff;
  }
`;

export default ButtonSize;
