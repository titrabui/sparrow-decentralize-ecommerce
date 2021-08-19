import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks';
import { selectTheme, setTheme } from 'store/ducks/theme/slice';

const useDarkMode = () => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector(selectTheme);

  const setMode = (mode: 'light' | 'dark'): void => {
    window.localStorage.setItem('theme', mode);
    dispatch(setTheme(mode));
  };

  const toggleTheme = (): void => {
    if (theme === 'light') {
      setMode('dark');
    } else {
      setMode('light');
    }
  };

  useEffect(() => {
    const localTheme: any = localStorage.getItem('theme');
    setMode(localTheme || 'light');

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [theme, toggleTheme] as const;
};

export default useDarkMode;
