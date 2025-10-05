import ThemeModeToggle from "./ThemeModeToggle";

interface MenuMobileProps {
  isOpen: boolean;
  toggleMenu: () => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const MenuMobile = ({ isOpen, toggleMenu, isDarkMode, toggleDarkMode }: MenuMobileProps) => {
  return (
    <div className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-60 z-[1001] ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"} transition-all duration-300`}>
        <div className={`w-[70%] h-full bg-black absolute top-0 right-0 ${isOpen ? "right-0" : "-right-full"} transition-all duration-300`}>
            <div className="flex justify-between items-center p-5">
                <div className="cursor-pointer" onClick={toggleMenu}>
                    <i className="bi bi-x-lg text-white text-2xl"></i>
                </div>
                <ThemeModeToggle isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
            </div>
            <nav className="mt-8">
                <ul className="flex flex-col gap-4">
                    <li><a href="#top-of-site" onClick={toggleMenu} className="block text-white text-lg font-medium p-4 hover:bg-mint-2 transition-all duration-300">Inicio</a></li>
                    <li><a href="#specialities" onClick={toggleMenu} className="block text-white text-lg font-medium p-4 hover:bg-mint-2 transition-all duration-300">Especialidades</a></li>
                    <li><a href="#about" onClick={toggleMenu} className="block text-white text-lg font-medium p-4 hover:bg-mint-2 transition-all duration-300">Sobre</a></li>
                    <li><a href="#portfolio" onClick={toggleMenu} className="block text-white text-lg font-medium p-4 hover:bg-mint-2 transition-all duration-300">Proyectos</a></li>
                    <li><a href="#contact" onClick={toggleMenu} className="block text-white text-lg font-medium p-4 hover:bg-mint-2 transition-all duration-300">Contacto</a></li>
                </ul>
            </nav>
      </div>
    </div>
  );
};

export default MenuMobile;
