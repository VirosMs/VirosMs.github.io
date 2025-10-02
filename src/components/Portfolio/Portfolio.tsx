
import React from 'react';
import './Portfolio.css';

const Portfolio: React.FC = () => {
  return (
    <section className="portfolio" id="portfolio">
      <div className="interface">
        <h2 className="title">MIS <span>PROYECTOS.</span></h2>
        <div className="flex">
          <div className="img-port" style={{backgroundImage: 'url(images/restaurantChallenge.png)'}}>
            <div className="overlay">
              Sistema de Reservas
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
