import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Box from 'ui/Box';
import MainContainer from 'ui/MainContainer';
import spaces from 'ui/spaces';
import { Text } from 'ui/Typography';
import ButtonColor from './ButtonColor';
import ButtonOrder from './ButtonOrder';
import ButtonSize from './ButtonSize';
import { Detail, Item, Name, Price, RenderTextList } from './Info';

const DetailsPage: React.FC = () => {
  const param: any = useParams();

  const container: any = spaces.find((co: any) => co.id.toString() === param.id);
  return (
    <MainContainer mt='60px'>
      <StyledBox w='990px' m='1% 0 0 22%'>
        <Item>
          <img src={container.img} alt='x' width='100%' />
        </Item>
        <ProductInfo>
          <Name>{container.name}</Name>
          <Detail>{container.detail}</Detail>
          <RenderTextList name='Brand' value={container.brand} />
          <RenderTextList name='Product Code' value={container.code} />
          <RenderTextList name='Status' value={container.status} />
          <Price>ETH &nbsp; {container.price} </Price>
          <ColorContainer>
            <StyledText>Color</StyledText>
            <ButtonColor color='#e86c13' colorText='Orange' />
            <ButtonColor color='#ebebeb' colorText='White' />
            <ButtonColor color='#7b61ff' colorText='Violet' />
          </ColorContainer>
          <SizeContainer>
            <StyledText>Size</StyledText>
            <ButtonSize text='10ft' />
            <ButtonSize text='15ft' />
            <ButtonSize text='20ft' />
            <ButtonSize text='25ft' />
            <ButtonSize text='30ft' />
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
