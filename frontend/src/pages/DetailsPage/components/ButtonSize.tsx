import React from 'react';
import styled from 'styled-components';

const ButtonSize = (props: any) => {
  const { text } = props;

  const RenderButton = () => (
    <Button>
      <StyleText>
        {text}
      </ StyleText>
    </Button>
  );

  return <RenderButton />;
};

const StyleText = styled.p`
  font-size: 15px;
  font-weight: bold;
  position: relative;
  padding-top: 7px;
`;

const Button = styled.button`
  text-align: center;
  height: 40px;
  width: 45px;
  border: 2px;
  margin-left: 10px;
  border-radius: 10px;
  background-color: #e3eeff;
  text-decoration: none;
  border: 1px solid #d9d9ff;
  &:hover {
    background-color: #7b61ff;
    border: 2px solid #6c6cff;
  }
  &:focus {
    background-color: #7b61ff;
    border: 2px solid #6c6cff;
  }
`;

export default ButtonSize;
