import { http, HttpHandler, HttpResponse } from 'msw'
import { APPLICATIONS_ENDPOINTS } from '../endpoints'
import type { StatsResponseData } from '../types'
import { mockStats } from '../../model/mockData'

export const getApplicationsStatsHandler: HttpHandler = http.get<
  never,
  never,
  StatsResponseData
>(APPLICATIONS_ENDPOINTS.stats, async () => {
  setTimeout(() => undefined, 1000)

  return HttpResponse.json<StatsResponseData>(mockStats)
})
