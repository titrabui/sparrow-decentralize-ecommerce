import React from 'react';
import styled from 'styled-components';
import { Text } from 'ui/Typography';

const ButtonColor = (props: any) => {
  const { color, colorText } = props;

  const RenderButton: React.FC = () => (
    <Button>
      <RenderCircleColor />
      <Text m='5px 0 0 7px' $color='#6c6f72' $size='15px'>
        {colorText}
      </Text>
    </Button>
  );

  const RenderCircleColor = () => {
    const CircleColor = styled.div`
      position: absolute;
      margin: 2px 0 0 2px;
      background-color: ${color};
      display: block;
      height: 21px;
      width: 21px;
      border-radius: 50%;
    `;

    return (
      <Circle>
        <CircleColor />
      </Circle>
    );
  };

  return <RenderButton />;
};

const Button = styled.button`
  height: 40px;
  width: 110px;
  border: 2px;
  margin-left: 10px;
  border-radius: 10px;
  display: flex;
  background-color: #e3eeff;
  text-decoration: none;
  &:hover {
    background-color: #7b61ff;
    border: 2px solid #6c6cff;
  }
  &:focus {
    background-color: #7b61ff;
    border: 2px solid #6c6cff;
  }
`;

const Circle = styled.div`
  margin: 5px 0 0 5px;
  background-color: #ffff;
  display: block;
  height: 25px;
  width: 25px;
  border-radius: 50%;
  box-shadow: 1px 1px #c7d1e0;
`;

export default ButtonColor;
