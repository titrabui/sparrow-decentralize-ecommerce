import React from "react";
import styled from "styled-components";
import { Link, Text } from "ui/Typography";

const TextShipping: React.FC = () => (
  <Container>
    <StyleText>
      <ul>
        <li>
          There will be 20% deposit charge off the total amount of the parcel for Fragile and Big
          parcel type. These deposit will be included in the monthly invoice if there is any refund
          request due to Shipping Damage. Please read{' '}
          <Link $color='blue' href='shipping'>
            Delivery Policy
          </Link>{' '}
          and contact us if you have any question.
        </li>
      </ul>
    </StyleText>
  </Container>
);

const Container = styled.div`
  width: 100%;
  height: 100px;
`;

const StyleText = styled(Text)`
  margin-left: 20px;
  font-weight: bold;
`;

export default TextShipping