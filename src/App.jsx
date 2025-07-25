import './App.css';
import { useEffect, useRef } from 'react';
import PiJeiImage from './assets/Pi-jei.jpg'; // Import the image
import LatteArguendeImage from './assets/LatteArguende.jpg';

function App() {
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-slide-up');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      const elements = containerRef.current.querySelectorAll('.text-container');
      elements.forEach((element) => observer.observe(element));
    }

    return () => {
      if (containerRef.current) {
        const elements = containerRef.current.querySelectorAll('.text-container');
        elements.forEach((element) => observer.unobserve(element));
      }
    };
  }, []);

  const comidaItems = [
    {
      title: 'COMIDA',
      isHeader: true,
    },
    {
      title: 'MENEMEN',
      price: '$95',
      description: 'Huevos escalfados en salsa de tomate con especias, pimiento, cebolla, queso fresco y perejil.',
    },
    {
      title: 'NIÑO LINDO',
      price: '$135',
      description: 'Tostado con durazno asado, burrata, verdolaga y miel infusionada con habanero.',
      extras: [
        { text: '¡Hazlo salado! Añade jamon serrano', price: '+ $15' },
      ],
    },
    {
      title: 'EL SAPICHU',
      price: '$90',
      description: 'Taco de atún sellado, marinado con limón amarillo y aceite de oliva. Montado sobre un cremoso de aguacate con cebollitas encurtidas con limón, serrano y piña.',
      extras: [
        { text: '-Añade queso gouda', price: '+ $15' },
      ],
    },
    {
      title: 'ECHANDO TAQUETE',
      price: '$80',
      description: 'Taco veggie estilo ensenada, preparado con setas, ensalada de col morada y zanahoria.',
      extras: [
        { text: '-Añade queso gouda', price: '+ $15' },
      ],
    },
    {
      title: 'PAN FRANCÉS',
      price: '$95',
      description: 'Infalible, acompañado de fruta de temporada.',
    },
    {
      title: 'AVENITA',
      price: '$55',
      description: "Cocida en agua con un toque de leche y canela. Pera, nuez de castilla y un 'chin' de miel de agave.",
      extras: [
        { text: '-Añade: Yogurt griego/Crema de cacahuate', price: '+ $15', isSmall: true,},
      ],
    },
    {
      title: 'PI-JEI',
      price: '$60',
      description: 'Pan de caja tostado con crema de cacahuate y mermelada de la casa.',
    },
    {
      title: 'CHEESECAKE DE MANGO',
      price: '$85',
    },
  ];

  const bebidasItems = [
    {
      title: 'BEBIDAS',
      isHeader: true,
    },
    {
      title: 'CAFÉ :',
      isSubHeader: true,
    },
    {
      title: '***SIN LECHE',
      isUnder: true,
    },
    { title: 'ESPRESSO', price: '$60', isCoffee: true },
    { title: 'AMERICANO', price: '$75', isCoffee: true },
    { title: 'COLD BREW', price: '$80', isCoffee: true },
    { title: 'FILTRADOS', price: '*Sujeto al origen de grano*', isCoffee: true, isVariablePrice: true },
    {
      title: '***CON LECHE',
      isUnder: true,
    },
    { title: 'CAPUCCINO', price: '$80', isCoffee: true },
    { title: 'CORTADO', price: '$65', isCoffee: true },
    { title: 'FLAT WHITE', price: '$75', isCoffee: true },
    { title: 'LATTE', price: '$75', isCoffee: true },
    {
      title: '*Extra leche vegetal*', price: '+ $15', isExtra: true},
    { title: 'AFFOGATO', price: '$90', isCoffee: true },
    {
      title: 'ALTERNATIVAS :',
      isSubHeader: true,
    },
    { title: 'MATCHA CEREMONIAL', price: '$80' },
    {
      title: 'SMOOTHIE',
      price: '$75',
      description: 'Leche, plátano, dátil y shot de espresso.',
    },
    {
      title: 'JUGO BOMBIUX',
      price: '$60',
      description: 'Piña, naranja, fresa y limón.'
    },
    {
      title: 'DE ANTAÑO',
      price: '$60',
      description: 'Betabel y zanahoria.'
    },
    {
      title: 'REFRESCOS:',
      isSubHeader: true,
    },
    { title: 'COCA COLA', price: '$25' },
    { title: 'AGUA MINERAL', price: '$50'},
    {
      title: 'FOOTER',
      isFooter: true,
    },
  ];

  return (
    <div ref={containerRef} className='relative bg-white'>
      <div id="comida" className="flex md:pt-25 md:pl-5">
        <div className="text-black bg-white w-full ">
          {/* Img Mobile */}
          <div className="bg-[url(/src/assets/Pi-jei.jpg)] bg-cover bg-no-repeat bg-center h-70 md:hidden h-3/4 items-end text-xl md:text-4xl flex justify-around">
            <div className="absolute text-white bg-gradient-to-t w-screen from-white from-20% to-transparent md:hidden">.</div>
            <div>
              <p className="relative font-pesada">@arguende_</p>
            </div>
            <div>
              <p className="relative font-pesada">RITUAL HABITUAL</p>
            </div>
          </div>


          <div className="justify-between hidden md:flex text-4xl ">
            <div>
              <p className="md:pl-10 font-pesada">@arguende_</p>
            </div>
            <div>
              <p className="font-pesada">RITUAL HABITUAL</p>
            </div>
          </div>
          <div className="md:mx-10 mx-5">
            {comidaItems.map((item, index) => (
              <div
                key={index}
                className={`text-container ${item.isHeader ? 'md:py-10 pt-10 pb-5' : 'pb-5'}`}
              >
                {item.isHeader ? (
                  <p className="font-pesada text-6xl md:text-6xl">{item.title}</p>
                ) : (
                  <>
                    <div className="flex justify-between text-2xl md:text-3xl">
                      <p className="font-media">{item.title}</p>
                      <p className="font-pesada">{item.price}</p>
                    </div>
                    {item.description && (
                      <div className=" md:tracking-wider w-15/17 md:w-6/10">
                        <p className="text-sm md:text-xl">{item.description}</p>
                      </div>
                    )}
                    {item.extras && item.extras.map((extra, extraIndex) => (
                      <div
                        key={extraIndex}
                        className={`flex justify-end md:justify-end items-center`}
                      >
                        <p className={`font-media ${extra.isSmall ? 'text-sm mr-5' : 'md:mr-0 mr-5'}`}>
                          {extra.text}
                        </p>
                        <p className="font-pesada md:pl-10 text-xl md:text-2xl">
                          {extra.price}
                        </p>
                      </div>
                    ))}
                  </>
                )}
              </div >
            ))}
          </div>
        </div>
        <div className="sticky top-25  self-start md:flex hidden md:px-30">
          <img
            src={PiJeiImage}
            alt="Argüende Food"
            className="text-container object-contain shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)]  rounded-3xl"
          />
        </div>
      </div>
      <div id="bebidas" className="flex md:pt-25 md:ml-10">
        <div className="text-black bg-[#FCCDCD] w-full ">
        {/* Img Mobile */}
          <div className="bg-[url(/src/assets/LatteArguende.jpg)] bg-cover bg-no-repeat bg-[center_70%] h-70 md:hidden h-3/4 items-end text-xl md:text-4xl flex justify-around">
            <div className="absolute text-white bg-gradient-to-t w-screen from-[#FCCDCD] from-20% to-transparent md:hidden">.</div>
          </div>
          <div className="md:px-5 mx-5">
            <div className="justify-items-end">
             
            </div>
            {bebidasItems.map((item, index) => (
              <div
                key={index}
                className={`text-container ${item.isHeader ? 'pt-6' : item.isSubHeader ? 'pt-7 pb-5' : item.isFooter ? 'text-xl md:text-4xl my-10 text-white flex justify-between' : ''}`}
              >
                {item.isHeader ? (
                  <p className="font-pesada text-6xl  md:text-6xl">{item.title}</p>
                ) : item.isSubHeader ? (
                  <p className="font-pesada text-2xl md:text-3xl">{item.title}</p>
                ) : item.isFooter ? (
                  <>
                    <div>
                      <p className="font-pesada">@arguende_</p>
                    </div>
                    <div>
                      <p className="font-pesada">RITUAL HABITUAL</p>
                    </div>
                  </>
                ) : item.isUnder ? (
                  <>
                    <div>
                      <p className="font-italica my-3">{item.title}</p>
                    </div>
                  </>
                ) : item.isExtra ? (
                  <>
                    <div className="flex justify-end items-center">
                      <p className="font-negritas text-sm md:mr-0 mr-3">{item.title} </p>
                      <p className="font-pesada md:pl-10 text-xl md:text-2xl">{item.price}</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex justify-between text-2xl items-center md:text-3xl">
                      <p className={`font-media ${item.isCoffee  ? 'text-lg md:text-xl' : 'pt-2 text-lg md:text-xl'}`}>
                        {item.title}
                      </p>
                      <p className={`${item.isVariablePrice ? 'text-sm font-pesada' : 'font-pesada'}`}>
                        {item.price}
                      </p>
                    </div>
                    {item.description && (
                      <div className="text-sm md:text-xl ">
                        <p>{item.description}</p>
                      </div>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="sticky top-25 self-start md:flex hidden md:px-30 ">
          <img
            src={LatteArguendeImage}
            alt="Argüende Beverage"
            className="text-container object-contain shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)] rounded-3xl"
          />
        </div>
      </div>
    </div>
  );
}

export default App;