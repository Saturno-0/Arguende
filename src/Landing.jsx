import React, { useState, useEffect } from 'react';
import './App.css';
import FacadeArguendeImage from './assets/FacadeArguende.jpg';

function Landing() {
  const [isLogoActive, setIsLogoActive] = useState(false);
  const [isSplashVisible, setIsSplashVisible] = useState(true);

  useEffect(() => {
    // Activar la animación del logo después de 400ms
    const logoTimer = setTimeout(() => {
      setIsLogoActive(true);
    }, 400);

    // Ocultar la pantalla de inicio después de 2300ms
    const splashTimer = setTimeout(() => {
      setIsSplashVisible(false);
    }, 2300);

    return () => {
      clearTimeout(logoTimer);
      clearTimeout(splashTimer);
    };
  }, []);

  return (
    <div
      id="landing"
      className="flex h-screen md:justify-end relative overflow-hidden"
    >
      {/* Pantalla de inicio */}
      <div
        className={`fixed h-screen inset-0 bg-[#282828] z-50 bg-none transition-all duration-1000 ${
          isSplashVisible ? 'top-0' : '-top-300'
        }`}
      >
        <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <img
            src="Logo-W.png"
            alt="Argüende"
            className={`object-contain md:w-[18vw] relative inline-block transition duration-500 ease-in-out ${
              isLogoActive ? 'bottom-0 opacity-100' : '-bottom-5 opacity-0'
            }`}
          />
        </h1>
      </div>

      {/* Contenido principal */}
      <img
        src={FacadeArguendeImage}
        alt="Argüende Facade"
        className="fixed inset-0 object-cover h-screen md:w-[70%] md:mr-[40%] md:mr-auto"
      />
      <div className="hidden md:flex bg-gradient-to-r from-transparent from-60% to-[#282828] w-10 z-10"></div>
      <div className="bg-black/30 backdrop-blur-sm rounded-3xl md:rounded-none absolute text-md md:text-xl md:relative md:my-0 md:items-end self-center mx-15 md:mx-0 md:self-auto md:flex md:bg-[#282828] md:p-15 md:w-1/3 pb-5 px-5">
        <p className="md:font-pesada  md:m-0 m-5">
          Argüende no se limita a ser una cafetería; es un espacio diseñado para
          capturar la esencia del ritual diario, destacando la simplicidad y
          autenticidad en cada taza.
          <br />
          <br />
          Este proyecto es simplemente nuestra manera de compartir lo que nos
          gusta: hacer buen café y disfrutarlo.
        </p>
      </div>
    </div>
  );
}

export default Landing;