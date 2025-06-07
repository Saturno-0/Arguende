import './app.css';

function Navbar() {
    return (
        <nav className="fixed flex justify-between items-center h-25 w-full z-50 px-4 py-7 bg-gradient-to-b from-white to-transparent ">
            <div className="md:hidden">
                <button className="text-gray-800">
                </button>
            </div>
            <div className="hidden md:flex  md:space-x-10">
                <a href="#comida" className="hover:opacity-70 transition-opacity">
                    <span className="text-gray-800 font-light md:text-3xl">
                        Comida
                    </span>
                </a>
                <span className="text-gray-800 font-light md:text-3xl">
                    Bebidas
                </span>
                <span className="text-gray-800 font-light md:text-3xl">
                    Contacto
                </span>
            </div>

            <div className="absolute left-1/2 -translate-x-1/2">
                <a href="#landing" className="hover:opacity-70 transition-opacity">
                <img
                    src="public/logo.png"
                    alt="Argüende"
                    className="object-contain md:w-[18vw]"
                />
                </a>
            </div>

            <div className=" flex space-x-7 md:space-x-50 md:mr-10">
                <img
                    src="src/assets/icon-instagram.png"
                    className="w-6 md:w-9 object-contain hover:opacity-75 transition-opacity"
                />
                <img
                    src="src/assets/icon-uber.png"
                    className="w-6 md:w-9 object-contain hover:opacity-75 transition-opacity"
                />
            </div>
        </nav>
    );
}

export default Navbar;