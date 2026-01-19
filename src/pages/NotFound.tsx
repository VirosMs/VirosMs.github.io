import { Link } from 'react-router-dom';
import Button from '@/components/common/Button';

export default function NotFound() {
  return (
    <div className="container-custom section-padding">
      <div className="text-center max-w-md mx-auto">
        <h1 className="text-6xl font-bold text-primary-600 mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Página no encontrada</h2>
        <p className="text-secondary-600 mb-8">
          Lo sentimos, la página que buscas no existe o ha sido movida.
        </p>
        <Link to="/">
          <Button variant="primary" size="lg">
            Volver al inicio
          </Button>
        </Link>
      </div>
    </div>
  );
}
