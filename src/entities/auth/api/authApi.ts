import { rootApi } from '@/shared/api'
import { login, logout } from '../model/authSlice'
import { AUTH_ENDPOINTS } from './types/endpoints'
import type {
  LoginRequest,
  RecoverPasswordRequest,
  ChangePasswordRequest,
  SetupPasswordRequest,
} from './types/requests'
import type { AuthResponse } from './types/responses'

const extendedApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, LoginRequest>({
      query: (data) => ({
        url: AUTH_ENDPOINTS.login,
        method: 'POST',
        body: data,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(login(data))
        } catch {}
      },
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: AUTH_ENDPOINTS.logout,
        method: 'POST',
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled
        } catch {
        } finally {
          dispatch(logout())
        }
      },
    }),
    recoverPassword: builder.mutation<void, RecoverPasswordRequest>({
      query: (data) => ({
        url: AUTH_ENDPOINTS.recoverPassword,
        method: 'POST',
        body: data,
      }),
    }),
    changePassword: builder.mutation<AuthResponse, ChangePasswordRequest>({
      query: (data) => ({
        url: AUTH_ENDPOINTS.changePassword,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Profile'],
    }),
    setupPassword: builder.mutation<AuthResponse, SetupPasswordRequest>({
      query: (data) => ({
        url: AUTH_ENDPOINTS.setupPassword,
        method: 'POST',
        body: data,
      }),
    }),
  }),
})

export const {
  useLoginMutation,
  useLogoutMutation,
  useRecoverPasswordMutation,
  useChangePasswordMutation,
  useSetupPasswordMutation,
} = extendedApi
