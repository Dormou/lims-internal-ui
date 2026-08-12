import { rootApi } from '@/shared/api'
import { APPLICATIONS_ENDPOINTS } from './endpoints'
import type { StatsResponseData } from './types'

const applicationsApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    getApplicationsStats: builder.query<StatsResponseData, void>({
      query: () => APPLICATIONS_ENDPOINTS.stats,
    }),
  }),
})

export const { useGetApplicationsStatsQuery } = applicationsApi