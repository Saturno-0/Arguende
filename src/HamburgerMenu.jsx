import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import './App.css';

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const close = () => setIsOpen(false);

  // Bloquea scroll del body mientras el menú está abierto
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <div className="relative">
      {/* Botón hamburguesa — dentro del navbar z-50, siempre accesible */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex flex-col justify-center gap-[5px] w-8 h-8 focus:outline-none"
        aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
        aria-expanded={isOpen}
      >
        <span className={`block h-0.5 bg-zinc-800 transition-all duration-300 ease-in-out ${isOpen ? 'w-6 rotate-45 translate-y-[7px]' : 'w-6'}`} />
        <span className={`block h-0.5 bg-zinc-800 transition-all duration-300 ease-in-out ${isOpen ? 'w-0 opacity-0' : 'w-5'}`} />
        <span className={`block h-0.5 bg-zinc-800 transition-all duration-300 ease-in-out ${isOpen ? 'w-6 -rotate-45 -translate-y-[7px]' : 'w-6'}`} />
      </button>

      {/* Overlay via portal — z-[45] en el root context, encima del tab bar (z-30) */}
      {createPortal(
        <div
          className={`fixed inset-0 bg-white z-[45] flex flex-col items-center justify-center transition-transform duration-500 ease-in-out ${
            isOpen ? 'translate-x-0' : '-translate-x-full pointer-events-none'
          }`}
        >
          <nav className="flex flex-col items-center gap-10">
            {[
              { href: '#comida', label: 'Comida' },
              { href: '#bebidas', label: 'Bebidas' },
              { href: '#contacto', label: 'Contacto' },
            ].map(({ href, label }) => (
              <a
                key={href}
                href={href}
                onClick={close}
                className="text-4xl text-zinc-800 font-light tracking-wide hover:text-zinc-500 transition-colors duration-200"
              >
                {label}
              </a>
            ))}

            <div className="flex gap-10 mt-6 pt-6 border-t border-zinc-100 w-40 justify-center">
              {[
                { href: 'https://www.instagram.com/arguende_/', label: 'Instagram' },
                { href: 'https://wa.me/523331780373', label: 'WhatsApp' },
                { href: 'https://www.ubereats.com/mx/store/arguende/bkrhFt4JVQuljpyblah9CQ?diningMode=DELIVERY&ps=1&surfaceName=', label: 'Uber Eats' },
              ].map(({ href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={close}
                  className="text-sm text-zinc-500 font-light hover:text-zinc-900 transition-colors duration-200 whitespace-nowrap"
                >
                  {label}
                </a>
              ))}
            </div>
          </nav>
        </div>,
        document.body
      )}
    </div>
  );
};

export default HamburgerMenu;
