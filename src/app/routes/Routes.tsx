import {
  BrowserRouter,
  Route,
  Routes as ReactRoutes,
  Navigate,
} from 'react-router-dom'
import { RoutesPath } from '@/shared/config'
import { AllApplicationsPage, LoginPage, ProfilePage } from '@/pages'
import { useSelector } from 'react-redux'
import { MainLayout, OuterLayout } from '@/widgets'

export const Routes = () => {
  const token = useSelector((state) => state.auth.accessToken)

  return (
    <BrowserRouter>
      <ReactRoutes>
        {!token ? (
          <Route element={<OuterLayout />}>
            <Route path={RoutesPath.Login} element={<LoginPage />} />
            <Route
              path="*"
              element={<Navigate to={RoutesPath.Login} replace />}
            />
          </Route>
        ) : (
          <Route element={<MainLayout />}>
            <Route path="/" element={<AllApplicationsPage />} />
            <Route path={RoutesPath.Profile} element={<ProfilePage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        )}
      </ReactRoutes>
    </BrowserRouter>
  )
}
