import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/utils/classnames';
import { useTheme } from '@/hooks/useTheme';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  // Links públicos del navbar (Panel admin está oculto por seguridad)
  const navLinks = [
    { path: '/', label: 'Inicio', hash: '', id: 'hero' },
    { path: '/', label: 'Sobre mí', hash: '#about', id: 'about' },
    { path: '/', label: 'Especialidades', hash: '#specialties', id: 'specialties' },
    { path: '/', label: 'Tecnologías', hash: '#technologies', id: 'technologies' },
    { path: '/', label: 'Experiencia', hash: '#experience', id: 'experience' },
    { path: '/', label: 'Idiomas', hash: '#languages', id: 'languages' },
    { path: '/projects', label: 'Proyectos', hash: '', id: 'projects' },
    { path: '/', label: 'Contacto', hash: '#contact', id: 'contact' },
    // Panel admin está oculto - solo accesible si conoces la URL /panel-gestion
  ];

  // Scroll spy: detectar qué sección está visible
  useEffect(() => {
    if (location.pathname !== '/') {
      setActiveSection('');
      return;
    }

    const sections = navLinks
      .filter((link) => link.path === '/' && link.id)
      .map((link) => ({
        id: link.id,
        element: document.getElementById(link.id),
      }))
      .filter((section) => section.element !== null);

    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((section) => {
      if (section.element) {
        observer.observe(section.element);
      }
    });

    // Si estamos en el top de la página, activar "Inicio"
    const handleScroll = () => {
      if (window.scrollY < 100) {
        setActiveSection('hero');
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Verificar al montar

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [location.pathname]);

  const isActive = (path: string, hash: string, id: string): boolean => {
    // Si estamos en otra página que no sea home
    if (location.pathname !== '/' && path === '/') {
      return false;
    }
    if (location.pathname !== '/' && path !== '/') {
      return location.pathname.startsWith(path);
    }

    // Si estamos en home, usar scroll spy
    if (location.pathname === '/') {
      if (id === 'hero' && !hash) {
        return activeSection === 'hero' || activeSection === '';
      }
      if (hash) {
        return activeSection === id;
      }
      if (path === '/projects') {
        return false; // Proyectos está en otra página
      }
    }

    return false;
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string, hash: string, id: string) => {
    e.preventDefault();
    setIsOpen(false);

    // Si es "Inicio" sin hash, ir al top
    if (path === '/' && !hash && id === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      navigate('/');
      setActiveSection('hero');
      return;
    }

    // Si tiene hash y estamos en home, hacer scroll
    if (hash && location.pathname === '/') {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        window.history.pushState(null, '', hash);
        setActiveSection(id);
      }
    } else if (path !== '/') {
      // Navegar a otra página
      navigate(path);
    } else if (hash) {
      // Si estamos en otra página y queremos ir a una sección de home
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          window.history.pushState(null, '', hash);
          setActiveSection(id);
        }
      }, 100);
    }
  };

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate('/');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActiveSection('hero');
  };

  return (
    <nav className="bg-white dark:bg-secondary-900 shadow-sm sticky top-0 z-50 transition-colors duration-200">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" onClick={handleLogoClick} className="flex items-center space-x-2">
            <img
              src="/logo-light.png"
              alt="VirosMS Studio"
              className="h-10 w-auto dark:invert"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={`${link.path}${link.hash}`}
                to={`${link.path}${link.hash}`}
                onClick={(e) => handleLinkClick(e, link.path, link.hash, link.id)}
                className={cn(
                  'text-sm font-medium transition-colors duration-200 whitespace-nowrap',
                  isActive(link.path, link.hash, link.id)
                    ? 'text-primary-600 dark:text-primary-400 border-b-2 border-primary-600 dark:border-primary-400 pb-1'
                    : 'text-secondary-600 dark:text-secondary-300 hover:text-primary-600 dark:hover:text-primary-400'
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Theme Toggle & Mobile Menu Button */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-md text-secondary-600 dark:text-secondary-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-secondary-100 dark:hover:bg-secondary-800 transition-colors"
              aria-label={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
            >
              {theme === 'dark' ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
            <button
              className="md:hidden p-2 rounded-md text-secondary-600 dark:text-secondary-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-secondary-100 dark:hover:bg-secondary-800"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
              aria-expanded={isOpen}
            >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-2 animate-fade-in">
            {navLinks.map((link) => (
              <Link
                key={`${link.path}${link.hash}`}
                to={`${link.path}${link.hash}`}
                onClick={(e) => handleLinkClick(e, link.path, link.hash, link.id)}
                className={cn(
                  'block px-4 py-2 rounded-md text-base font-medium transition-colors duration-200',
                  isActive(link.path, link.hash, link.id)
                    ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20'
                    : 'text-secondary-600 dark:text-secondary-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-secondary-50 dark:hover:bg-secondary-800'
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
