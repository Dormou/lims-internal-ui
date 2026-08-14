export const APPLICATIONS_ENDPOINTS = {
  stats: '/applications/stats',
  getAll: '/applications/all',
  rawFile: (applicationId: string) =>
    `/api/applications/${applicationId}/raw-file`,
  signedFile: (applicationId: string) =>
    `/api/applications/${applicationId}/signed-file`,
  documentsArchive: (applicationId: string) =>
    `/api/applications/${applicationId}/documents-archive`,
  draft: (applicationId: string) => `/applications/${applicationId}/draft`,
}
