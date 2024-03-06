import { BrowserRouter as Router } from 'react-router-dom';

// Route
import AppRoutes from '@routes';

// Store
import { Provider } from '@stores';

const App = () => {
  return (
    <Provider>
      <Router>
        <AppRoutes />
      </Router>
    </Provider>
  );
};

export default App;
