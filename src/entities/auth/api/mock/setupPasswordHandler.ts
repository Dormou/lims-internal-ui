import { http, HttpHandler, HttpResponse } from 'msw'
import { AUTH_ENDPOINTS } from '../types/endpoints'
import { generateMockJwt } from './mockJwt'
import type { SetupPasswordRequest } from '../types/requests'
import type { AuthResponse } from '../types/responses'
import type { UserInfo } from '../../model/types/userInfo'

export const setupPasswordHandler: HttpHandler = http.post<
  never,
  SetupPasswordRequest,
  AuthResponse
>(AUTH_ENDPOINTS.setupPassword, async ({ request }) => {
  setTimeout(() => undefined, 1000)

  try {
    const data = await request.json()

    if (!data.password || !data.token)
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
