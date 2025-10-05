
import React from 'react';

interface LogoProps {
  isDarkMode: boolean;
}

const Logo: React.FC<LogoProps> = ({ isDarkMode }) => {
  const logoSrc = isDarkMode ? 'images/1-dark.png' : 'images/2-light.png';
  return (
    <img src={logoSrc} alt="VirosMs" className="w-28 h-auto" />
  );
};

export default Logo;
