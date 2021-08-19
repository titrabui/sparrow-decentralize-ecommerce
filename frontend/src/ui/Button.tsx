import styled from 'styled-components';
import { Button as AntdButton, ButtonProps } from 'antd';

type ModifiedButtonProps = Partial<ButtonProps> & {
  $w?: string;
  $h?: string;
  $color?: string;
  $bgType?: 'success' | 'warning' | 'error' | 'accent' | 'action' | 'highlight' | 'primary';
  $fontWeight?: string;
  $borderColor?: string;
  $fontSize?: string;

  css?: string;
  childrenCss?: string;
};

const Button = styled(AntdButton)<ModifiedButtonProps>`
  width: ${(p) => p.$w && p.$w};
  height: ${(p) => p.$h && p.$h};

  background-color: ${(p) => p.$bgType && p.theme[p.$bgType]};
  font-weight: ${(p) => p.$fontWeight && p.$fontWeight};
  color: ${(p) => p.$color && p.$color};
  border-color: ${(p) => (p.$borderColor && p.$borderColor) || (p.$bgType && p.theme[p.$bgType])};
  font-size: ${(p) => p.$fontSize && p.$fontSize};

  &:hover,
  &:active,
  &:focus,
  &:visited {
    background-color: black !important;
    color: white !important;
    border-color: black !important;
  }

  &.ant-btn[disabled],
  &.ant-btn[disabled]:hover,
  &.ant-btn[disabled]:focus,
  &.ant-btn[disabled]:active {
    background: ${(p) => p.theme.disabled};
    color: ${(p) => p.theme.textDisabled};
  }

  ${(p) => p.css && p.css};
  > * {
    ${(p) => p.childrenCss && p.childrenCss}
    font-weight: ${(p) => p.$fontWeight && p.$fontWeight};
  }
`;

export default Button;
