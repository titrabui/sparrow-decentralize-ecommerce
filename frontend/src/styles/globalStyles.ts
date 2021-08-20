import { createGlobalStyle } from 'styled-components';
import background from 'assets/images/background.png';
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
    color: ${({ theme }) => theme.text};
    background-image: url(${background});
    position:relative;
    background-size: cover;
    background-position: center;
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

  .ant-checkbox-inner {
    width: 24px;
    height: 24px;
    border-radius: 8px;
  }

  .ant-checkbox-inner::after {
    width: 10.5px;
    height: 12.5px;
    margin-left: 2px;
  }

`;

export default GlobalStyles;
