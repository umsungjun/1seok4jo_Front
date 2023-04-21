import {createSlice} from '@reduxjs/toolkit'

export interface ThemeState {
  theme: string
}

const initialState: ThemeState = {
  theme: 'light',
}

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    changeThemeType: state => {
      state.theme === 'light' ? (state.theme = 'dark') : (state.theme = 'light')
    },
  },
})

// Action creators are generated for each case reducer function
export const {changeThemeType} = themeSlice.actions

export const themeReducer = themeSlice.reducer
