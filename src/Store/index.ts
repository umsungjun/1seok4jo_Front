import {configureStore} from '@reduxjs/toolkit'
import {themeReducer} from './themeTypeSlice'
import {userReducer} from './user'

export const store = configureStore({
  reducer: {
    user: userReducer,
    themeType: themeReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
