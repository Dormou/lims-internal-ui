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

/**
 * Скачивает файл по URL через браузер
 */
const downloadByUrl = (url: string, fileName: string) => {
  fetch(url, { method: 'GET' })
    .then((response) => response.blob())
    .then((blob) => {
      const downloadUrl = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = downloadUrl
      link.download = fileName
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(downloadUrl)
    })
}

export const downloadRawFile = (applicationId: string, fileName: string) =>
  downloadByUrl(APPLICATIONS_ENDPOINTS.rawFile(applicationId), fileName)

export const downloadSignedFile = (applicationId: string, fileName: string) =>
  downloadByUrl(APPLICATIONS_ENDPOINTS.signedFile(applicationId), fileName)

export const downloadDocumentsArchive = (applicationId: string) =>
  downloadByUrl(
    APPLICATIONS_ENDPOINTS.documentsArchive(applicationId),
    `archive-${applicationId}.zip`
  )
