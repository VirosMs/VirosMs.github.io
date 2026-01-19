import { Link } from 'react-router-dom';
import Button from '@/components/common/Button';

export default function Hero() {
  return (
    <section id="hero" className="text-center py-20 md:py-32 animate-fade-in">
      <div className="max-w-4xl mx-auto">
        <h1 className="mb-6 text-balance">
          Backend Developer{' '}
          <span className="text-primary-600">en evolución hacia Full Stack</span>
        </h1>
        <p className="text-xl md:text-2xl text-secondary-600 dark:text-secondary-300 max-w-2xl mx-auto mb-8 leading-relaxed">
          Especializado en microservicios con Java/Spring y ampliando experiencia en frontend y mobile.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/projects">
            <Button variant="primary" size="lg">
              Ver Proyectos
            </Button>
          </Link>
          <a href="#contact">
            <Button variant="outline" size="lg">
              Contactar
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
