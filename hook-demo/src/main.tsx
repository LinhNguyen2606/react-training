import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { ProviderStorage } from './store';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ProviderStorage>
      <App />
    </ProviderStorage>
  </React.StrictMode>
);
