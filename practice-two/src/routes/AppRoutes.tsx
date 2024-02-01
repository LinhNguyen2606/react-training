import {
  Routes,
  Route,
  useLocation
} from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';

// Component
import { ErrorFallback } from '@components';

// Constant
import { PATH } from '@constants';

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
        <Route path={PATH.HOME_PATH} element={<HomePage />} />
        <Route path={PATH.ROLES_PATH} element={<RolePage />} />
        <Route path={PATH.RULES_PATH} element={<RulePage />} />
        <Route path={PATH.ERROR_PATH} element={<ErrorPage />} />
      </Routes>
    </ErrorBoundary>
  );
};

export default AppRoutes;
