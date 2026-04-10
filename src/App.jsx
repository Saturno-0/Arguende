import './App.css';
import { useEffect, useRef, useState } from 'react';
import MuffinHuevoImage from './assets/Muffin-de-huevo.jpg';
import LatteArguendeImage from './assets/LatteArguende.jpg';
import { supabase } from './lib/supabase';

function App() {
  const containerRef = useRef(null);
  const [comidaItems, setComidaItems] = useState([]);
  const [bebidasItems, setBebidasItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMenu() {
      const { data: items, error } = await supabase
        .from('menu_items')
        .select('*, menu_extras(*)')
        .eq('activo', true)
        .order('orden');

      if (error) {
        console.error('Error cargando menu:', error);
        setLoading(false);
        return;
      }

      const mapItem = (item) => ({
        title: item.titulo,
        price: item.precio,
        description: item.descripcion,
        isHeader: item.tipo === 'header',
        isSubHeader: item.tipo === 'subheader',
        isUnder: item.tipo === 'under',
        isExtra: item.tipo === 'extra',
        isFooter: item.tipo === 'footer',
        isCoffee: item.is_coffee,
        isVariablePrice: item.is_variable_price,
        extras: item.menu_extras
          ?.sort((a, b) => a.orden - b.orden)
          .map((e) => ({ text: e.texto, price: e.precio, isSmall: e.is_small })),
      });

      const comida = items.filter((i) => i.categoria === 'comida').map(mapItem);
      const bebida = items.filter((i) => i.categoria === 'bebida').map(mapItem);

      // Agregar footer de bebidas al final
      bebida.push({ title: 'FOOTER', isFooter: true });

      setComidaItems(comida);
      setBebidasItems(bebida);
      setLoading(false);
    }

    fetchMenu();
  }, []);

  useEffect(() => {
    if (loading) return;

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
  }, [loading]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="font-pesada text-2xl">Cargando menú...</p>
      </div>
    );
  }

  return (
    <div ref={containerRef} className='relative bg-white'>
      <div id="comida" className="flex md:pt-25 md:ml-10">
        <div className="text-black w-full ">
          {/* Img Mobile */}
          <div className="bg-[url(/src/assets/Muffin-de-huevo.jpg)] bg-cover bg-no-repeat bg-center h-70 md:hidden h-3/4 items-end text-xl md:text-4xl flex justify-around">
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
          <div className=" md:mx-10 mx-5 relative z-0">
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
                      <div className=" md:tracking-wider w-11/17 md:w-6/10">
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
              </div>
            ))}
          </div>
        </div>
        <div className="sticky top-25 md:w-2/3 self-start md:flex hidden md:px-30">
          <img
            src={MuffinHuevoImage}
            alt="Argüende Food"
            className=" shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)] rounded-3xl"
          />
        </div>
      </div>
      <div id="bebidas" className="flex md:pt-25 md:ml-10">
        <div className="text-black bg-[#FCCDCD] w-full ">
        {/* Img Mobile */}
          <div className="bg-[url(/src/assets/LatteArguende.jpg)] bg-cover bg-no-repeat bg-[center_70%] h-70 md:hidden h-3/4 items-end text-xl md:text-4xl flex justify-around relative z-10">
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
                      <div className="text-sm md:text-xl md:w-7/8">
                        <p>{item.description}</p>
                      </div>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="sticky top-25 md:w-2/3 self-start md:flex hidden md:px-30 ">
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
