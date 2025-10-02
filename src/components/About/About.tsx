
import React from 'react';
import './About.css';

const About: React.FC = () => {
  return (
    <section className="about" id="about">
      <div className="interface">
        <div className="flex">
          <div className="about-img">
            <img src="images/about-me.png" alt="" />
          </div>
          <div className="about-txt">
            <h2>¡Mucho Gusto! <span>Soy Charles Arruda Santos.</span></h2>
            <p> Un desarrollador backend con experiencia en el desarrollo de microservicios y API Rest. Me apasiona la creación de soluciones eficientes y escalables, utilizando tecnologías como Spring Boot, Spring Cloud, Spring Security, OAuth2, JWT, Kotlin, Java, Flutter y Dart.</p>
            <p>Actualmente, estoy aprendiendo frontend para convertirme en un desarrollador full stack, integrando soluciones tanto en el servidor como en la interfaz de usuario. Me encanta aprender nuevas tecnologías y enfrentar desafíos que me permitan crecer profesionalmente.</p>
            <p>Si estás interesado en trabajar juntos, no dudes en contactarme. ¡Estoy ansioso por conocer tu proyecto y ayudarte a alcanzar tus objetivos!</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
