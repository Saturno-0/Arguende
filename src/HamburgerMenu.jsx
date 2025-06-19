import React, { useState } from 'react';
import './App.css'

const HamburgerMenu = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative z-50 select-none ">
            <input
                type="checkbox"
                id="menuCheckbox"
                className="absolute -top-2 -left-1 w-10 h-8 cursor-pointer opacity-0 z-20"
                checked={isOpen}
                onChange={() => setIsOpen(!isOpen)}
            />
            <div className="space-y-1.5 relative z-10">
                <span
                    className={`block w-8 h-1 rounded bg-gray-800 transition-all duration-500 ease-in-out ${
                        isOpen ? 'rotate-45 translate-y-2 bg-gray-800' : ''
                    }`}
                ></span>
                <span
                    className={`block w-8 h-1 rounded bg-gray-800 transition-all duration-500 ease-in-out ${
                        isOpen ? 'opacity-0' : ''
                    }`}
                ></span>
                <span
                    className={`block w-8 h-1 rounded bg-gray-800 transition-all duration-500 ease-in-out ${
                        isOpen ? '-rotate-45 -translate-y-2 bg-gray-800' : ''
                    }`}
                ></span>
            </div>
            <ul
                className={`absolute w-full h-screen -top-10 -left-4 pt-10 pb-5 justify-items-center overflow-y-auto bg-white list-none antialiased transform transition-transform duration-600 ease-in-out ${
                    isOpen ? 'translate-x-0 w-screen' : '-translate-x-full w-screen'
                }`}
            >
                <li className="py-2 text-3xl">
                    <a href="#comida" onClick={() => setIsOpen(false)}>
                        <label  className=" text-gray-800 font-media transition-opacity font-light">
                            Comida
                        </label>
                    </a>
                </li>
                <li className="py-2 text-3xl">
                    <a href="#bebidas" onClick={() => setIsOpen(false)}>
                        <label className="text-gray-800 font-media  transition-opacity font-light">
                            Bebidas
                        </label>
                    </a>
                </li>
                <li className="py-2 text-3xl">
                    <a href="#contacto" onClick={() => setIsOpen(false)}>
                        <label className=" text-gray-800 font-media  transition-opacity font-light">
                            Contacto
                        </label>
                    </a>
                </li>
                <li className="py-2 text-3xl">
                    <a
                        onClick={() => setIsOpen(false)}
                        href="https://www.instagram.com/arguende_/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-800 font-media hover:opacity-70 transition-opacity font-light"
                    >
                        Instagram
                    </a>
                </li>
            </ul>
        </div>
    );
}

export default HamburgerMenu;