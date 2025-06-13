import './app.css'

function Landing() {

    return (

        <div id="landing" className="flex h-screen md:w-screen bg-[url(/src/assets/FacadeArguende.jpg)] md:bg-size-[70%] bg-fixed bg-cover md:bg-position-[left_40%] bg-center md:justify-end bg-no-repeat">
            <div className="hidden md:flex bg-gradient-to-r from-transparent from-60% to-[#282828] w-10"></div>

            <div className="bg-black/30 absolute text-xl md:relative mb-10 md:mb-0 md:items-end bottom-0 md:flex  md:bg-[#282828] md:p-15  md:w-1/3 pb-5 px-5">
                <p className='md:font-pesada font-media'>Argüende no se limita a ser una 
                    cafetería; es un espacio diseñado 
                    para capturar la esencia del ritual 
                    diario, destacando la simplicidad  
                    y autenticidad en cada taza.
                    <br /> 
                    <br />
                    Este proyecto es simplemente  
                    nuestra manera de compartir lo  
                    que nos gusta: hacer buen café y 
                    disfrutarlo.</p>
            </div>
        </div>
    );
}

export default Landing;