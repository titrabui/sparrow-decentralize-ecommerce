import React from 'react';
import styled from 'styled-components';
import { Text } from 'ui/Typography';

export const RenderTextList = (props: any) => {
  const { name, value } = props;
  return (
    <TextList>
      <Text strong $color='#4f4f4f' $size='15px'>
        {name}:
      </Text>
      <Text $color='#4f4f4f' $size='15px'>
        {value}
      </Text>
    </TextList>
  );
};

const TextList = styled.div`
  span + span {
    margin-left: 15px;
  }
`;

export const Name = styled(Text)`
  color: #341f62;
  font-size: 20px;
  display: block;
  font-weight: bold;
`;

export const Detail = styled(Text)`
  color: #4f4f4f80;
  font-size: 15px;
  display: block;
`;

export const Price = styled(Text)`
  color: #7b61ff;
  font-size: 20px;
  font-weight: bold;
  display: block;
  margin-top: 15px;
`;

export const Item = styled.div`
  width: 300px;
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
    top: 30px;
  }
`;