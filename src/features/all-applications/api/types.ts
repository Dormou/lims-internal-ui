/** Статистика по заявкам */
export interface StatsResponse {
  name: string
  title: string
  currentMonthValue: number
  lastMonthValue: number
  unit: string
}

/** Ответ — массив статистических данных */
export type StatsResponseData = StatsResponse[]

/** Документ заявки */
export interface ApplicationDocument {
  documentId: string
  applicationId: string
  fileName: string
  fileExtension: string
  fileSize: string
  createdAt: string
}

/** Заявка */
export interface Application {
  applicationId: string
  createdAt: string
  updatedAt: string
  applicant: string
  producer: string | null
  techContact: string | null
  equipmentType: string | null
  tests: string[]
  status: string
  document: ApplicationDocument | null
}

/** Ответ - массив на получение данных всех заявок */
export type GetAllApplicationsResponse = Application[]