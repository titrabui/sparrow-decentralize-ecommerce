import React from 'react';
import { useAppSelector } from 'hooks';
import { ThemeProvider } from 'styled-components';
import { darkTheme, lightTheme } from 'styles/appTheme';
import GlobalStyles from 'styles/globalStyles';
import { selectTheme } from 'store/ducks/theme/slice';
import Header from './Header/Header';
import Footer from './Footer';

interface ILayoutProps {
  children: any;
}
const CommonLayout: React.FC<ILayoutProps> = (props: ILayoutProps) => {
  const theme = useAppSelector(selectTheme);
  const themeMode = theme === 'light' ? lightTheme : darkTheme;
  const { children } = props;
  return (
    <ThemeProvider theme={themeMode}>
      <GlobalStyles />
      <Header />
      {children}
      <Footer />
    </ThemeProvider>
  );
};

export default CommonLayout;
