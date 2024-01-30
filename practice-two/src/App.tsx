import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

// Layouts
import {
  ErrorPage,
  HomePage,
  RolePage,
  RulePage
} from '@layouts';

// Constants
import {
  ERROR_PATH,
  HOME_PATH,
  ROLES_PATH,
  RULES_PATH
} from '@constants';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path={HOME_PATH} element={<HomePage />} />
        <Route path={ROLES_PATH} element={<RolePage />} />
        <Route path={RULES_PATH} element={<RulePage />} />
        <Route path={ERROR_PATH} element={<ErrorPage />} />
      </Routes>
    </Router>
  );
};

export default App;
