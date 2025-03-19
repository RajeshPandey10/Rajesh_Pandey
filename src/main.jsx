import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <AuthProvider>
      <Router>
        {loading ? (
          <Loader />
        ) : (
          <Suspense fallback={<Loader />}>
           <App />
          </Suspense>
        )}
      </Router>
    </AuthProvider>
    
  </StrictMode>,
)
