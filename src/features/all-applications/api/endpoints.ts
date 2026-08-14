export const APPLICATIONS_ENDPOINTS = {
  stats: '/applications/stats',
  getAll: '/applications/all',
  rawFile: (applicationId: string) =>
    `/applications/${applicationId}/raw-file`,
  signedFile: (applicationId: string) =>
    `/applications/${applicationId}/signed-file`,
  documentsArchive: (applicationId: string) =>
    `/applications/${applicationId}/documents-archive`,
}
