
import React from 'react';
import Logo from '../Header/Logo';
import './Footer.css';

interface FooterProps {
  isDarkMode: boolean;
}

const Footer: React.FC<FooterProps> = ({ isDarkMode }) => {
  return (
    <footer>
      <div className="interface">
        <div className="line-footer">
          <div className="flex">
            <div className="logo-footer">
              <a href="#">
                <Logo isDarkMode={isDarkMode} />
              </a>
            </div>
            <div className="btn-social">
              <a href="https://github.com/VirosMs"><button><i className="bi bi-github"></i></button></a>
              <a href="https://www.linkedin.com/in/charlesarrudasantos-vms092"><button><i className="bi bi-linkedin"></i></button></a>
            </div>
          </div>
        </div>
        <div className="line-footer borde">
          <p><i className="bi bi-envelope-fill"></i> <a href="mailto:contact@virosms.com">contact@virosms.com</a></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
