
import React from 'react';

const TopSite: React.FC = () => {
  return (
    <section className="top-of-site" id="top-of-site">
      <div className="interface">
        <div className="flex">
          <div className="txt-top-site">
            <h1> Mi Viaje como Backend Developer y Aspirante a Full Stack<span>.</span></h1>
            <p>Soy un desarrollador backend especializado en microservicios y API Rest, con experiencia en Android y Flutter. Actualmente, estoy aprendiendo frontend para convertirme en un desarrollador full stack, integrando soluciones eficientes tanto en el servidor como en la interfaz de usuario.</p>
            <div className="btn-contact">
              <a href="#">
                <button>Entre en contacto</button>
              </a>
            </div>
          </div>
          <div className="img-top-site">
            <img src="images/me.png" alt="" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSite;
