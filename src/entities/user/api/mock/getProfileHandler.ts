import { http, HttpHandler, HttpResponse } from 'msw'
import { USER_ENDPOINTS } from '../types/endpoints'
import type { GetProfileResponse } from '../types/responses'

export const getProfileHandler: HttpHandler = http.get<
  never,
  never,
  GetProfileResponse
>(USER_ENDPOINTS.getProfile, async () => {
  setTimeout(() => undefined, 1000)

  return HttpResponse.json<GetProfileResponse>({
    profile: {
      id: '3fb4cd97-6fdd-42cd-a172-309d104fe00f',
      fullName: {
        firstName: 'Иван',
        lastName: 'Иванов',
        patronymic: 'Иванович',
      },
      registrationDate: new Date().toISOString(),
      email: 'admin@ntc-power.ru',
      phoneNumber: null,

      organization: {
        fullName: 'Организация Иванова',
        shortName: null,
        legalAddress: null,
        postalAddress: null,
        innKpp: '11111111/222222222',
        ogrn: null,
        email: null,
        phoneNumber: null,
      },

      headPerson: {
        firstName: 'Иван',
        lastName: 'Иванов',
        patronymic: 'Иванович',
        position: 'Админ',
        document: null,
      },

      techContacts: [],
      iAmTechContact: false,
    },
    passwordMetadata: {
      passwordSettingDate: new Date().toISOString(),
    },
  })
})
