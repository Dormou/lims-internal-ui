export const APPLICATIONS_ENDPOINTS = {
  stats: '/v1/orders/stats',
  getAll: '/v1/orders/all',
  rawFile: (applicationId: string) => `/v1/orders/${applicationId}/raw-file`,
  signedFile: (applicationId: string) =>
    `/v1/orders/${applicationId}/signed-file`,
  documentsArchive: (applicationId: string) =>
    `/v1/orders/${applicationId}/documents-archive`,
  draft: (applicationId: string) => `/orders/${applicationId}/draft`,
}
