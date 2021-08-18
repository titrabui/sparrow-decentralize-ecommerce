import { Typography, TypographyProps } from 'antd';
import styled from 'styled-components';

/**
 * * Override Typography ant design components with theming and needed styles.
 */

const { Text: AntText, Paragraph: AntParagraph, Link: AntLink, Title: AntTitle } = Typography;

export type ModifiedTypographyProps = Partial<TypographyProps> & {
  mt?: string;
  ml?: string;
  mb?: string;
  mr?: string;
  m?: string;
  $color?: string;
  $size?: string;
  $textAlign?: string;
  $upperCase?: boolean;
  strong?: boolean; // Antd props for intellisense
  italic?: boolean; // Antd props for intellisense
  underline?: boolean; // Antd props for intellisense
  code?: boolean; // Antd props for intellisense
  mark?: boolean; // Antd props for intellisense
  ellipsis?: boolean; // Antd props for intellisense
  block?: boolean;
  type?: 'secondary' | 'success' | 'warning' | 'danger'; // Antd props for intellisense
};
const Text = styled(AntText)<ModifiedTypographyProps>`
  color: ${(p: any) => (p.$color ? p.$color : p.theme.text)};
  font-size: ${(p: any) => (p.$size ? p.$size : '14px')}; // Default size
  text-align: ${(p) => p.$textAlign || 'left'};
  display: ${(p: any) => (p.block ? 'block' : '')};
  text-transform: ${(p) => p.$upperCase && 'uppercase'};
  ${(p) => p.mt && `margin-top: ${p.mt}`};
  ${(p) => p.ml && `margin-left:${p.ml}`};
  ${(p) => p.mr && `margin-right:${p.mr}`};
  ${(p) => p.mb && `margin-bottom:${p.mb}`};
  ${(p) => p.m && `margin:${p.m}`};
`;

const Paragraph = styled(AntParagraph)<ModifiedTypographyProps>`
  color: ${(p: any) => (p.$color ? p.$color : p.theme.text)};
  font-size: ${(p: any) => (p.$size ? p.$size : '14px')}; // Default size
  text-align: ${(p) => p.$textAlign || 'left'};
`;

const Link = styled(AntLink)<ModifiedTypographyProps>`
  color: ${(p: any) => (p.$color ? p.$color : p.theme.text)} !important;
  font-size: ${(p: any) => (p.$size ? p.$size : '14px')}; // Default size
  text-align: ${(p) => p.$textAlign || 'left'};
`;

const Title = styled(AntTitle)<ModifiedTypographyProps>`
  color: ${(p: any) => (p.$color ? p.$color : p.theme.text)} !important;
  text-align: ${(p) => p.$textAlign || 'left'};
  ${(p) => p.$size && `font-size:${p.$size} !important`};
`;

export { Text, Paragraph, Link, Title };
