import './app.css';

function App() {
  return (
    <div id="comida" className="md:flex mt-30">
      <div className="md:hidden md:px-40 relative">
        <img
          src="src/assets/Pi-jei.jpg"
          alt="Argüende Food"
          className="object-cover aspect-[5/4] w-full"
        />
        <div className="absolute bottom-0 left-0 right-0 z-20 text-black text-lg md:text-4xl flex justify-between p-4">
          <div>
            <p className="font-pesada">@Arguende_</p>
          </div>
          <div>
            <p className="font-pesada">RITUAL HABITUAL</p>
          </div>
        </div>
        <div className="bg-gradient-to-b from-transparent to-white absolute bottom-0 w-full p-4">
          
        </div>
      </div>
      {/* div izquierdo */}
      <div className="text-black px-5 md:pl-10">
        <div className="hidden text-xl md:text-4xl flex justify-between">
          <div >
            <p className="font-pesada">@Arguende_</p>
          </div>
          <div>
            <p className="font-pesada">RITUAL HABITUAL</p>
          </div>
        </div>
        <div className="pt-5 md:pt-10 pb-5">
          <p className="text-5xl md:text-7xl font-pesada">COMIDA</p>
        </div>
        <div className="pb-5">
          <div className="flex pt-5 justify-between text-2xl md:text-3xl ">
            <p className="font-media">MENEMEN</p>
            <p className="font-pesada md:px-10">$95</p>
          </div>
          <div className="text-lg md:text-xl md:tracking-wider w-8/10">
            <p>Huevos escalfados en salsa de tomate con
              especias, pimiento, cebolla, queso fresco y
              perejil. </p>
          </div>
        </div>
        <div className="py-5">
          <div className="flex pt-5 justify-between text-2xl md:text-3xl ">
            <p className="font-media">NIÑO LINDO</p>
            <p className="font-pesada md:px-10">$110</p>
          </div>
          <div className="text-lg md:text-xl md:tracking-wider w-8/10">
            <p>Tostado con durazno asado, burrata,
              verdolaga y miel infusionada con habanero.
            </p>
          </div>
        </div>
        <div className="py-5">
          <div className="flex  justify-between md:text-3xl ">
            <p className="font-media">EL SAPICHU</p>
            <p className="font-pesada md:px-10">$90</p>
          </div>
          <div className="md:text-xl tracking-wider ">
            <p>Medallón de atún sellado, marinado con,<br />
              limón amarillo y aceite de oliva, montado <br />
              en tortilla de maíz azul. Cebollita<br />
              encurtida con limón, serrano y piña.<br />
            </p>
          </div>
        </div>
        <div className="py-5">
          <div className="flex justify-between md:text-3xl ">
            <p className="font-media">PAN FRANCÉS</p>
            <p className="font-pesada px-10">$95</p>
          </div>
          <div className="md:text-xl tracking-wider ">
            <p>Medallón de atún sellado, marinado con,<br />
              limón amarillo y aceite de oliva, montado <br />
              en tortilla de maíz azul. Cebollita<br />
              encurtida con limón, serrano y piña.<br />
            </p>
          </div>
        </div>
      </div>

      {/* div derecho */}
      <div className="hidden md:flex md:px-40">
        <img
          src="src/assets/Pi-jei.jpg"
          alt="Argüende Food"
          className="object-cover"
        />

      </div>
    </div>


  );
}

export default App;