import './App.css';
import { useEffect, useRef } from 'react'

function App() {
  const textRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-slide-up');
            observer.unobserve(entry.target); // Stop observing once animated
          }
        });
      },
      { threshold: 0.6 } // Trigger when 10% of the element is visible
    );

    if (textRef.current) {
      observer.observe(textRef.current);
    }

    return () => {
      if (textRef.current) {
        observer.unobserve(textRef.current);
      }
    };
  }, []);

  return (
    <div>
      <div id="comida" class="flex md:pt-25">
        <div class="text-black w-full">
          <div class="bg-[url(/src/assets/Pi-jei.jpg)] bg-cover bg-no-repeat bg-center h-70 md:hidden h-3/4 items-end text-xl md:text-4xl flex justify-around ">
            <div class="absolute text-white bg-gradient-to-t w-screen from-white from-20% to-transparent md:hidden ">.</div>
            <div >
              <p class="relative font-pesada">@Arguende_</p>
            </div>
            <div>
              <p class="relative font-pesada">RITUAL HABITUAL</p>
            </div>
          </div>
          <div class="justify-between hidden md:flex text-4xl md:pb-10">
            <div >
              <p class="md:pl-10 font-pesada">@Arguende_</p>
            </div>
            <div>
              <p class=" font-pesada">RITUAL HABITUAL</p>
            </div>
          </div>
          <div class='md:mx-15 mx-5'>
            <div ref={textRef}>
              <div class="pb-5">
                <p class="font-pesada text-6xl md:text-6xl">COMIDA</p>
                <div class="flex pt-5 justify-between text-2xl md:text-3xl ">
                  <p class="font-media">MENEMEN</p>
                  <p class="font-pesada ">$95</p>
                </div>
                <div class="text-lg md:text-xl md:tracking-wider w-8/10 md:w-6/10">
                  <p>Huevos escalfados en salsa de tomate con
                    especias, pimiento, cebolla, queso fresco y
                    perejil. </p>
                </div>
              </div>
              <div class="py-5">
                <div class="flex justify-between text-2xl md:text-3xl ">
                  <p class="font-media">NIÑO LINDO</p>
                  <p class="font-pesada">$110</p>
                </div>
                <div class="text-lg md:text-xl md:tracking-wider md:w-6/10 w-8/10">
                  <p>Tostado con durazno asado, burrata,
                    verdolaga y miel infusionada con habanero.
                  </p>
                </div>
                <div class="flex  justify-between md:justify-end items-center ">
                  <p class="font-media">¡Hazlo salado! Añade jamon serrano</p>
                  <p class="font-pesada md:pl-10 text-xl md:text-2xl ">+ $15</p>
                </div>
              </div>
            </div>
            <div class="py-5">
              <div class="flex justify-between text-2xl md:text-3xl ">
                <p class="font-media">EL SAPICHU</p>
                <p class="font-pesada ">$90</p>
              </div>
              <div class="text-lg md:text-xl md:tracking-wider md:w-6/10 w-8/10">
                <p>Medallón de atún sellado, marinado con
                  limón amarillo y aceite de oliva, montado
                  en tortilla de maíz azul. Cebollita
                  encurtida con limón, serrano y piña.
                </p>
              </div>
              <div class="flex justify-end items-center ">
                <p class="font-media md:mr-0 mr-5">-Añade queso</p>
                <p class="font-pesada md:pl-10 text-xl md:text-2xl ">+ $15</p>
              </div>
            </div>
            <div class="py-5">
              <div class="flex justify-between text-2xl md:text-3xl ">
                <p class="font-media">ECHANDO TAQUETE</p>
                <p class="font-pesada ">$80</p>
              </div>
              <div class="text-lg md:text-xl md:tracking-wider md:w-6/10 w-8/10">
                <p>Taco veggie estilo ensenada, preparado con
                  setas, ensalada de col morada y zanahoria
                  con un toque de cebollita encurtida con
                  limón y serrano.
                </p>
              </div>
              <div class="flex justify-end items-center ">
                <p class="font-media md:mr-0 mr-5">-Añade queso</p>
                <p class="font-pesada md:pl-10 text-xl md:text-2xl ">+ $15</p>
              </div>
            </div>
            <div class="py-5">
              <div class="flex justify-between text-2xl md:text-3xl ">
                <p class="font-media">PAN FRANCÉS</p>
                <p class="font-pesada">$95</p>
              </div>
              <div class="text-lg md:text-xl md:tracking-wider md:w-6/10 w-8/10">
                <p>Infalible, acompañado de fruta de temporada.
                </p>
              </div>
            </div>
            <div class="py-5">
              <div class="flex justify-between text-2xl md:text-3xl ">
                <p class="font-media">AVENITA</p>
                <p class="font-pesada ">$55</p>
              </div>
              <div class="text-lg md:text-xl md:tracking-wider md:w-6/10 w-8/10">
                <p>Cocida en agua con un toque de leche y canela. Pera, nuez de castilla y un 'chin'
                  de miel de agave.
                </p>
              </div>
              <div class="flex  justify-between md:justify-end items-center ">
                <p class="font-media text-sm">-Añade: Yogurt griego/Crema de cacahuate</p>
                <p class="font-pesada md:pl-10 text-xl md:text-2xl ">+ $15</p>
              </div>
            </div>
            <div class="py-5">
              <div class="flex justify-between text-2xl md:text-3xl ">
                <p class="font-media">PI-JEI</p>
                <p class="font-pesada ">$60</p>
              </div>
              <div class="text-lg md:text-xl md:tracking-wider md:w-6/10 w-8/10">
                <p>Pan de caja tostado con crema de cacahuate
                  y mermelada de la casa.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="sticky top-25 self-start md:flex hidden md:px-30">
          <img
            src="src/assets/Pi-jei.jpg"
            alt="Argüende Food"
            class="object-contain"
          />
        </div>
      </div>
      <div id="bebidas" class="flex md:pt-25 md:ml-10" >
        <div class='text-black bg-[#FCCDCD] w-full' >
          <div class="bg-[url(/src/assets/LatteArguende.jpg)] bg-cover bg-no-repeat bg-position-[center_70%] h-70 md:hidden h-3/4 items-end text-xl md:text-4xl flex justify-around ">
            <div class="absolute text-white bg-gradient-to-t w-screen from-[#FCCDCD] from-20% to-transparent md:hidden ">.</div>

          </div>
          <div class="md:ml-5 md:mr-15 mx-5">
            <div class="justify-items-end">
              <p class="md:text-lg consola my-5">No. 00001</p>
            </div>
            <p class="font-pesada text-6xl md:text-6xl">BEBIDAS</p>
            <div class="py-5 text-2xl md:text-3xl ">
              <p class="font-pesada">CAFÉ :</p>
            </div>
            <div class="flex justify-between text-2xl items-center md:text-3xl ">
              <p class="font-media text-lg md:text-xl">ESPRESSO</p>
              <p class="font-pesada ">$55</p>
            </div>
            <div class="flex justify-between text-2xl items-center md:text-3xl ">
              <p class="font-media text-lg md:text-xl">CORTADO</p>
              <p class="font-pesada">$60</p>
            </div>
            <div class="flex justify-between text-2xl items-center md:text-3xl ">
              <p class="font-media text-lg md:text-xl">AMERICANO</p>
              <p class="font-pesada">$65</p>
            </div>
            <div class="flex justify-between text-2xl items-center md:text-3xl ">
              <p class="font-media text-lg md:text-xl">CAPUCCINO</p>
              <p class="font-pesada">$70</p>
            </div>
            <div class="flex justify-between text-2xl items-center md:text-3xl ">
              <p class="font-media text-lg md:text-xl">FLAT WHITE</p>
              <p class="font-pesada">$65</p>
            </div>
            <div class="flex justify-between text-2xl items-center md:text-3xl ">
              <p class="font-media text-lg md:text-xl">LATTE</p>
              <p class="font-pesada">$65</p>
            </div>
            <div class="flex justify-between text-2xl items-center md:text-3xl ">
              <p class="font-media text-lg md:text-xl">FILTRADOS</p>
              <p class="text-lg">*Sujeto al origen de grano*</p>
            </div>
            <div class="py-5 text-2xl md:text-3xl ">
              <p class="font-pesada">ALTERNATIVAS :</p>
            </div>
            <div class="flex py-3 justify-between text-2xl items-center md:text-3xl ">
              <p class="font-media text-lg md:text-xl">MATCHA CEREMONIAL</p>
              <p class="font-pesada">$65</p>
            </div>
            <div class="flex pt-3 justify-between text-2xl items-center md:text-3xl ">
              <p class="font-media text-lg md:text-xl">SMOOTHIE</p>
              <p class="font-pesada">$65</p>
            </div>
            <div class="text-lg md:text-xl md:w-6/10 w-8/10">
              <p>Leche, plátano, dátil y shot de espresso.
              </p>
            </div>
            <div class="flex pt-3 justify-between text-2xl items-center md:text-3xl ">
              <p class="font-media text-lg md:text-xl">JUGO BOMBIUX</p>
              <p class="font-pesada">$60</p>
            </div>
            <div class="text-lg md:text-xl md:w-6/10 w-8/10">
              <p>Piña, naranja, fresa y limón.
              </p>
            </div>
            <div class="flex pt-3 justify-between text-2xl items-center md:text-3xl ">
              <p class="font-media text-lg md:text-xl">DE ANTAÑO</p>
              <p class="font-pesada">$55</p>
            </div>
            <div class="text-lg md:text-xl md:w-6/10 w-8/10">
              <p>Betabel y zanahoria.
              </p>
            </div>
            <div class="py-5 text-2xl md:text-3xl ">
              <p class="font-pesada">REFRESCOS:</p>
            </div>
            <div class="flex  justify-between text-2xl items-center md:text-3xl ">
              <p class="font-media text-lg md:text-xl">COCA COLA</p>
              <p class="font-pesada">$25</p>
            </div>
            <div class="flex  justify-between text-2xl items-center md:text-3xl ">
              <p class="font-media text-lg md:text-xl">AGUA MINERAL</p>
              <p class="font-pesada">$50</p>
            </div>
            <div class="text-xl md:text-4xl my-10 mt-10 text-white flex justify-between">
              <div >
                <p class="font-pesada">@Arguende_</p>
              </div>
              <div>
                <p class=" font-pesada">RITUAL HABITUAL</p>
              </div>
            </div>
          </div>
        </div>
        <div class="sticky top-25 self-start md:flex hidden md:px-30">
          <img
            src="src/assets/LatteArguende.jpg"
            alt="Argüende Food"
            class="object-contain"
          />
        </div>
      </div>
    </div>


  );
}

export default App;