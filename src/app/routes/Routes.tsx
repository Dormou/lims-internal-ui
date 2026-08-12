import { BrowserRouter, Route, Routes as ReactRoutes } from 'react-router-dom'
import { RoutesPath } from '@/shared/config'
import { AllApplicationsPage } from '@/pages'

export const Routes = () => {
  return (
    <BrowserRouter>
      <ReactRoutes>
          <Route path={RoutesPath.AllApplications} element={<AllApplicationsPage />} />
      </ReactRoutes>
    </BrowserRouter>
  )
}