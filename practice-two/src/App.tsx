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

// Constant
import { path } from '@constants';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path={path.HOME_PATH} element={<HomePage />} />
        <Route path={path.ROLES_PATH} element={<RolePage />} />
        <Route path={path.RULES_PATH} element={<RulePage />} />
        <Route path={path.ERROR_PATH} element={<ErrorPage />} />
      </Routes>
    </Router>
  );
};

export default App;
