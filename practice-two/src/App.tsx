import { BrowserRouter as Router } from 'react-router-dom';

// Routes
import { AppRoutes } from '@routes';

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
