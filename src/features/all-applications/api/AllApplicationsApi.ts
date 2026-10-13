import { rootApi } from '@/shared/api'
import { APPLICATIONS_ENDPOINTS } from './endpoints'
import type {
  AddLabDocumentRequest,
  ApplicationDocument,
  ApplicationDraftResponse,
  DeleteLabDocumentRequest,
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
      providesTags: ['Applications'],
    }),
    getApplicationDraft: builder.query<ApplicationDraftResponse, string>({
      query: (applicationId) => APPLICATIONS_ENDPOINTS.draft(applicationId),
    }),
    addLabDocument: builder.mutation<
      ApplicationDocument,
      AddLabDocumentRequest
    >({
      query: (data) => {
        const formData = new FormData()
        formData.append('file', data.documentFile)

        return {
          url: APPLICATIONS_ENDPOINTS.addLabDocument(data.orderId),
          method: 'POST',
          body: formData,
        }
      },
      invalidatesTags: ['Applications'],
    }),
    deleteLabDocument: builder.mutation<void, DeleteLabDocumentRequest>({
      query: (data) => {
        return {
          url: APPLICATIONS_ENDPOINTS.deleteLabDocument(
            data.orderId,
            data.documentId
          ),
          method: 'DELETE',
        }
      },
      invalidatesTags: ['Applications'],
    }),
  }),
})

export const {
  useGetApplicationsStatsQuery,
  useGetAllApplicationsQuery,
  useLazyGetApplicationDraftQuery,
  useAddLabDocumentMutation,
  useDeleteLabDocumentMutation,
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

export const downloadAnyFile = (
  orderId: string,
  documentId: string,
  fileName: string
) =>
  downloadByUrl(APPLICATIONS_ENDPOINTS.documents(orderId, documentId), fileName)

/** Скачать архив документов */
export const downloadDocumentsArchive = (orderId: string) =>
  downloadByUrl(
    APPLICATIONS_ENDPOINTS.documentsArchive(orderId),
    `archive-${orderId}.zip`
  )

/** Открыть PDF для просмотра */
export const previewAnyFile = (orderId: string, documentId: string) =>
  previewByUrl(APPLICATIONS_ENDPOINTS.documents(orderId, documentId))

/** Открыть сформированную заявку для просмотра */
export const previewRawFile = (orderId: string, documentId: string) => {
  window.open(
    APPLICATIONS_ENDPOINTS.documents(orderId, documentId),
    '_blank',
    'noopener,noreferrer'
  )
}
