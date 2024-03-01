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

// Pages
import {
  Home,
  Error,
  Role,
  Rule,
  Layout
} from '@pages';

const AppRoutes = () => {
  const location = useLocation();

  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      resetKeys={[location.pathname]}
    >
      <Routes>
        <Route path={PATH.HOME_PATH} element={<Layout />}>
          <Route index element={<Home position="left" />} />
          <Route path={PATH.ROLES_PATH} element={<Role position="left"/>} />
          <Route path={PATH.RULES_PATH} element={<Rule />} />
        </Route>
        <Route path={PATH.ERROR_PATH} element={<Error />} />
      </Routes>
    </ErrorBoundary>
  );
};

export default AppRoutes;
