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
      price: '$110',
      description: 'Tostado con durazno asado, burrata, verdolaga y miel infusionada con habanero.',
      extras: [
        { text: '¡Hazlo salado! Añade jamon serrano', price: '+ $15' },
      ],
    },
    {
      title: 'EL SAPICHU',
      price: '$90',
      description: 'Medallón de atún sellado, marinado con limón amarillo y aceite de oliva, montado en tortilla de maíz azul. Cebollita encurtida con limón, serrano y piña.',
      extras: [
        { text: '-Añade queso', price: '+ $15' },
      ],
    },
    {
      title: 'ECHANDO TAQUETE',
      price: '$80',
      description: 'Taco veggie estilo ensenada, preparado con setas, ensalada de col morada y zanahoria con un toque de cebollita encurtida con limón y serrano.',
      extras: [
        { text: '-Añade queso', price: '+ $15' },
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
    { title: 'ESPRESSO', price: '$55', isCoffee: true },
    { title: 'CORTADO', price: '$60', isCoffee: true },
    { title: 'AMERICANO', price: '$65', isCoffee: true },
    { title: 'CAPUCCINO', price: '$70', isCoffee: true },
    { title: 'FLAT WHITE', price: '$65', isCoffee: true },
    { title: 'LATTE', price: '$65', isCoffee: true },
    { title: 'FILTRADOS', price: '*Sujeto al origen de grano*', isCoffee: true, isVariablePrice: true },
    {
      title: 'ALTERNATIVAS :',
      isSubHeader: true,
    },
    { title: 'MATCHA CEREMONIAL', price: '$65' },
    {
      title: 'SMOOTHIE',
      price: '$65',
      description: 'Leche, plátano, dátil y shot de espresso.',
      
    },
    {
      title: 'JUGO BOMBIUX',
      price: '$60',
      description: 'Piña, naranja, fresa y limón.'
    },
    {
      title: 'DE ANTAÑO',
      price: '$55',
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
        <div className="text-black bg-white w-full md:w-3/4">
          {/* Img Mobile */}
          <div className="bg-[url(/src/assets/Pi-jei.jpg)] bg-cover bg-no-repeat bg-center h-70 md:hidden h-3/4 items-end text-xl md:text-4xl flex justify-around">
            <div className="absolute text-white bg-gradient-to-t w-screen from-white from-20% to-transparent md:hidden">.</div>
            <div>
              <p className="relative font-pesada">@Arguende_</p>
            </div>
            <div>
              <p className="relative font-pesada">RITUAL HABITUAL</p>
            </div>
          </div>


          <div className="justify-between hidden md:flex text-4xl md:pb-10">
            <div>
              <p className="md:pl-10 font-pesada">@Arguende_</p>
            </div>
            <div>
              <p className="font-pesada">RITUAL HABITUAL</p>
            </div>
          </div>
          <div className="md:mx-10 mx-5">
            {comidaItems.map((item, index) => (
              <div
                key={index}
                className={`text-container ${item.isHeader ? 'pt-10' : 'py-5'}`}
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
                      <div className="text-lg md:text-xl md:tracking-wider w-8/10 md:w-6/10">
                        <p className="">{item.description}</p>
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
              </div>
            ))}
          </div>
        </div>
        <div className="sticky top-20 self-start md:flex hidden md:px-40">
          <img
            src={PiJeiImage}
            alt="Argüende Food"
            className="object-contain"
          />
        </div>
      </div>
      <div id="bebidas" className="flex md:pt-25 md:ml-10">
        <div className="text-black bg-[#FCCDCD] w-full md:w-3/4">
        {/* Img Mobile */}
          <div className="bg-[url(/src/assets/LatteArguende.jpg)] bg-cover bg-no-repeat bg-[center_70%] h-70 md:hidden h-3/4 items-end text-xl md:text-4xl flex justify-around">
            <div className="absolute text-white bg-gradient-to-t w-screen from-[#FCCDCD] from-20% to-transparent md:hidden">.</div>
          </div>
          <div className="md:px-5 mx-5">
            <div className="justify-items-end">
              <p className="md:text-lg consola my-5">No. 00001</p>
            </div>
            {bebidasItems.map((item, index) => (
              <div
                key={index}
                className={`text-container ${item.isHeader || item.isSubHeader ? 'py-5' : item.isFooter ? 'text-xl md:text-4xl my-10 mt-10 text-white flex justify-between' : ''}`}
              >
                {item.isHeader ? (
                  <p className="font-pesada text-6xl md:text-6xl">{item.title}</p>
                ) : item.isSubHeader ? (
                  <p className="font-pesada text-2xl md:text-3xl">{item.title}</p>
                ) : item.isFooter ? (
                  <>
                    <div>
                      <p className="font-pesada">@Arguende_</p>
                    </div>
                    <div>
                      <p className="font-pesada">RITUAL HABITUAL</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex justify-between text-2xl items-center md:text-3xl">
                      <p className={`font-media ${item.isCoffee  ? 'text-lg md:text-xl' : 'text-lg md:text-xl pt-4'}`}>
                        {item.title}
                      </p>
                      <p className={`${item.isVariablePrice ? 'text-lg' : 'font-pesada'}`}>
                        {item.price}
                      </p>
                    </div>
                    {item.description && (
                      <div className="text-lg md:text-xl py-0 md:w-6/10 w-8/10">
                        <p>{item.description}</p>
                      </div>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="sticky top-20 self-start md:flex hidden md:px-40">
          <img
            src={LatteArguendeImage}
            alt="Argüende Beverage"
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
}

export default App;