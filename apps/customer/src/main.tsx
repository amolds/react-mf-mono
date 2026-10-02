import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import CustomersPage from './components/CustomerPage.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CustomersPage />
  </StrictMode>,
)
