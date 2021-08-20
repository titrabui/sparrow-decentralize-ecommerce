import p2 from 'assets/images/p2.png';
import React from 'react';
import styled from 'styled-components';
import Box from 'ui/Box';
import MainContainer from 'ui/MainContainer';
import { Text } from 'ui/Typography';
import ButtonColor from './ButtonColor';
import ButtonOrder from './ButtonOrder';
import ButtonSize from './ButtonSize';
import { Detail, Item, Name, Price, RenderTextList } from './Info';

const data = {
  name: 'Summer Fighting T-shirt 01',
  detail: 'Detail Product...',
  brand: 'Napa',
  code: 'NP001',
  status: 'Available',
  price: '00.65',
  color: 'orange',
  colorText: 'Orange'
};

const DetailsPage: React.FC = () => {
  const { name, detail, brand, code, status, price } = data;
  return (
    <MainContainer mt='60px'>
      <StyledBox w='990px' m='1% 0 0 22%'>
        <Item>
          <img src={p2} alt='x' width='100%' />
        </Item>
        <ProductInfo>
          <Name>{name}</Name>
          <Detail>{detail}</Detail>
          <RenderTextList name='Brand' value={brand} />
          <RenderTextList name='Product Code' value={code} />
          <RenderTextList name='Status' value={status} />
          <Price>ETH &nbsp; {price} </Price>
          <ColorContainer>
            <StyledText>Color</StyledText>
            <ButtonColor color='#fba500' colorText='Orange' />
            <ButtonColor color='#ebebeb' colorText='White' />
            <ButtonColor color='#7b61ff' colorText='Violet' />
          </ColorContainer>
          <SizeContainer>
            <StyledText>Size</StyledText>
            <ButtonSize text='X' />
            <ButtonSize text='M' />
            <ButtonSize text='L' />
            <ButtonSize text='XL' />
            <ButtonSize text='XXL' />
          </SizeContainer>
          <ButtonOrder />
        </ProductInfo>
      </StyledBox>
    </MainContainer>
  );
};

const StyledBox = styled(Box)`
  width: 1000px;
  height: 500;
  display: flex;
`;

const StyledText = styled(Text)`
  font-size: 15px;
  font-weight: bold;
  font-color: #4f4f4f;
  margin-top: 7px;
`;
// const ProductContainer = styled.div`
//   width: 1000px;
//   height: 500px;
//   display: flex;
// `;

const ProductInfo = styled.div`
  top: 260px;
  margin-left: 50px;
  margin-top: 20px;
`;

const ColorContainer = styled.div`
  margin-top: 10px;
  width: 600px;
  height: 45px;
  display: flex;
  background-color: #e3eeff;
`;

const SizeContainer = styled.div`
  margin-top: 10px;
  width: 600px;
  height: 45px;
  display: flex;
  background-color: #e3eeff;
`;

export default DetailsPage;
