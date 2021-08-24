import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Text } from 'ui/Typography';

const ButtonOrder: React.FC = () => {
  
  const RenderTotal = styled.div`
    text-align: center;
    height: 50px;
    width: 60px;
    border: 2px;
    margin-right: 10px;
    padding-top: 15px;
    border-radius: 15px;
    background-color: #fff;
    text-decoration: none;
    border: 1px solid #b5adb0;
  `;

  return (
    <Container>
      <Button>
        <StyleText $color='#b5adb0'>-</StyleText>
      </Button>
      <RenderTotal>
        <StyleText $color='#b5adb0'>1</StyleText>
      </RenderTotal>
      <Button>
        <StyleText $color='#000'>+</StyleText>
      </Button>
      <Link to='/cart'>
        <Buy>
          <Text strong $color='#fff' $size='15px'>
            BUY
          </Text>
        </Buy>
      </Link>
      <AddToCard>
        <Text strong $color='#fff' $size='15px'>
          ADD TO CARD
        </Text>
      </AddToCard>
    </Container>
  );
};

const Container = styled.div`
  margin-top: 10px;
  width: 600px;
  height: 45px;
  display: flex;
  background-color: #e3eeff;
`;

const StyleText = styled(Text)`
  font-size: 15px;
  font-weight: bold;
  position: relative;
  padding-top: 5px;
`;

const Button = styled.button`
  text-align: center;
  height: 35px;
  width: 35px;
  border: 2px;
  margin-right: 10px;
  margin-top: 8px;
  border-radius: 10px;
  background-color: #fff;
  text-decoration: none;
  &:active {
    background-color: #a5a6f6;
  }
`;

const AddToCard = styled.button`
  height: 40px;
  width: 150px;
  border: 2px;
  margin: 5px 0 0 10px;
  border-radius: 10px;
  background-color: #7b61ff;
  text-decoration: none;
  box-shadow: 3px 3px 5px #b1b1fc;
  &:active {
    background-color: #a5a6f6;
  }
`;

const Buy = styled.button`
  height: 40px;
  width: 150px;
  border: 2px;
  margin: 5px 0 0 10px;
  border-radius: 10px;
  background-color: #e86c13;
  text-decoration: none;
  box-shadow: 3px 5px 5px #e5b190;
  &:active {
    background-color: orange;
  }
`;

export default ButtonOrder;
