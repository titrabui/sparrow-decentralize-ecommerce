import { Button } from 'antd';
import React from 'react';
import styled from 'styled-components';
import { Text } from 'ui/Typography';

const ButtonColor = (props: any) => {
  const { color, colorText, onClick, active } = props;

  const RenderButton: React.FC = () => (
    <StyleButton onClick={onClick} className={active ? 'active' : ''}>
      <RenderCircleColor />
      <Text m='3px 0 0 5px' $color='#6c6f72' $size='15px'>
        {colorText}
      </Text>
    </StyleButton>
  );

  const RenderCircleColor = () => (
    <Circle>
      <CircleColor style={{ background: color }} />
    </Circle>
  );

  return <RenderButton />;
};

const StyleButton = styled(Button)`
  height: 40px;
  width: 115px;
  border: none;
  margin-left: 10px;
  border-radius: 10px;
  display: flex;
  background: #e3eeff;
  &.active {
    background-color: #7b61ff;
    .ant-typography {
      color: white;
    }
  }
  &:hover {
    background-color: #7b61ff;
    border: 2px solid #6c6cff;
  }
  &:focus {
    background-color: #7b61ff;
    border: 2px solid #6c6cff;
  }
`;

const CircleColor = styled.div`
  position: absolute;
  margin: 2px 0 0 2px;
  display: block;
  height: 19px;
  width: 19px;
  border-radius: 50%;
`;

const Circle = styled.div`
  margin: 1px 0 0 0;
  background-color: #ffff;
  display: block;
  height: 22px;
  width: 22px;
  border-radius: 50%;
  box-shadow: 1px 1px #c7d1e0;
`;

export default ButtonColor;
