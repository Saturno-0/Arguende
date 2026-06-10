import './App.css';
import { motion, useReducedMotion } from 'motion/react';
import LinkedinImage from './assets/icon-linkedin.png';
import GithubImage from './assets/icon-github.png';
import WhatsImage from './assets/icon-whatsapp-w.png';
import InstagramImage from './assets/icon-instagram-w.png';
import UberImage from './assets/icon-uber-w.png';

function Footer() {
  const reduce = useReducedMotion();

  return (
    <footer id="contacto" className="bg-[#282828] text-[#D0D0CE]">
      <div className="px-5 sm:px-8 md:px-12 lg:px-16 pt-12 pb-8 md:flex md:justify-between md:items-start md:gap-12">

        {/* Bloque izquierdo: contacto */}
        <motion.div
          className="mb-10 md:mb-0"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="font-pesada text-5xl md:text-6xl mb-4">CONTACTO</p>

          <p className="text-xl md:text-2xl mb-5">arguende.ritual@gmail.com</p>

          {/* Iconos sociales */}
          <div className="flex items-center gap-4 mb-8">
            <a
              href="https://www.instagram.com/arguende_/"
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-75 hover:opacity-100 transition-opacity duration-200"
            >
              <img src={InstagramImage} alt="Instagram" className="w-8 h-8 object-contain" />
            </a>
            <a
              href="https://wa.me/523331780373"
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-75 hover:opacity-100 transition-opacity duration-200"
            >
              <img src={WhatsImage} alt="WhatsApp" className="w-8 h-8 object-contain" />
            </a>
            <a
              href="https://www.ubereats.com/mx/store/arguende/bkrhFt4JVQuljpyblah9CQ?diningMode=DELIVERY&ps=1&surfaceName="
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-75 hover:opacity-100 transition-opacity duration-200"
            >
              <img src={UberImage} alt="Uber Eats" className="w-8 h-8 object-contain" />
            </a>
          </div>

          {/* Dirección y horarios */}
          <div className="space-y-1">
            <p className="text-lg md:text-xl">Blvd. García de León 1360, Morelia, Mich.</p>
            <div className="text-sm md:text-base opacity-70 mt-3 space-y-0.5">
              <p>Lun - Jue &nbsp; 8:00 am - 8:00 pm</p>
              <p>Vie - Sab &nbsp; 8:00 am - 6:00 pm</p>
              <p>Domingo &nbsp; 8:30 am - 3:30 pm</p>
            </div>
          </div>
        </motion.div>

        {/* Bloque derecho: tagline */}
        <motion.div
          className="flex flex-col items-end justify-between"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <img
            src="Tagline.png"
            alt="Ritual Habitual"
            className="w-48 md:w-64 lg:w-72 object-contain mb-6"
          />
        </motion.div>
      </div>

      {/* Créditos */}
      <div className="border-t border-white/10 px-5 sm:px-8 md:px-12 lg:px-16 py-4 flex justify-end items-center gap-3 text-xs text-zinc-500">
        <span>Coded by Rodrigo Salgado</span>
        <a
          href="https://www.linkedin.com/in/rodrigo-salgado-torres-b35a8a200"
          target="_blank"
          rel="noopener noreferrer"
          className="opacity-60 hover:opacity-100 transition-opacity"
        >
          <img src={LinkedinImage} alt="LinkedIn" className="w-4 h-4 object-contain" />
        </a>
        <a
          href="https://github.com/Saturno-0"
          target="_blank"
          rel="noopener noreferrer"
          className="opacity-60 hover:opacity-100 transition-opacity"
        >
          <img src={GithubImage} alt="GitHub" className="w-5 h-5 object-contain" />
        </a>
      </div>
    </footer>
  );
}

export default Footer;
