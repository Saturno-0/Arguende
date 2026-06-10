import { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import './App.css';
import { supabase } from './lib/supabase';
import ImageCarousel from './components/ImageCarousel';

function Landing() {
  const [isLogoActive, setIsLogoActive] = useState(false);
  const [isSplashVisible, setIsSplashVisible] = useState(true);
  const [isCarouselVisible, setIsCarouselVisible] = useState(false);
  const [fachadaUrl, setFachadaUrl] = useState(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const logoTimer = setTimeout(() => setIsLogoActive(true), 500);
    const splashTimer = setTimeout(() => setIsSplashVisible(false), 1600);

    supabase
      .from('section_images')
      .select('path')
      .eq('seccion', 'fachada')
      .single()
      .then(({ data }) => {
        if (data?.path) {
          const { data: urlData } = supabase.storage.from('menu-images').getPublicUrl(data.path);
          setFachadaUrl(urlData.publicUrl);
        }
      });

    return () => {
      clearTimeout(logoTimer);
      clearTimeout(splashTimer);
    };
  }, []);

  return (
    <div id="landing" className="relative min-h-[100dvh] overflow-hidden bg-[#282828]">

      {/* Splash screen */}
      <div
        className={`fixed inset-0 bg-[#282828] z-[60] flex items-center justify-center transition-transform duration-1000 ease-in-out ${
          isSplashVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <img
          src="Logo-W.png"
          alt="Argüende"
          className={`w-36 md:w-44 object-contain transition-all duration-500 ease-out ${
            isLogoActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
          }`}
        />
      </div>

      {/* Foto fachada — ocupa todo en mobile, 62% a izquierda en desktop */}
      {fachadaUrl && (
        <div className="absolute inset-0 md:right-[38%]">
          <img
            src={fachadaUrl}
            alt="Argüende fachada"
            className="w-full h-full object-cover object-center"
          />
        </div>
      )}

      {/* Gradiente en desktop: fade de foto hacia panel oscuro */}
      <div className="hidden md:block absolute top-0 bottom-0 right-[38%] w-32 bg-gradient-to-r from-transparent to-[#282828]" />

      {/* Gradiente en mobile: fade hacia abajo para leer el texto */}
      <div className="md:hidden absolute inset-0 bg-gradient-to-t from-[#282828]/90 via-[#282828]/30 to-transparent" />

      {/* Panel de texto desktop (derecha 38%) */}
      <div className="hidden md:flex absolute top-0 right-0 bottom-0 w-[38%] bg-[#282828] items-center px-10 lg:px-14">
        <motion.div
          initial={reduce ? false : { opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 1.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-zinc-300 font-media-italica text-xl leading-relaxed mb-8">
            Argüende no se limita a ser una cafetería; es un espacio diseñado
            para capturar la esencia del ritual diario, destacando la
            simplicidad y autenticidad en cada taza.
            <br /><br />
            Este proyecto es simplemente nuestra manera de compartir lo que
            nos gusta: hacer buen café y disfrutarlo.
          </p>
          <button
            onClick={() => setIsCarouselVisible(true)}
            className="px-7 py-3 border border-white/25 rounded-full text-white text-sm font-medium hover:bg-white/10 active:scale-[0.98] transition-all duration-200"
          >
            LO NUEVO
          </button>
        </motion.div>
      </div>

      {/* Panel de texto mobile (abajo sobre la foto) */}
      <motion.div
        className="md:hidden absolute bottom-0 left-0 right-0 z-10 px-6 pb-10 pt-6"
        initial={reduce ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 1.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="text-zinc-300 font-media-italica text-[15px] leading-relaxed mb-6">
          Argüende no se limita a ser una cafetería; es un espacio diseñado
          para capturar la esencia del ritual diario, destacando la
          simplicidad y autenticidad en cada taza.
          <br /><br />
          Este proyecto es simplemente nuestra manera de compartir lo que
          nos gusta: hacer buen café y disfrutarlo.
        </p>
        <button
          onClick={() => setIsCarouselVisible(true)}
          className="w-full py-3 border border-white/25 rounded-full text-white text-sm font-medium hover:bg-white/10 active:scale-[0.98] transition-all duration-200"
        >
          LO NUEVO
        </button>
      </motion.div>

      <ImageCarousel isVisible={isCarouselVisible} onClose={() => setIsCarouselVisible(false)} />
    </div>
  );
}

export default Landing;
