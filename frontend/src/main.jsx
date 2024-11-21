import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import Store from './context/Store.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Store>
      <App />
    </Store>
  </StrictMode>,
)
