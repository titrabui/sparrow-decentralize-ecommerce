import React from 'react';
import styled from 'styled-components';

interface MainContainerProps {
  mt?: string;
}

const StyledDiv = styled.div<MainContainerProps>`
  margin-top: ${(p) => p.mt || '0px'};
  width: 100%;
  max-width: 100%;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  min-height: 80vh;
  @media screen and (max-width: 1208px) {
    padding-left: 16px;
    padding-right: 16px;
  }
  @media screen and (min-width: 1024px) and (max-width: 1208px) {
    width: 100%;
  }
  @media screen and (max-width: 768px) {
    max-height: unset;
    min-height: unset;
    height: auto;
  }
`;

const MainContainer: React.FC<MainContainerProps> = (props) => {
  const { children } = props;
  return <StyledDiv {...props}>{children}</StyledDiv>;
};

export default MainContainer;
