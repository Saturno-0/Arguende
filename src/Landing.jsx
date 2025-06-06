import './app.css';
import { useEffect, useRef } from 'react';

function Landing() {

    const imgRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            if (imgRef.current) {   
                const scrolled = window.pageXOffset
                const speed = 0.5; // Adjust speed as needed
                imgRef.current.style.transform = `translateY(${scrolled * speed}px)`;
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);


    return (
        <div className="flex">
            <div className="md:w-2/3 relative overflow-hidden">
                <img
                    ref={imgRef}
                    className="contrast-120 brightness-80 h-screen w-screen object-cover"
                    src="src/assets/FacadeArguende.jpg"
                    alt="Fachada"
                />
                <div className="hidden md:flex absolute inset-0 bg-gradient-to-r from-transparent from-97% to-[#282828]"></div>
            </div>
            <div className="hidden md:flex w-1/3 bg-[#282828] items-end py-12 px-12">
                <p className="font-medium text-xl">Argüende no se limita a ser una cafetería; <br />
                    es un espacio diseñado para capturar la <br />
                    esencia del ritual diario, destacando la <br />
                    simplicidad y autenticidad en cada taza. <br /> <br />

                    Este proyecto es simplemente nuestra <br />
                    manera de compartir lo que nos gusta: <br />
                    hacer buen café y disfrutarlo.</p>
            </div>
            <div className="absolute bottom-0 md:hidden flex place-items-end py-5 justify-center h-1/2 w-full">
                <p className="text-base tracking-wider ">Argüende no se limita a ser una  <br />
                    cafetería; es un espacio diseñado  <br />
                    para capturar la esencia del ritual <br />
                    diario, destacando la simplicidad  <br /> 
                    y autenticidad en cada taza.<br />
                    Este proyecto es simplemente  <br />
                    nuestra manera de compartir lo  <br />
                    que nos gusta: hacer buen café y <br />
                     disfrutarlo.</p>
            </div>
            
        </div>
        

    );
}

export default Landing;