import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter , Routes , Route } from 'react-router-dom'
import './index.css'
import Home from './components/Home.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
        <Routes>
            <Route path="/ai-app" element={<App />} />
            <Route path="/" element={<Home />} />
        </Routes>
    </BrowserRouter>
  </StrictMode>
  ,
)
