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
  orderId: string
  fileName: string
  fileExtension: string
  fileSize: string
  createdAt: string
}

export interface TestItem {
  name: string
  parameterValues: unknown[]
  testValues: unknown[]
}

/** Заявка */
export interface Application {
  orderId: string
  createdAt: string
  updatedAt: string
  applicant: string
  producer: string | null
  techContact: string | null
  equipmentType: string | null
  tests: TestItem[]
  status: string
  rawDocument: ApplicationDocument | null
  signedDocument: ApplicationDocument | null
  laboratoryDocuments: [
    {
      comment: string
      document: ApplicationDocument
    },
  ]
}

/** Ответ - массив на получение данных всех заявок */
export type GetAllApplicationsResponse = Application[]

/** Черновик заявки */
export interface ApplicationDraft {
  branchId: string | null
  equipmentTypeId: string | null
  producerName: string | null
  producerAddress: string | null
  techDocumentName: string | null
  samples: Array<
    string | { name: string; parameterValues: unknown[]; testValues: unknown[] }
  >
}

/** Полный черновик заявки */
export interface ApplicationDraftResponse {
  id: string
  status: string
  updatedAt: string
  draft: ApplicationDraft | null
  regulatoryDocument: ApplicationDocument | null
  additionalDocuments: ApplicationDocument[]
}

export type AddLabDocumentRequest = {
  documentFile: File
  orderId: string
}

export type DeleteLabDocumentRequest = {
  orderId: string
  documentId: string
}
