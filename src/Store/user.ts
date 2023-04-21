import {PayloadAction, createSlice} from '@reduxjs/toolkit'

export interface UserState {
  accessToken: string
  bannerUrl: string
  email: string
  introduction: string
  nickName: string
  profileUrl: string
  userId: number
}

const initialState: UserState = {
  accessToken: '',
  bannerUrl: '',
  email: '',
  introduction: '',
  nickName: '',
  profileUrl: '',
  userId: 0,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      const {accessToken, bannerUrl, email, introduction, nickName, profileUrl, userId} = action.payload
      state.accessToken = accessToken
      state.bannerUrl = bannerUrl
      state.email = email
      state.introduction = introduction
      state.nickName = nickName
      state.profileUrl = profileUrl
      state.userId = userId
    },
  },
})

// Action creators are generated for each case reducer function
export const {setUser} = userSlice.actions

export const userReducer = userSlice.reducer
