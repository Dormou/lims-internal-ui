import { http, HttpHandler, HttpResponse } from 'msw'
import { APPLICATIONS_ENDPOINTS } from '../endpoints'
import type { GetAllApplicationsResponse } from '../types'
import { mockApplications } from '../../model/mockData'

export const getAllApplicationsHandler: HttpHandler = http.get<
  never,
  never,
  GetAllApplicationsResponse
>(APPLICATIONS_ENDPOINTS.getAll, async () => {
  setTimeout(() => undefined, 1000)

  return HttpResponse.json<GetAllApplicationsResponse>(mockApplications)
})
