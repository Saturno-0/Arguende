import './app.css'

function Footer() {
    return (
        <div>
            <div id="contacto" class="flex " >
                <div class='text-[#D0D0CE] bg-[#282828] md:flex md:justify-between md:pr-50'>
                    <div class="md:mx-15 mx-5 mt-10">
                        <p class="font-pesada text-6xl md:text-6xl">CONTACTO</p>
                        <div class="pt-5 pb-10 text-2xl md:text-3xl ">
                            <p>contacto@arguende.mx</p>
                        </div>
                        <div class="py-5 text-2xl md:text-3xl w-9/11">
                            <p>Blvd. García de León 1360, Morelia, Mich.</p>
                        </div>
                        <div class="text-lg md:text-xl md:pb-20 w-9/11">
                            <p>Lunes a Sábado 8 am - 6 pm.</p>
                        </div>
                    </div>
                    <div class="">
                        <img
                            src="src/assets/Tagline.png"
                            alt="Argüende Tagline"
                            class=" object-contain"
                        />
                        <div class="flex justify-self-end space-x-3 items-center text-lg md:text-xl">
                            <p>Coded with 🍳 by Rodrigo Salgado</p>
                            <img
                                src="src/assets/icon-linkedin.png"
                                className="w-3 md:w-6 object-contain hover:opacity-75 transition-opacity"
                            />
                            <img
                                src="src/assets/icon-github.png"
                                className="w-6 md:w-6 object-contain hover:opacity-75 transition-opacity"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;
