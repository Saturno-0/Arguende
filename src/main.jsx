import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Navbar from './Navbar.jsx'
import Landing from './Landing.jsx'
import Footer from "./Footer.jsx"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Navbar />
    <Landing />
    <App />
    <Footer/>
  </StrictMode>,
)
