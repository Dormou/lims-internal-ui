import { setupWorker } from 'msw/browser'
import {
  loginHandler,
  logoutHandler,
  recoverPasswordHandler,
  setupPasswordHandler,
  changePasswordHandler,
} from '@/entities/auth'
import {
  registerUserHandler,
  getProfileHandler,
  updateHeadHandler,
  updateOrganizationHandler,
  updateTechContactHandler,
  updateUserHandler,
} from '@/entities/user'
import { getAllApplicationsHandler } from '@/features/all-applications/api/mock/getAllApplications'
import { getApplicationsStatsHandler } from '@/features/all-applications/api/mock/getApplicationsStats'
import { getApplicationDraftHandler } from '@/features/all-applications/api/mock/getApplicationDraft'

export const worker = setupWorker(
  ...[
    loginHandler,
    logoutHandler,
    recoverPasswordHandler,
    registerUserHandler,
    setupPasswordHandler,
    changePasswordHandler,
    getProfileHandler,
    updateHeadHandler,
    updateOrganizationHandler,
    updateTechContactHandler,
    updateUserHandler,
    getAllApplicationsHandler,
    getApplicationsStatsHandler,
    getApplicationDraftHandler,
  ]
)
