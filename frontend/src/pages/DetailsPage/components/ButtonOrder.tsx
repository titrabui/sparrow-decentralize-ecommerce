import { Button, notification } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Text } from 'ui/Typography';

interface IButtonOrderProps {
  handleChangeAmount: any;
  container: any;
  data: any;
}

const ButtonOrder: React.FC<IButtonOrderProps> = (props: IButtonOrderProps) => {
  const { handleChangeAmount, container, data } = props;
  const { amount } = data;

  const handleBuy = (isShowNotification: boolean) => {
    localStorage.setItem('cart', JSON.stringify([{ ...container, ...data }]));
    if (isShowNotification) {
      notification.success({
        description: 'Product has been add to cart',
        message: 'Success'
      });
    }
  };

  const handleAdd = () => {
    handleChangeAmount(amount + 1);
  };

  const handleSub = () => {
    if (amount > 1) handleChangeAmount(amount - 1);
  };

  return (
    <Container>
      <StyleButton onClick={() => handleSub()}>
        <StyleText $color='#000'>-</StyleText>
      </StyleButton>
      <Total>
        <StyleText $color='#000'>{amount}</StyleText>
      </Total>
      <StyleButton onClick={() => handleAdd()}>
        <StyleText $color='#000'>+</StyleText>
      </StyleButton>
      <Link to='/cart'>
        <Buy onClick={() => handleBuy(false)}>
          <Text strong $color='#fff' $size='15px'>
            BUY
          </Text>
        </Buy>
      </Link>
      <AddToCard onClick={() => handleBuy(true)}>
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
`;

const StyleButton = styled(Button)`
  text-align: center;
  height: 35px;
  width: 35px;
  border: none;
  margin-right: 10px;
  margin-top: 8px;
  border-radius: 10px;
  background: #fff;
  &:active {
    background-color: #7b61ff;
  }
`;

const AddToCard = styled(Button)`
  height: 40px;
  width: 150px;
  border: none;
  margin: 5px 0 0 10px;
  border-radius: 10px;
  background: #7b61ff;
  box-shadow: 3px 3px 5px #b1b1fc;
  &:active {
    background-color: #7b61ff;
  }
  &:hover,
  &:focus {
    background-color: #7b61ff;
  }
`;

const Buy = styled(Button)`
  height: 40px;
  width: 150px;
  border: none;
  margin: 5px 0 0 10px;
  border-radius: 10px;
  background: #e86c13;
  text-decoration: none;
  box-shadow: 3px 5px 5px #e5b190;
  &:active {
    background-color: orange;
  }
  &:hover,
  &:focus {
    background-color: #e86c13;
  }
`;

const Total = styled.div`
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

export default ButtonOrder;
