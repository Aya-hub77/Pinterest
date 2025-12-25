import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom';
import { AuthProvider } from './Context/AuthProvider.jsx';
import { SearchProvider } from './Context/SearchProvider.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <SearchProvider>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </SearchProvider>
    </AuthProvider>
  </StrictMode>,
)