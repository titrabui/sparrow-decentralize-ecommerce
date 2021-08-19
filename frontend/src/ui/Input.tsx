import { Input as AntdInput, InputProps } from 'antd';
import styled from 'styled-components';

type ModifiedInputProps = Partial<InputProps> & {
  css?: string;
};

const Input = styled(AntdInput)<ModifiedInputProps>`
  background-color: ${({ theme }) => theme.surface};
  color: ${({ theme }) => theme.text};

  ${(p) => p.css && p.css}
`;

export default Input;
