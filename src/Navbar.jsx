import './app.css';

function Navbar() {
    return (

        <nav className="fixed flex justify-between items-center h-25 md:h-30 w-full z-50 px-10 md:px-8 md:py-7 bg-gradient-to-b from-white to-transparent from-1%">

            <div className="md:hidden">
                <button className="text-gray-800">
                </button>
            </div>

            <div className="hidden md:flex md:space-x-10">
                <span className="text-gray-800 font-light md:text-3xl">
                    Alimentos
                </span>
                <span className="text-gray-800 font-light md:text-3xl">
                    Bebidas
                </span>
                <span className="text-gray-800 font-light md:text-3xl">
                    Contacto
                </span>
            </div>

            <div className="absolute left-1/2 -translate-x-1/2">
                <img
                    src="public/logo.png"
                    alt="Argüende"
                    className="h-12 object-contain md:h-23"
                />
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