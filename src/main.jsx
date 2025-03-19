import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // Use BrowserRouter instead of Router
import './index.css';
import App from './App.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import Loader from './components/Loader.jsx';
import { Suspense } from 'react';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Suspense fallback={<Loader />}>
          <App />
        </Suspense>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>
);