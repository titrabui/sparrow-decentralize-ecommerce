import { createGlobalStyle } from 'styled-components';
import { ThemeTypes } from './appTheme';

const GlobalStyles = createGlobalStyle<{ theme: ThemeTypes }>`
  *,
  *::after,
  *::before {
    box-sizing: border-box;
  }

  html,body {
    margin: 0;
    font-family: 'Quicksand', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
    position:relative;
  }

  code {
    font-family: 'Quicksand', monospace;
  }

  /* Custome Ant design components */
  .ant-btn-primary,
  .ant-btn-primary:hover,
  .ant-btn-primary:focus,
  .ant-btn-primary:active {
    color: white;
    background-color: ${(p) => p.theme.primary};
  }

  .ant-select-disabled.ant-select:not(.ant-select-customize-input) .ant-select-selector {
    color:#000000A6;
  }

  .ant-slider-track, .ant-slider:hover .ant-slider-track {
    background-color: ${(p) => p.theme.primary};
  }

  .ant-slider-handle ,.ant-slider:hover .ant-slider-handle:not(.ant-tooltip-open){
    border-color: ${(p) => p.theme.primary};
  }
`;

export default GlobalStyles;
