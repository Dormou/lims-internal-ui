import { rootApi } from '@/shared/api'
import { APPLICATIONS_ENDPOINTS } from './endpoints'
import type { GetAllApplicationsResponse, StatsResponseData } from './types'

const applicationsApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    getApplicationsStats: builder.query<StatsResponseData, void>({
      query: () => APPLICATIONS_ENDPOINTS.stats,
    }),
    getAllApplications: builder.query<GetAllApplicationsResponse, void>({
      query: () => APPLICATIONS_ENDPOINTS.getAll,
    }),
  }),
})

export const { useGetApplicationsStatsQuery, useGetAllApplicationsQuery } =
  applicationsApi
