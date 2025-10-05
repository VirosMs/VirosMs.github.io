
import { useState } from "react";
import Logo from "./Logo";
import MenuDesktop from "./MenuDesktop";
import MenuMobile from "./MenuMobile";
import ThemeModeToggle from "./ThemeModeToggle";

interface HeaderProps {
    isDarkMode: boolean;
    toggleDarkMode: () => void;
}

const Header = ({ isDarkMode, toggleDarkMode }: HeaderProps) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen((prev) => !prev);
    }

    return (
        <header className="px-[4%] fixed top-0 left-0 w-full z-[1000] h-[100px]">
            <div className="flex justify-between items-center h-full">
                <Logo isDarkMode={isDarkMode} />
                <nav className="flex items-center gap-4">
                    <MenuDesktop />
                    <ThemeModeToggle isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
                    <a href="#contact" className="hidden lg:inline-block py-2 px-6 bg-mint-2 text-white font-bold rounded-full hover:bg-sea-green transition-all duration-300">Contacto</a>
                    <div className="lg:hidden">
                        <button onClick={toggleMenu}>
                            <i className="bi bi-list text-dark-green dark:text-light-green text-3xl"></i>
                        </button>
                    </div>
                    <MenuMobile isOpen={isMenuOpen} toggleMenu={toggleMenu} isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
                </nav>
            </div>
        </header>
    );
};

export default Header;
