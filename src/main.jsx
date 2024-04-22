import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { ToggleProvider } from './Components/store/ToggleContext.jsx'
import './index.css'



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ToggleProvider>
        <App />
      </ToggleProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
