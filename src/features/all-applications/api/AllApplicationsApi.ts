import { rootApi } from '@/shared/api'
import { APPLICATIONS_ENDPOINTS } from './endpoints'
import type {
  ApplicationDraftResponse,
  GetAllApplicationsResponse,
  StatsResponseData,
} from './types'

const applicationsApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    getApplicationsStats: builder.query<StatsResponseData, void>({
      query: () => APPLICATIONS_ENDPOINTS.stats,
    }),
    getAllApplications: builder.query<GetAllApplicationsResponse, void>({
      query: () => APPLICATIONS_ENDPOINTS.getAll,
    }),
    getApplicationDraft: builder.query<ApplicationDraftResponse, string>({
      query: (applicationId) => APPLICATIONS_ENDPOINTS.draft(applicationId),
    }),
  }),
})

export const {
  useGetApplicationsStatsQuery,
  useGetAllApplicationsQuery,
  useLazyGetApplicationDraftQuery,
} = applicationsApi

/**
 * Скачивает файл через blob
 */
const downloadByUrl = async (url: string, fileName: string) => {
  const response = await fetch(url, { method: 'GET' })
  const blob = await response.blob()

  const downloadUrl = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = downloadUrl
  link.download = fileName
  document.body.appendChild(link)
  link.click()

  setTimeout(() => {
    document.body.removeChild(link)
    URL.revokeObjectURL(downloadUrl)
  }, 100)
}

/**
 * Открывает файл в новой вкладке для просмотра
 */
const previewByUrl = async (url: string) => {
  const response = await fetch(url, { method: 'GET' })
  const blob = await response.blob()

  const previewUrl = URL.createObjectURL(blob)
  window.open(previewUrl, '_blank', 'noopener,noreferrer')

  setTimeout(() => URL.revokeObjectURL(previewUrl), 1000)
}

/** Скачать сформированную заявку */
export const downloadRawFile = (applicationId: string, fileName: string) =>
  downloadByUrl(APPLICATIONS_ENDPOINTS.rawFile(applicationId), fileName)

/** Скачать подписанную заявку */
export const downloadSignedFile = (applicationId: string, fileName: string) =>
  downloadByUrl(APPLICATIONS_ENDPOINTS.signedFile(applicationId), fileName)

/** Скачать архив документов */
export const downloadDocumentsArchive = (applicationId: string) =>
  downloadByUrl(
    APPLICATIONS_ENDPOINTS.documentsArchive(applicationId),
    `archive-${applicationId}.zip`
  )

/** Открыть подписанный PDF для просмотра */
export const previewSignedFile = (applicationId: string) =>
  previewByUrl(APPLICATIONS_ENDPOINTS.signedFile(applicationId))

/** Открыть сформированную заявку для просмотра */
export const previewRawFile = (applicationId: string) => {
  window.open(
    APPLICATIONS_ENDPOINTS.rawFile(applicationId),
    '_blank',
    'noopener,noreferrer'
  )
}