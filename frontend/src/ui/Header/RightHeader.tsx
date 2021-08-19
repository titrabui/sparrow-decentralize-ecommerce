import React from 'react';

import styled from 'styled-components';
import logo from 'assets/images/Logo.svg';

interface RightHeaderProps {}

const RightHeader: React.FC<RightHeaderProps> = () => (
  <RightContainer>
    <div>
      <img src={logo} alt='logo' width='120px' height='100px' />
    </div>
  </RightContainer>
);

export default RightHeader;

const RightContainer = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  justify-content: flex-start;
`;
