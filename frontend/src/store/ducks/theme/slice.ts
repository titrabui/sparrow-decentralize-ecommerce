import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'store';

export interface ITheme {
  mode: 'light' | 'dark';
}

const initialState = { mode: 'light' } as ITheme;

const themeSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setTheme(state, action: PayloadAction<'light' | 'dark'>) {
      return {
        ...state,
        mode: action.payload
      };
    }
  }
});

export const selectTheme = (state: RootState): 'light' | 'dark' => state.theme.mode;
export const { setTheme } = themeSlice.actions;

export default themeSlice.reducer;
