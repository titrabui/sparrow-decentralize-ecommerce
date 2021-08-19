import React from 'react';
import styled from 'styled-components';
import Box from 'ui/Box';
import banner from 'assets/images/Banner.png';

const Banner: React.FC = () => (
  <Container w='1200px' h='400px'>
    <img src={banner} alt='x' width='100%' />
  </Container>
);

const Container = styled(Box)`
  background: linear-gradient(69.58deg, #4328b1 20.03%, #ed3cc5 95.68%);
  border-radius: 50px;
  position: relative;
`;
export default Banner;
