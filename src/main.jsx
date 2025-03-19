import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { Router } from 'react-router-dom'
import Loader from './components/Loader.jsx'
import { Suspense } from 'react'

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <AuthProvider>
      <Router>
      
          <Suspense fallback={<Loader />}>
           <App />
          </Suspense>
      
      </Router>
    </AuthProvider>
    
  </StrictMode>,
)
