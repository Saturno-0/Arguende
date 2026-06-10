import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import HamburgerMenu from './HamburgerMenu.jsx';
import InstagramImage from './assets/icon-instagram.png';
import UberImage from './assets/icon-uber.png';
import WhatsImage from './assets/icon-whatsapp.png';

function Navbar() {
  const navigate = useNavigate();
  const tapCount = useRef(0);
  const tapTimer = useRef(null);

  function handleLogoTap(e) {
    tapCount.current += 1;
    clearTimeout(tapTimer.current);

    if (tapCount.current >= 5) {
      tapCount.current = 0;
      e.preventDefault();
      navigate('/admin/login');
      return;
    }

    // Resetea si pasan más de 2s entre taps
    tapTimer.current = setTimeout(() => { tapCount.current = 0; }, 2000);
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-5 py-4 md:px-8 md:py-5 bg-white/92 backdrop-blur-md border-b border-zinc-200/60">

      {/* Mobile: hamburger izquierda */}
      <div className="md:hidden">
        <HamburgerMenu />
      </div>

      {/* Desktop: links izquierda */}
      <div className="hidden md:flex items-center gap-8">
        <a href="#comida" className="text-zinc-700 font-light text-lg hover:text-zinc-950 transition-colors duration-200">
          Comida
        </a>
        <a href="#bebidas" className="text-zinc-700 font-light text-lg hover:text-zinc-950 transition-colors duration-200">
          Bebidas
        </a>
        <a href="#contacto" className="text-zinc-700 font-light text-lg hover:text-zinc-950 transition-colors duration-200">
          Contacto
        </a>
      </div>

      {/* Logo centrado — 5 taps rápidos abre el panel admin */}
      <div className="absolute left-1/2 -translate-x-1/2">
        <a href="#landing" onClick={handleLogoTap} className="hover:opacity-80 transition-opacity duration-200">
          <img
            src="Logo.png"
            alt="Argüende"
            className="h-9 md:h-11 w-auto object-contain"
          />
        </a>
      </div>

      {/* Iconos sociales derecha */}
      <div className="flex items-center gap-3 md:gap-5">
        <a
          href="https://www.instagram.com/arguende_/"
          target="_blank"
          rel="noopener noreferrer"
          className="opacity-75 hover:opacity-100 transition-opacity duration-200"
        >
          <img src={InstagramImage} alt="Instagram" className="w-7 h-7 object-contain" />
        </a>
        <a
          href="https://wa.me/523331780373"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:block opacity-75 hover:opacity-100 transition-opacity duration-200"
        >
          <img src={WhatsImage} alt="WhatsApp" className="w-7 h-7 object-contain" />
        </a>
        <a
          href="https://www.ubereats.com/mx/store/arguende/bkrhFt4JVQuljpyblah9CQ?diningMode=DELIVERY&ps=1&surfaceName="
          target="_blank"
          rel="noopener noreferrer"
          className="opacity-75 hover:opacity-100 transition-opacity duration-200"
        >
          <img src={UberImage} alt="Uber Eats" className="w-7 h-7 object-contain" />
        </a>
      </div>
    </nav>
  );
}

export default Navbar;
