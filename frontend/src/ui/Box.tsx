import React from 'react';
import styled from 'styled-components';

/**
 * @param : css - Apply what ever css to current components
 * @param : childrenCss - Apply what ever css to all children style
 * ? Want to use theme in css or childrenCss props - Please use ThemeContext exported from styled-components
 * References: https://styled-components.com/docs/advanced#theming
 */

export interface BoxProps {
  w?: string;
  h?: string;
  flex?: boolean;
  direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
  justify?:
    | 'center'
    | 'flex-start'
    | 'flex-end'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
  alignItems?: 'center' | 'flex-start' | 'flex-end' | 'baseline' | 'stretch';
  bordered?: boolean;
  bgColor?: string;
  mt?: string;
  ml?: string;
  mb?: string;
  mr?: string;
  m?: string;
  pt?: string;
  pl?: string;
  pb?: string;
  pr?: string;
  p?: string;
  css?: string;
  childrenCss?: string;
}

const StyledBox = styled.div<BoxProps>`
  min-width: 0;
  display: ${(p) => (p.flex ? 'flex' : 'block')};

  ${(p) => p.flex && `flex-direction: ${p.direction || 'row'}`};
  ${(p) => p.flex && `justify-content: ${p.justify || 'center'}`};
  ${(p) => p.flex && `align-items: ${p.justify || 'center'}`};
  ${(p) => p.bordered && `border: 1px solid ${p.theme.border}`};
  ${(p) => p.bgColor && `background: ${p.bgColor}`};

  width: ${(p) => p.w || 'auto'};
  height: ${(p) => p.h || 'auto'};

  ${(p) => p.mt && `margin-top: ${p.mt}`};
  ${(p) => p.ml && `margin-left:${p.ml}`};
  ${(p) => p.mr && `margin-right:${p.mr}`};
  ${(p) => p.mb && `margin-bottom:${p.mb}`};
  ${(p) => p.m && `margin:${p.m}`};

  ${(p) => p.pt && `padding-top: ${p.pt}`};
  ${(p) => p.pl && `padding-left:${p.pl}`};
  ${(p) => p.pr && `padding-right:${p.pr}`};
  ${(p) => p.pb && `padding-bottom:${p.pb}`};
  ${(p) => p.p && `padding:${p.p}`};

  ${(p) => p.css && p.css};

  > * {
    ${(p) => p.childrenCss && p.childrenCss};
  }
`;

const Box: React.FC<BoxProps> = (props) => {
  const { children } = props;
  return <StyledBox {...props}>{children}</StyledBox>;
};

export default Box;
