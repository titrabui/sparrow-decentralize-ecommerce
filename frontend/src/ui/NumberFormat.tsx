import styled from 'styled-components';
import NumberFormat, { NumberFormatProps } from 'react-number-format';

type ModifiedInputProps = Partial<NumberFormatProps> & {
  css?: string;
};

const InputNumber = styled(NumberFormat)<ModifiedInputProps>`
  background-color: ${({ theme }) => theme.surface};
  color: ${({ theme }) => theme.text};

  ${(p) => p.css && p.css}
`;

export default InputNumber;
