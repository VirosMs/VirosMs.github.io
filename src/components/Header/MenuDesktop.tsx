
const MenuDesktop = () => {
  return (
    <nav className="hidden lg:flex items-center">
      <ul className="flex gap-8">
        <li><a href="#top-of-site" className="text-dark-green dark:text-light-green text-lg font-medium hover:text-mint-2 transition-all duration-300">Inicio</a></li>
        <li><a href="#specialities" className="text-dark-green dark:text-light-green text-lg font-medium hover:text-mint-2 transition-all duration-300">Especialidades</a></li>
        <li><a href="#about" className="text-dark-green dark:text-light-green text-lg font-medium hover:text-mint-2 transition-all duration-300">Sobre</a></li>
        <li><a href="#portfolio" className="text-dark-green dark:text-light-green text-lg font-medium hover:text-mint-2 transition-all duration-300">Proyectos</a></li>
      </ul>
    </nav>
  );
};

export default MenuDesktop;
