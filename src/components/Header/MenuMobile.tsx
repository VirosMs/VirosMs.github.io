
import React from 'react';
import ThemeModeToggle from './ThemeModeToggle';

interface MenuMobileProps {
  isOpen: boolean;
  toggleMenu: () => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const MenuMobile: React.FC<MenuMobileProps> = ({ isOpen, toggleMenu, isDarkMode, toggleDarkMode }) => {
  return (
    <div className={`menu-mobile ${isOpen ? 'open-menu' : ''}`}>
      <div className="top-section-menu-mobile">
        <div className="btn-close" onClick={toggleMenu}>
          <i className="bi bi-x-lg"></i>
        </div>
        <div className="theme-mode-mobile">
          <ThemeModeToggle isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
        </div>
      </div>
      <nav>
        <ul>
          <li><a href="#top-of-site" onClick={toggleMenu}>Inicio</a></li>
          <li><a href="#specialities" onClick={toggleMenu}>Especialidades</a></li>
          <li><a href="#about" onClick={toggleMenu}>Sobre</a></li>
          <li><a href="#portfolio" onClick={toggleMenu}>Proyectos</a></li>
          <li><a href="#contact" onClick={toggleMenu}>Contacto</a></li>
        </ul>
      </nav>
    </div>
  );
};

export default MenuMobile;
