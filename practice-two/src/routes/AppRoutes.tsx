import {
  Routes,
  Route,
  useLocation,
  useNavigate
} from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';

// Component
import {
  Drawer,
  ErrorFallback
} from '@components';

// Constant
import { PATH } from '@constants';

// Layouts
import {
  ErrorPage,
  HomePage,
  RolePage,
  RulePage
} from '@layouts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUserGroup,
  faShield,
  faListCheck,
} from '@fortawesome/free-solid-svg-icons';

const AppRoutes = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleAdd = () => {};

  const navigations = [
    {
      id: 1,
      label: 'Users',
      action: () => {
        navigate(PATH.HOME_PATH);
      },
      icon: <FontAwesomeIcon icon={faUserGroup} />,
    },
    {
      id: 2,
      label: 'Roles',
      action: () => {
        navigate(PATH.ROLES_PATH);
      },
      icon: <FontAwesomeIcon icon={faShield} />,
    },
    {
      id: 3,
      label: 'Rules',
      action: () => {
        navigate(PATH.RULES_PATH);
      },
      icon: <FontAwesomeIcon icon={faListCheck} />,
    },
  ];

  return (
    <>
      <header className="header">
        <h1 className="header__heading text--primary">User Manager</h1>
      </header>
      <main className="main">
        <Drawer
          position="left"
          onSubmit={handleAdd}
          navigations={navigations}
        />
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
      </main>
    </>
  );
};

export default AppRoutes;
