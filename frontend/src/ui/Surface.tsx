import styled from 'styled-components';

export interface SurfaceProps {
  bordered?: boolean;
  w?: string;
  h?: string;
  css?: string;
  childrenCss?: string;
}

const Surface = styled.div<SurfaceProps>`
  background: ${({ theme }) => theme.surface};
  border: ${(p) => (p.bordered ? `1px solid ${p.theme.border}` : 'none')};
  width: ${(p) => (p.w ? p.w : 'auto')};
  height: ${(p) => (p.h ? p.h : 'auto')};
  ${(p) => p.css && p.css};

  > * {
    ${(p) => p.childrenCss && p.childrenCss};
  }
`;

Surface.defaultProps = {
  bordered: false
};

export default Surface;
