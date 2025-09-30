
import React, { useState } from 'react';
import Logo from './Logo';
import MenuDesktop from './MenuDesktop';
import ThemeModeToggle from './ThemeModeToggle';
import MenuMobile from './MenuMobile';

interface HeaderProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const Header: React.FC<HeaderProps> = ({ isDarkMode, toggleDarkMode }) => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="v-header">
      <header>
        <div className="interface">
          <div className="logo">
            <a href="#">
              <Logo isDarkMode={isDarkMode} />
            </a>
          </div>
          <MenuDesktop />
          <div className="theme-mode-desktop">
            <ThemeModeToggle isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
          </div>
          <div className="btn-contact">
            <a href="#contact">
              <button>Contacto</button>
            </a>
          </div>
          <div className="btn-open-menu" id="btn-menu" onClick={toggleMobileMenu}>
            <i className="bi bi-list"></i>
          </div>
          <MenuMobile isOpen={isMobileMenuOpen} toggleMenu={toggleMobileMenu} isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
          {isMobileMenuOpen && <div className="overlay-menu" onClick={toggleMobileMenu}></div>}
        </div>
      </header>
    </div>
  );
};

export default Header;
