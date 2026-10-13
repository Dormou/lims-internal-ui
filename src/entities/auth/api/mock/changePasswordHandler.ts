import { http, HttpHandler, HttpResponse } from 'msw'
import { AUTH_ENDPOINTS } from '../types/endpoints'
import { generateMockJwt } from './mockJwt'
import type { ChangePasswordRequest } from '../types/requests'
import type { AuthResponse } from '../types/responses'
import type { UserInfo } from '../../model/types/userInfo'

export const changePasswordHandler: HttpHandler = http.post<
  never,
  ChangePasswordRequest,
  AuthResponse
>(AUTH_ENDPOINTS.changePassword, async ({ request }) => {
  setTimeout(() => undefined, 1000)

  try {
    const data = await request.json()

    if (data.oldPassword !== 'test1234')
      return HttpResponse.json(undefined, { status: 401 })

    const date = new Date()
    date.setHours(date.getHours() + 24)

    const claims: UserInfo = {
      user_type: 'test',
      given_name: 'Иван',
      family_name: 'Иванов',
      patronymic: 'Иванович',
    }

    return HttpResponse.json<AuthResponse>({
      accessToken: generateMockJwt(claims),
      refreshToken: 'test-refresh-token',
      accessTokenExpiration: date.toISOString(),
    })
  } catch (error) {
    return HttpResponse.json(undefined, { status: 400 })
  }
})
