
import React from 'react';
import './Specialties.css';

const Specialties: React.FC = () => {
  return (
    <section className="specialities" id="specialities">
      <div className="interface">
        <h2 className="title">MIS <span>ESPECIALIDADES.</span></h2>
        <div className="flex">
          <div className="specialities-box">
            <i className="bi bi-cloud-fog2"></i>
            <h3>API REST</h3>
            <p>Domino el desarrollo de API Rest, diseñando interfaces que permiten la comunicación eficiente y escalable entre sistemas. Utilizo tecnologías como Spring Boot y herramientas de autenticación como OAuth2 y JWT, para crear APIs seguras, robustas y fáciles de consumir.</p>
          </div>
          <div className="specialities-box">
            <i className="bi bi-diagram-3"></i>
            <h3>Microservicios</h3>
            <p>Trabajo con arquitecturas de microservicios, descomponiendo sistemas complejos en componentes independientes que interactúan de manera flexible. Empleo tecnologías como Spring Boot, Spring Cloud, Spring Security, garantizando soluciones escalables, resilientes y optimizadas para entornos distribuidos.</p>
          </div>
          <div className="specialities-box">
            <i className="bi bi-phone"></i>
            <h3>Desarrollo Movil</h3>
            <p>Tengo experiencia en el desarrollo de aplicaciones móviles para Android y Flutter, enfocándome en la creación de experiencias de usuario fluidas y eficientes. Utilizo tecnologías como Kotlin, Java, Flutter y Dart, trabajando tanto en la lógica interna como en la interacción del usuario para crear aplicaciones escalables en múltiples plataformas.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Specialties;
