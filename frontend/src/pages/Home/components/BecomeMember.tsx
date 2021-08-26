import React from 'react';
import Button from 'ui/Button';
import styled from 'styled-components';

const BecomeMember = () => (
  <div>
    <StyledButton $bgType='accent'>Become a member</StyledButton>
  </div>
);

const StyledButton = styled(Button)`
  position: absolute;
  top: 230px;
  left: 100px;
`;

export default BecomeMember;
