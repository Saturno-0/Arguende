import { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { supabase } from './lib/supabase';
import './App.css';
import MuffinHuevoImage from './assets/Muffin-de-huevo.jpg';
import LatteArguendeImage from './assets/LatteArguende.jpg';

/* ---------- Tabs sticky para mobile/tablet ---------- */
const TABS = [
  { id: 'comida',  label: 'Comida',  bg: '#18181b', textCls: 'text-white' },
  { id: 'bebidas', label: 'Bebidas', bg: '#e8b5b5', textCls: 'text-zinc-900' },
];

function MenuTabs() {
  const [active, setActive] = useState('comida');
  const reduce = useReducedMotion();

  useEffect(() => {
    let current = 'comida';
    const update = () => {
      const bebidas = document.getElementById('bebidas');
      if (!bebidas) return;
      const next = bebidas.getBoundingClientRect().top < 300 ? 'bebidas' : 'comida';
      if (next !== current) { current = next; setActive(next); }
    };
    window.addEventListener('scroll', update, { passive: true });
    update();
    return () => window.removeEventListener('scroll', update);
  }, []);

  return (
    <div className="sticky top-16 md:top-[85px] z-30 lg:hidden bg-white/95 backdrop-blur-sm border-b border-zinc-100 px-5 py-2">
      <div className="relative flex bg-zinc-100 rounded-full p-1">
        {TABS.map((tab) => (
          <a
            key={tab.id}
            href={`#${tab.id}`}
            className="relative flex-1 py-1.5 text-[13px] font-medium text-center z-10"
          >
            {active === tab.id && (
              <motion.span
                layoutId="tab-bubble"
                className="absolute inset-0 rounded-full"
                style={{ backgroundColor: tab.bg }}
                transition={
                  reduce
                    ? { duration: 0 }
                    : { type: 'spring', stiffness: 300, damping: 22 }
                }
              />
            )}
            <span className={`relative z-10 transition-colors duration-200 ${
              active === tab.id ? tab.textCls : 'text-zinc-400'
            }`}>
              {tab.label}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}

/* ---------- Item de menú ---------- */
function MenuItem({ item, reduce }) {
  if (item.isHeader) return null;

  return (
    <motion.div
      className="pb-5"
      initial={reduce ? false : { opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
    >
      {item.isSubHeader ? (
        <p className="font-pesada text-2xl md:text-3xl pt-4 pb-1">{item.title}</p>
      ) : item.isUnder ? (
        <p className="font-italica text-sm my-2 opacity-60">{item.title}</p>
      ) : item.isFooter ? (
        <div className="text-xl md:text-3xl my-10 text-white flex justify-between">
          <p className="font-pesada">@arguende_</p>
          <p className="font-pesada">RITUAL HABITUAL</p>
        </div>
      ) : item.isExtra ? (
        <div className="flex justify-end items-center gap-6">
          <p className="font-negritas text-sm">{item.title}</p>
          <p className="font-pesada text-xl md:text-2xl">{item.price}</p>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-baseline gap-4">
            <p className={`font-media ${item.isCoffee ? 'text-base md:text-xl' : 'text-xl md:text-2xl'}`}>
              {item.title}
            </p>
            <p className={`font-pesada shrink-0 ${item.isVariablePrice ? 'text-xs' : 'text-xl md:text-2xl'}`}>
              {item.price}
            </p>
          </div>
          {item.description && (
            <p className="text-sm md:text-base leading-snug mt-1 opacity-70 max-w-[60ch]">
              {item.description}
            </p>
          )}
          {item.extras?.map((extra, i) => (
            <div key={i} className="flex justify-end items-center gap-4 mt-1">
              <p className={`font-media ${extra.isSmall ? 'text-xs' : 'text-sm'} opacity-60`}>
                {extra.text}
              </p>
              <p className="font-pesada text-lg md:text-xl">{extra.price}</p>
            </div>
          ))}
        </>
      )}
    </motion.div>
  );
}

/* ---------- Skeleton de carga ---------- */
function MenuSkeleton() {
  return (
    <div className="px-5 sm:px-7 md:px-8 lg:px-10 pb-10 animate-pulse">
      <div className="h-14 w-48 bg-zinc-200 rounded-lg mt-7 mb-6" />
      {[...Array(6)].map((_, i) => (
        <div key={i} className="pb-5">
          <div className="flex justify-between mb-2">
            <div className="h-5 bg-zinc-100 rounded w-2/5" />
            <div className="h-5 bg-zinc-100 rounded w-12" />
          </div>
          <div className="h-4 bg-zinc-100 rounded w-3/4" />
        </div>
      ))}
    </div>
  );
}

/* ---------- App principal ---------- */
function App() {
  const reduce = useReducedMotion();
  const [comidaItems, setComidaItems] = useState([]);
  const [bebidasItems, setBebidasItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMenu() {
      const { data, error } = await supabase
        .from('menu_items')
        .select('*, menu_extras(*)')
        .eq('activo', true)
        .order('orden');

      if (error) {
        console.error('Error cargando menú:', error);
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

      const comida = data.filter((i) => i.categoria === 'comida').map(mapItem);
      const bebida = data.filter((i) => i.categoria === 'bebida').map(mapItem);
      bebida.push({ title: 'FOOTER', isFooter: true });

      setComidaItems(comida);
      setBebidasItems(bebida);
      setLoading(false);
    }

    fetchMenu();
  }, []);

  return (
    <div className="relative bg-white">
      <MenuTabs />

      {/* ===== COMIDA ===== */}
      <section id="comida" className="scroll-mt-[116px] md:scroll-mt-[137px] lg:scroll-mt-[85px] lg:flex lg:items-start">

        {/* Columna menú */}
        <div className="text-zinc-900 w-full lg:flex-1 min-w-0">

          {/* Hero image — mobile y tablet */}
          <div className="lg:hidden relative h-60 sm:h-72 md:h-80 overflow-hidden">
            <img
              src={MuffinHuevoImage}
              alt="Argüende comida"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white/70 to-transparent" />
            <div className="absolute bottom-4 left-5 right-5 flex justify-between">
              <p className="font-pesada text-zinc-800 text-lg">@arguende_</p>
              <p className="font-pesada text-zinc-800 text-lg">RITUAL HABITUAL</p>
            </div>
          </div>

          {/* Tagline desktop */}
          <div className="hidden lg:flex justify-between items-baseline px-10 pt-24 pb-0 text-3xl xl:text-4xl">
            <p className="font-pesada">@arguende_</p>
            <p className="font-pesada">RITUAL HABITUAL</p>
          </div>

          {/* Items */}
          {loading ? <MenuSkeleton /> : (
            <div className="px-5 sm:px-7 md:px-8 lg:px-10 pb-10">
              <motion.p
                className="font-pesada text-5xl md:text-6xl pt-7 pb-6 lg:pt-5"
                initial={reduce ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                COMIDA
              </motion.p>
              {comidaItems
                .filter((item) => !item.isHeader)
                .map((item, i) => (
                  <MenuItem key={i} item={item} reduce={reduce} />
                ))}
            </div>
          )}
        </div>

        {/* Imagen sticky — solo desktop */}
        <div className="hidden lg:block sticky top-[85px] w-[33%] shrink-0 self-start px-6 xl:px-10 py-10">
          <img
            src={MuffinHuevoImage}
            alt="Argüende comida"
            className="w-full max-h-[calc(100vh-85px-5rem)] object-cover rounded-3xl shadow-[0_4px_24px_rgba(0,0,0,0.08),_0_16px_48px_rgba(0,0,0,0.06)]"
          />
        </div>
      </section>

      {/* ===== BEBIDAS ===== */}
      <section id="bebidas" className="scroll-mt-[116px] md:scroll-mt-[137px] lg:scroll-mt-[85px] lg:flex lg:items-start bg-[#FCCDCD]">

        {/* Columna menú */}
        <div className="text-zinc-900 w-full lg:flex-1 min-w-0">

          {/* Hero image — mobile y tablet */}
          <div className="lg:hidden relative h-60 sm:h-72 md:h-80 overflow-hidden">
            <img
              src={LatteArguendeImage}
              alt="Argüende bebidas"
              className="w-full h-full object-cover object-[center_70%]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#FCCDCD]/75 to-transparent" />
          </div>

          {/* Items */}
          {loading ? <MenuSkeleton /> : (
            <div className="px-5 sm:px-7 md:px-8 lg:px-10 pb-10 lg:pt-24">
              <motion.p
                className="font-pesada text-5xl md:text-6xl pt-7 pb-6 lg:pt-5"
                initial={reduce ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                BEBIDAS
              </motion.p>
              {bebidasItems
                .filter((item) => !item.isHeader)
                .map((item, i) => (
                  <MenuItem key={i} item={item} reduce={reduce} />
                ))}
            </div>
          )}
        </div>

        {/* Imagen sticky — solo desktop */}
        <div className="hidden lg:block sticky top-[85px] w-[33%] shrink-0 self-start px-6 xl:px-10 py-10">
          <img
            src={LatteArguendeImage}
            alt="Argüende bebidas"
            className="w-full max-h-[calc(100vh-85px-5rem)] object-cover object-[center_70%] rounded-3xl shadow-[0_4px_24px_rgba(0,0,0,0.08),_0_16px_48px_rgba(0,0,0,0.06)]"
          />
        </div>
      </section>
    </div>
  );
}

export default App;
