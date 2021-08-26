/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Box from 'ui/Box';
import MainContainer from 'ui/MainContainer';
import { Text } from 'ui/Typography';
import spaces from 'utils/spaces';
import ButtonColor from './ButtonColor';
import ButtonOrder from './ButtonOrder';
import ButtonSize from './ButtonSize';
import { Detail, Item, Name, Price, RenderTextList } from './Info';

const DetailsPage: React.FC = () => {
  const param: any = useParams();
  const container: any = spaces.find((co: any) => co.id.toString() === param.id);

  const [data, setData] = useState({
    color: '',
    size: '',
    amount: 0
  });

  const handleSelectColor = (color: string) => {
    setData({ ...data, color });
  };

  const handleSelectSize = (size: string) => {
    setData({ ...data, size });
  };

  const handleChangeAmount = (amount: number) => {
    setData({ ...data, amount });
  };
  return (
    <MainContainer mt='60px'>
      <PageName>Product Detail</PageName>
      <StyledBox w='990px' m='1% 0 0 22%'>
        <Item>
          <img src={container.img} alt='x' width='80%' />
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
            <ButtonColor
              color='#e86c13'
              colorText='Orange'
              onClick={() => handleSelectColor('Orange')}
              active={data.color === 'Orange'}
            />
            <ButtonColor
              color='#ebebeb'
              colorText='White'
              onClick={() => handleSelectColor('White')}
              active={data.color === 'White'}
            />
            <ButtonColor
              color='#7b61ff'
              colorText='Violet'
              onClick={() => handleSelectColor('Violet')}
              active={data.color === 'Violet'}
            />
          </ColorContainer>
          <SizeContainer>
            <StyledText>Size</StyledText>
            <ButtonSize
              text='10ft'
              onClick={() => handleSelectSize('10')}
              active={data.size === '10'}
            />
            <ButtonSize
              text='15ft'
              onClick={() => handleSelectSize('15')}
              active={data.size === '15'}
            />
            <ButtonSize
              text='20ft'
              onClick={() => handleSelectSize('20')}
              active={data.size === '20'}
            />
            <ButtonSize
              text='25ft'
              onClick={() => handleSelectSize('25')}
              active={data.size === '25'}
            />
            <ButtonSize
              text='30ft'
              onClick={() => handleSelectSize('30')}
              active={data.size === '30'}
            />
          </SizeContainer>
          <ButtonOrder handleChangeAmount={handleChangeAmount} container={container} data={data} />
        </ProductInfo>
      </StyledBox>
    </MainContainer>
  );
};

const PageName = styled(Text)`
  font-size: 24px;
  color: black;
  display: block;
  font-weight: bold;
  width: 1200px;
  margin: 20px auto 40px;
`;

const StyledBox = styled(Box)`
  width: 1000px;
  height: 500;
  display: flex;
`;

const StyledText = styled(Text)`
  font-size: 15px;
  font-weight: bold;
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
