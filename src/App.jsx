import './app.css'; 

function App() {
  return (
    <div>
      {/* Navbar */}
      <nav className="fixed h-50 top-0 left-0 right-0 z-50 px-6 py-6 bg-gradient-to-b from-white from-10% to-transparent to-50% ">
        <div className="flex justify-between">
          
          <div className="flex items-center space-x-8">
            <span className="text-gray-800 font-light text-3xl" >
              Alimentos
            </span>
            <span className="text-gray-800 font-light text-3xl" >
              Bebidas
            </span>
            <span className="text-gray-800 font-light text-3xl" style={{ fontFamily: 'Helvetica Neue' }}>
              Contacto
            </span>
          </div>
          
          <div className="absolute left-1/2 top-1/4  -translate-x-1/2 -translate-y-1/2">
            <div className="h-16">
              <img 
                src="public/logo.png" 
                alt="Argüende" 
                className="h-full object-contain"
              />
            </div>
          </div>
          
          <div className="flex items-center px-6">
            <img 
              src="src/assets/icon-instagram.png" 
              className=" w-9 cursor-pointer hover:opacity-75 transition-opacity"
            />
            {/* <img 
              src="src/assets/icon-uber.png"
              className="w-7 cursor-pointer hover:opacity-75 transition-opacity"
            /> */}
          </div>
        </div>
      </nav>

      {/* Landing - Dos componentes */}
       <div className="flex w-screen h-screen">
        {/* Componente 1 - 2/3 del espacio con imagen */}
        <div className="w-2/3 relative">
          <img 
            className="contrast-120 brightness-80 h-screen w-screen object-bottom object-cover"
            src="src/assets/FacadeArguende.jpg" 
            alt="Fachada"
          />
          {/* Degradado para desvanecer hacia la derecha */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent from-97% to-[#282828]"></div>
        </div>

        {/* Componente 2 - 1/3 del espacio con color #282828 */}
        <div className="flex w-1/3 bg-[#282828] items-end py-12 px-12">
          <p className="font-medium">Argüende no se limita a ser una cafetería; <br/>
          es un espacio diseñado para capturar la <br />
          esencia del ritual diario, destacando la <br />
          simplicidad y autenticidad en cada taza. <br /> <br />

          Este proyecto es simplemente nuestra <br />
          manera de compartir lo que nos gusta: <br />
          hacer buen café y disfrutarlo.</p>
        </div>
      </div>
    </div>
  );
}

export default App;