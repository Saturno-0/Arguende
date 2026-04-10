import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import './index.css'
import App from './App.jsx'
import Navbar from './Navbar.jsx'
import Landing from './Landing.jsx'
import Footer from "./Footer.jsx"
import AdminLogin from './admin/AdminLogin.jsx'
import AdminPanel from './admin/AdminPanel.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/" element={
          <>
            <Navbar />
            <Landing />
            <App />
            <Footer />
            <Analytics />
          </>
        } />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
