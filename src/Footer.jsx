import './App.css'
import LinkedinImage from './assets/icon-linkedin.png';
import GithubImage from './assets/icon-github.png';
import WhatsImage from './assets/icon-whatsapp-w.png';
import InstagramImage from './assets/icon-instagram-w.png';


function Footer() {
    return (

        <div id="contacto" className="relative" >
            <div className='text-[#D0D0CE] bg-[#282828] md:flex md:justify-between md:pr-50'>
                <div className="md:mx-15 mx-5 pt-10">
                    <p className="font-pesada text-6xl md:text-6xl">CONTACTO</p>
                    <div className="pb-2 text-2xl md:text-3xl ">
                        <p>arguende.ritual@gmail.com</p>
                    </div>
                    <div className='flex pb-15'>
                        <a href="https://www.instagram.com/arguende_/" target="_blank" className="hover:opacity-70 transition-opacity">
                            <img
                                src={InstagramImage}
                                className="w-9 px-1 object-contain hover:opacity-75 transition-opacity"
                            />
                        </a>
                        <a href="https://wa.me/523331780373" target="_blank" className="hover:opacity-70 transition-opacity">
                            <img
                                src={WhatsImage}
                                className=" w-9 px-1 object-contain hover:opacity-75 transition-opacity"
                            />
                        </a>
                    </div>
                    <div className=" text-2xl md:text-3xl w-9/11">
                        <p>Blvd. García de León 1360, Morelia, Mich.</p>
                    </div>
                    <div className="text-lg md:text-xl md:pb-20 md:pt-5 w-9/11">
                        <p>Lunes a Miércoles 8 am - 6 pm. </p>
                        <p>Jueves a Sábado 8 am - 8 pm. </p>
                        <p>Domingo Descansamos  </p>
                        
                    </div>
                </div>
                <div>
                    <img
                        src="Tagline.png"
                        alt="Argüende Tagline"
                        className=" object-contain"
                    />
                    <div className="flex justify-end space-x-3 items-center text-xs md:text-md">
                        <p>Coded by Rodrigo Salgado</p>
                        <a href="https://www.linkedin.com/in/rodrigo-salgado-torres-b35a8a200" target="_blank" className="hover:opacity-70 transition-opacity">
                        <img
                            src={LinkedinImage}
                            className="w-5 object-contain hover:opacity-75 transition-opacity"
                        />
                        </a>
                        
                        <a href="https://github.com/Saturno-0" target="_blank" className="hover:opacity-70 transition-opacity">
                        <img
                            src={GithubImage}
                            className="w-6 object-contain hover:opacity-75 transition-opacity"
                        />
                        </a>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Footer;
