export const RoutesPath = {
  AllApplications: '/',
  Login: '/login',
  Profile: '/profile',
  SetupPassword: '/setup-password',
  DownloadDocuments: '/download-documents',
} as const

export type Routes = (typeof RoutesPath)[keyof typeof RoutesPath]
