import { Routes, Route } from 'react-router-dom';

import { useLocation } from 'react-router-dom';

import { ErrorBoundary } from 'react-error-boundary';

// Component
import { ErrorFallback } from '@components';

// Constant
import { path } from '@constants';

// Layouts
import {
  ErrorPage,
  HomePage,
  RolePage,
  RulePage
} from '@layouts';

const AppRoutes = () => {
  const location = useLocation();

  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      resetKeys={[location.pathname]}
    >
      <Routes>
        <Route path={path.HOME_PATH} element={<HomePage />} />
        <Route path={path.ROLES_PATH} element={<RolePage />} />
        <Route path={path.RULES_PATH} element={<RulePage />} />
        <Route path={path.ERROR_PATH} element={<ErrorPage />} />
      </Routes>
    </ErrorBoundary>
  );
};

export default AppRoutes;
