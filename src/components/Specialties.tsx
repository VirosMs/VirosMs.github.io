
const specialties = [
  {
    icon: "bi bi-cloud",
    title: "API REST",
    description: "Domino el desarrollo de API Rest, diseñando interfaces que permiten la comunicación eficiente y escalable entre sistemas. Utilizo tecnologías como Spring Boot y herramientas de autenticación como OAuth2 y JWT, para crear APIs seguras, robustas y fáciles de consumir.",
    highlighted: false,
  },
  {
    icon: "bi bi-diagram-3",
    title: "Microservicios",
    description: "Trabajo con arquitecturas de microservicios, descomponiendo sistemas complejos en componentes independientes que interactúan de manera flexible. Empleo tecnologías como Spring Boot, Spring Cloud, Spring Security, garantizando soluciones escalables, resilientes y optimizadas para entornos distribuidos.",
    highlighted: true,
  },
  {
    icon: "bi bi-phone",
    title: "Desarrollo Movil",
    description: "Tengo experiencia en el desarrollo de aplicaciones móviles para Android y Flutter, enfocándome en la creación de experiencias de usuario fluidas y eficientes. Utilizo tecnologías como Kotlin, Java, Flutter y Dart, trabajando tanto en la lógica interna como en la interacción del usuario para crear aplicaciones escalables en múltiples plataformas.",
    highlighted: false,
  },
];

const Specialties = () => {
  return (
    <section id="specialities" className="py-20 px-[4%] lg:px-[8%]">
      <h2 className="text-4xl font-bold text-center mb-12 text-dark-green dark:text-light-green">MIS ESPECIALIDADES.</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
        {specialties.map((spec, index) => (
          <div
            key={index}
            className={`text-center p-6 rounded-2xl transition-all duration-300 ${spec.highlighted ? 'bg-celadon-2/30 dark:bg-brunswick-green/50 md:scale-110 shadow-lg border border-celadon' : ''}`}>
            <i className={`${spec.icon} text-sea-green text-5xl mb-4 inline-block`}></i>
            <h3 className="text-2xl font-bold mb-2 text-dark-green dark:text-light-green">{spec.title}</h3>
            <p className="text-dark-green dark:text-light-green">{spec.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Specialties;
