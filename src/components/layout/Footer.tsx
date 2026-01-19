import { useState } from 'react';
import { Link } from 'react-router-dom';
import { contactInfo } from '@/data/profile';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [logoError, setLogoError] = useState(false);

  const footerLinks = {
    navegacion: [
      { path: '/', label: 'Inicio', hash: '' },
      { path: '/', label: 'Sobre mí', hash: '#about' },
      { path: '/', label: 'Especialidades', hash: '#specialties' },
      { path: '/', label: 'Tecnologías', hash: '#technologies' },
      { path: '/', label: 'Experiencia', hash: '#experience' },
      { path: '/', label: 'Idiomas', hash: '#languages' },
      { path: '/projects', label: 'Proyectos', hash: '' },
      { path: '/', label: 'Contacto', hash: '#contact' },
    ],
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string, hash: string) => {
    e.preventDefault();
    
    // Si es "Inicio" sin hash, ir al top
    if (path === '/' && !hash) {
      if (window.location.pathname !== '/') {
        window.location.href = '/';
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }

    // Si tiene hash, hacer scroll a la sección
    if (hash && path === '/') {
      if (window.location.pathname !== '/') {
        window.location.href = `/${hash}`;
      } else {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          window.history.pushState(null, '', hash);
        }
      }
    } else if (path !== '/') {
      // Navegar a otra página
      window.location.href = path;
    }
  };

  return (
    <footer className="bg-secondary-900 dark:bg-secondary-950 text-secondary-300 dark:text-secondary-400">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="mb-4">
              {!logoError ? (
                <img
                  src="/logo.png"
                  alt="VirosMS Studio"
                  className="h-12 w-auto"
                  onError={() => setLogoError(true)}
                />
              ) : (
                <h3 className="text-xl font-bold text-white">VirosMS Studio</h3>
              )}
            </div>
            <p className="text-sm text-secondary-400">
              Desarrollador backend especializado en microservicios y APIs REST. 
              Transformando ideas en soluciones escalables y robustas.
            </p>
          </div>

          {/* Navegación */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Navegación</h4>
            <ul className="space-y-2">
              {footerLinks.navegacion.map((link) => (
                <li key={`${link.path}${link.hash}`}>
                  <Link
                    to={`${link.path}${link.hash}`}
                    onClick={(e) => handleLinkClick(e, link.path, link.hash)}
                    className="text-sm hover:text-primary-400 transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Redes Sociales */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Redes Sociales</h4>
            <ul className="space-y-2">
              {contactInfo.linkedin && (
                <li>
                  <a
                    href={contactInfo.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm hover:text-primary-400 transition-colors duration-200"
                  >
                    LinkedIn
                  </a>
                </li>
              )}
              {contactInfo.github && (
                <li>
                  <a
                    href={contactInfo.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm hover:text-primary-400 transition-colors duration-200"
                  >
                    GitHub
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-secondary-800 text-center text-sm text-secondary-400">
          <p>&copy; {currentYear} VirosMS Studio. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
