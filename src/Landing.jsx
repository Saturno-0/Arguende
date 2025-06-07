import './app.css';

function Landing() {

    return (

        <div style={{
            backgroundSize: '190%' // Zoom al 110%
        }}
            id="landing" className=" h-screen md:flex justify-end bg-[url(/src/assets/FacadeArguende.jpg)] bg-fixed bg-contain bg-bottom md:bg-center bg-no-repeat">
            <div className=" hidden md:flex bg-gradient-to-r from-transparent from-60% to-[#282828] w-10"></div>

            <div className="absolute md:relative bottom-0 md:flex md:bg-[#282828] py-5 md:items-end md:w-1/3 w-9/10">
                <p className=" md:text-xl">Argüende no se limita a ser una 
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