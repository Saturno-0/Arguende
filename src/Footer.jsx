import './App.css'
import LinkedinImage from './assets/icon-linkedin.png';
import GithubImage from './assets/icon-github.png';

function Footer() {
    return (

        <div id="contacto" className="flex " >
            <div className='text-[#D0D0CE] bg-[#282828] md:flex md:justify-between md:pr-50'>
                <div className="md:mx-15 mx-5 mt-10">
                    <p className="font-pesada text-6xl md:text-6xl">CONTACTO</p>
                    <div className="pt-5 pb-10 text-2xl md:text-3xl ">
                        <p>contacto@arguende.mx</p>
                    </div>
                    <div className="py-5 text-2xl md:text-3xl w-9/11">
                        <p>Blvd. García de León 1360, Morelia, Mich.</p>
                    </div>
                    <div className="text-lg md:text-xl md:pb-20 w-9/11">
                        <p>Lunes a Sábado 8 am - 6 pm.</p>
                    </div>
                </div>
                <div>
                    <img
                        src="Tagline.png"
                        alt="Argüende Tagline"
                        className=" object-contain"
                    />
                    <div className="flex justify-self-end space-x-3 items-center text-lg md:text-xl">
                        <p>Coded with 🍳 by Rodrigo Salgado</p>
                        <img
                            src={LinkedinImage}
                            className="w-8 object-contain hover:opacity-75 transition-opacity"
                        />
                        <img
                            src={GithubImage}
                            className="w-9 object-contain hover:opacity-75 transition-opacity"
                        />
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Footer;
