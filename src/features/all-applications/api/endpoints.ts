export const APPLICATIONS_ENDPOINTS = {
  stats: '/v1/orders/stats',
  getAll: '/v1/orders/all',
  documents: (orderId: string, documentId: string) =>
    `/v1/orders/${orderId}/documents-from-client/${documentId}/for-registry`,
  documentsArchive: (orderId: string) =>
    `/v1/orders/${orderId}/documents-from-client`,
  draft: (applicationId: string) => `/v1/orders/${applicationId}/draft`,
  addLabDocument: (orderId: string) =>
    `/v1/orders/${orderId}/documents-from-lab`,
  deleteLabDocument: (orderId: string, documentId: string) =>
    `/v1/orders/${orderId}/documents-from-lab/${documentId}`,
}
