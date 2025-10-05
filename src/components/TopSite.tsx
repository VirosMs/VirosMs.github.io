
const TopSite = () => {
  return (
    <section className="pt-[100px] h-[calc(100vh-100px)] px-[4%] lg:flex items-center gap-[60px] p-5 sm:px-[8%] lg:py-0">
      <div className="flex flex-col lg:flex-row items-center gap-5 lg:gap-[60px]">
        <div className="flex-1">
          <h1 className="text-[50px] leading-[55px] font-bold text-dark-green dark:text-light-green">
            Mi Viaje como Backend Developer y Aspirante a Full Stack.
          </h1>
          <p className="text-[20px] my-5 text-dark-green dark:text-light-green">
            Soy un desarrollador backend especializado en microservicios y API Rest, con experiencia en Android y Flutter. Actualmente, estoy aprendiendo frontend para convertirme en un desarrollador full stack, integrando soluciones eficientes tanto en el servidor como en la interfaz de usuario.
          </p>
          <a href="#contact" className="inline-block py-4 px-8 bg-mint-2 text-white font-bold rounded-full hover:bg-sea-green transition-all duration-300">
            Entre en contacto
          </a>
        </div>
        <div className="flex-1 text-right hidden lg:block">
          <img src="/images/dev.svg" alt="Developer illustration" />
        </div>
      </div>
    </section>
  );
};

export default TopSite;
