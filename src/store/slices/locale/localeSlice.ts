import {createSlice, PayloadAction} from '@reduxjs/toolkit';

type LocaleStateType = {
  language: string;
};

const initialState: LocaleStateType = {
  language: 'en',
};

export const localeSlice = createSlice({
  name: 'locale',
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
    },
  },
});

export const {setLanguage} = localeSlice.actions;
export default localeSlice.reducer;
