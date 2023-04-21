import {configureStore} from '@reduxjs/toolkit'
import {themeReducer} from './themeTypeSlice'

export const store = configureStore({
  reducer: {
    themeType: themeReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
