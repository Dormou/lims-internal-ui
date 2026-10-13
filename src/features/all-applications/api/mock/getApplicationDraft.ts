import { http, HttpHandler, HttpResponse } from 'msw'
import { APPLICATIONS_ENDPOINTS } from '../endpoints'
import type { ApplicationDraftResponse } from '../types'

export const getApplicationDraftHandler: HttpHandler = http.get<
  never,
  string,
  ApplicationDraftResponse
>(APPLICATIONS_ENDPOINTS.draft(':id'), async ({ params }) => {
  setTimeout(() => undefined, 1000)

  const { id } = params

  return HttpResponse.json<ApplicationDraftResponse>()
})
