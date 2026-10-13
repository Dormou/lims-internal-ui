import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { jwtDecode } from 'jwt-decode'
import type { UserInfo } from './types/userInfo'

const loadUser = (): UserInfo | null => {
  try {
    const storageUser = localStorage.getItem('user_info')
    return storageUser ? JSON.parse(storageUser) : null
  } catch {
    return null
  }
}

interface AuthSliceState {
  accessToken: string | null
  refreshToken: string | null
  userInfo: UserInfo | null
}

const initialState: AuthSliceState = {
  accessToken: localStorage.getItem('access_token') ?? null,
  refreshToken: localStorage.getItem('refresh_token') ?? null,
  userInfo: loadUser(),
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{
        accessToken: string
        refreshToken: string
      }>
    ) => {
      try {
        const claims = jwtDecode<UserInfo>(action.payload.accessToken)

        localStorage.setItem('access_token', action.payload.accessToken)
        localStorage.setItem('refresh_token', action.payload.refreshToken)
        localStorage.setItem('user_info', JSON.stringify(claims))

        state.accessToken = action.payload.accessToken
        state.refreshToken = action.payload.refreshToken
        state.userInfo = claims
      } catch (error) {
        console.error('Не удалось декодировать jwt токен', error)
      }
    },
    logout: (state) => {
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
      localStorage.removeItem('user_info')

      state.accessToken = null
      state.refreshToken = null
      state.userInfo = null
    },
    setAuth: (
      state,
      action: PayloadAction<{ accessToken: string; refreshToken: string }>
    ) => {
      try {
        const claims = jwtDecode<UserInfo>(action.payload.accessToken)

        localStorage.setItem('access_token', action.payload.accessToken)
        localStorage.setItem('refresh_token', action.payload.refreshToken)
        localStorage.setItem('user_info', JSON.stringify(claims))

        state.accessToken = action.payload.accessToken
        state.refreshToken = action.payload.refreshToken
        state.userInfo = claims
      } catch (error) {
        console.error('Не удалось декодировать jwt токен', error)
      }
    },
    setFullName: (state, action: PayloadAction<UserInfo>) => {
      if (state.userInfo) {
        state.userInfo = action.payload
        localStorage.setItem('user_info', JSON.stringify(action.payload))
      }
    },
  },
})

export const { login, logout, setAuth, setFullName } = authSlice.actions
