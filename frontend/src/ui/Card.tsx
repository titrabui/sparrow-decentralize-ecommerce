import { Radio } from 'antd';
import React, { useState } from 'react';
import styled from 'styled-components';
import { Text } from './Typography';

export interface ContainerInfo {
  id?: number;
  code?: string;
  name?: string;
  detail?: string;
  brand?: string;
  status?: string;
  price?: string;
  img?: any;
}

const Card: React.FC<ContainerInfo> = (container: ContainerInfo) => {
  const [value, setValue] = useState(1);
  const { name, detail, price, img } = container;

  const onChange = (e: any) => {
    setValue(e.target.value);
  };
  
  return (
    <Container>
      <img src={img} alt='x' width='65%' />
      <TextContainer>
        <Name>{name}</Name>
        <Detail>{detail} </Detail>
        <Price>ETH &nbsp; {price} </Price>
      </TextContainer>
      <StyledRadio onChange={onChange} value={value}>
        <Radio value={1} className='purple' />
        <Radio value={2} className='gray' />
        <Radio value={3} className='orange' />
      </StyledRadio>
    </Container>
  );
};

const StyledRadio = styled(Radio.Group)`
  display: flex;
  flex-direction: column;
  position: absolute;
  align-items: center;
  justify-content: center;
  width: 30px;
  right: 15px;
  .ant-radio-wrapper {
    height: 27px;
  }
  .ant-radio-inner {
    width: 20px;
    height: 20px;
    border-color: white;
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.2);
  }
  .orange .ant-radio-inner {
    background-color: #e86c13;
  }
  .purple .ant-radio-inner {
    background-color: #7b61ff;
  }
  .gray .ant-radio-inner {
    background-color: #ebebeb;
  }
  .ant-radio-inner::after {
    display: none;
  }
  .ant-radio:hover .ant-radio-inner,
  .ant-radio-input:focus + .ant-radio-inner {
    border-color: white;
    width: 24px;
    height: 24px;
  }
`;

const TextContainer = styled.div`
  position: absolute;
  top: 260px;
`;

const Name = styled(Text)`
  color: #341f62;
  font-size: 18px;
  display: block;
  font-weight: bold;
`;

const Detail = styled(Text)`
  color: #4f4f4f80;
  font-size: 14px;
  display: block;
`;

const Price = styled(Text)`
  color: #7b61ff;
  font-size: 28px;
  font-weight: bold;
  display: block;
`;

const Container = styled.div`
  width: 290px;
  margin: 0 10px;
  height: 368px;
  background: radial-gradient(
    50% 50% at 50% 50%,
    rgba(255, 255, 255, 0.25) 0%,
    rgba(255, 255, 255, 0.5) 94.27%
  );
  backdrop-filter: blur(40px);
  backdrop-filter: blur(40px);
  border-radius: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 50px;
  position: relative;
  img {
    position: absolute;
    top: 50px;
  }
`;

export default Card;
