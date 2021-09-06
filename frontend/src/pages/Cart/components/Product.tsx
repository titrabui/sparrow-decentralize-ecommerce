/* eslint-disable no-unused-vars */
import React from 'react';
import styled from 'styled-components';
import Button from 'ui/Button';
import Input from 'ui/Input';
import { Text } from 'ui/Typography';

interface IProductProps {
  data: any;
  handleChangeAmount: (id: number, amount: number) => void;
}

const Product: React.FC<IProductProps> = (props: IProductProps) => {
  const { data, handleChangeAmount } = props;
  return (
    <Container>
      <ImageWrapper>
        <img src={data.img} alt='img' />
      </ImageWrapper>
      <Content>
        <Name>{data.name}</Name>
        <SizeAndColor>
          <Text strong $color='black'>
            Size
          </Text>
          <SizeButton>{data.size}ft</SizeButton>
          {/* <Text strong $color='black'>
            Color
          </Text> */}
          {/* <ColorButton>
            {' '}
            <Color className={data.color} /> {data.color}
          </ColorButton> */}
        </SizeAndColor>
      </Content>
      <Amount>
        <AddPlusButton onClick={() => handleChangeAmount(data.id, data.amount - 1)}>
          -
        </AddPlusButton>
        <StyledInput value={data.amount} />
        <AddPlusButton onClick={() => handleChangeAmount(data.id, data.amount + 1)}>
          +
        </AddPlusButton>
      </Amount>
      <Price>
        <PriceText>{(data.price * data.amount).toFixed(4)} ETH</PriceText>
      </Price>
    </Container>
  );
};

const Price = styled.div`
  position: relative;
  width: 100px;
  margin-top: 10px;
`;

const PriceText = styled(Text)`
  font-size: 24px;
  color: #e86c13;
`;

const StyledInput = styled(Input)`
  background: #ffffff;
  border: 1px solid #b5adb0;
  box-sizing: border-box;
  border-radius: 12px;
  width: 64px;
  height: 40px;
  margin: 0 10px;
  text-align: center;
`;

const AddPlusButton = styled(Button)`
  width: 38px;
  height: 32px;
  background: #ffffff;
  box-shadow: 0px 4px 12px rgba(41, 43, 50, 0.04);
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: black;
`;

const Amount = styled.div`
  display: flex;
  margin-top: 10px;
  align-items: center;
  position: relative;
`;

const Color = styled.div`
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 2px solid #ffffff;
  box-sizing: border-box;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.2);
  border-radius: 50%;
  margin-right: 5px;
  &.White {
    background: #ebebeb;
  }
  &.Orange {
    background: #e86c13;
  }
  &.Violet {
    background: #7b61ff;
  }
`;

const SizeButton = styled(Button)`
  width: 60px;
  height: 32px;
  color: black;
  background: #a5a6f6;
  border: none;
  box-sizing: border-box;
  margin: 0 30px 0 15px;
`;

const ColorButton = styled(Button)`
  width: 110px;
  height: 32px;
  color: #4f4f4fcc;
  font-weight: 400;
  background: #a5a6f6;
  border: none;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 30px 0 15px;
`;

const SizeAndColor = styled(Text)`
  display: flex;
  align-items: center;
`;

const Name = styled(Text)`
  font-size: 22px;
  font-weight: 400;
  display: block;
  margin-bottom: 10px;
`;

const Content = styled.div`
  margin-left: 20px;
`;

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 20px;
  justify-content: space-between;
  position: relative;
  border-bottom: 1px solid rgba(79, 79, 79, 0.2);
`;

const ImageWrapper = styled.div`
  width: 130px;
  height: 120px;
  background: radial-gradient(
    50% 50% at 50% 50%,
    rgba(255, 255, 255, 0.25) 0%,
    rgba(255, 255, 255, 0.5) 94.27%
  );
  border: 1px solid #cfcfcf;
  box-sizing: border-box;
  backdrop-filter: blur(40px);
  border-radius: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: 85%;
  }
`;

export default Product;
