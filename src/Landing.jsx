"use client"

import { useState, useEffect } from "react"
import "./App.css"
import FacadeArguendeImage from "./assets/FacadeArguende.jpg"
import ImageCarousel from "./components/ImageCarousel"

function Landing() {
  const [isLogoActive, setIsLogoActive] = useState(false)
  const [isSplashVisible, setIsSplashVisible] = useState(true)
  const [isCarouselVisible, setIsCarouselVisible] = useState(false)

  useEffect(() => {
    // Activar la animación del logo después de 400ms
    const logoTimer = setTimeout(() => {
      setIsLogoActive(true)
    }, 500)

    // Ocultar la pantalla de inicio después de 2300ms
    const splashTimer = setTimeout(() => {
      setIsSplashVisible(false)
    }, 1500)

    return () => {
      clearTimeout(logoTimer)
      clearTimeout(splashTimer)
    }
  }, [])

  return (
    <div id="landing" className="flex h-screen md:justify-end relative overflow-hidden">
      {/* Splash */}
      <div
        className={`fixed h-screen inset-0 bg-[#282828] z-50 bg-none transition-all duration-1000 ${
          isSplashVisible ? "top-0" : "-top-300"
        }`}
      >
        <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <img
            src="Logo-W.png"
            alt="Argüende"
            className={`object-contain md:w-[18vw] relative inline-block transition duration-500 ease-in-out ${
              isLogoActive ? "bottom-0 opacity-100" : "-bottom-5 opacity-0"
            }`}
          />
        </h1>
      </div>

      {/* Contenido principal */}
      <img
        src={FacadeArguendeImage}
        alt="Argüende Facade"
        className="fixed md:inset-0 top-[-6%] md:scale-[1] scale-[1.15] object-cover h-screen md:w-[67%] md:mr-[40%] md:mb-0 md:mr-auto"
      />

      <div className="hidden md:flex bg-gradient-to-r from-transparent from-60% to-[#282828] w-10 z-10"></div>

      <div className="bg-black/10 backdrop-blur-xs rounded-3xl md:rounded-none absolute text-md md:text-xl md:relative md:my-0 md:items-end self-center mx-15 md:mx-0 md:self-auto md:flex md:bg-[#282828] md:p-15 md:w-1/3 pb-5 px-5">
        <div>
          <p className="text-center font-media-italica md:text-start md:m-0 m-2">
            Argüende no se limita a ser una cafetería; es un espacio diseñado para capturar la esencia del ritual
            diario, destacando la simplicidad y autenticidad en cada taza.
            <br />
            <br />
            Este proyecto es simplemente nuestra manera de compartir lo que nos gusta; hacer buen café y disfrutarlo.
          </p>

          {/* News Button */}
          <button
            onClick={() => setIsCarouselVisible(true)}
            className="mt-6 w-full md:w-auto px-6 py-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 rounded-full text-white font-medium transition-all duration-300 hover:scale-105"
          >
            LO NUEVO
          </button>
        </div>
      </div>

      {/* Image Carousel */}
      <ImageCarousel isVisible={isCarouselVisible} onClose={() => setIsCarouselVisible(false)} />
    </div>
  )
}

export default Landing
