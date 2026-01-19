import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { adminSecret } from '@/lib/supabase';
import { checkEnvVariables } from '@/utils/debug';
import Button from '@/components/common/Button';

interface AdminLoginProps {
  onLoginSuccess: () => void;
}

export default function AdminLogin({ onLoginSuccess }: AdminLoginProps) {
  const [secret, setSecret] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { signInAsAdmin } = useAuth();

  // Debug: Verificar variables de entorno al montar el componente
  useEffect(() => {
    if (import.meta.env.DEV) {
      checkEnvVariables();
      if (!adminSecret) {
        console.error('❌ VITE_ADMIN_SECRET no está disponible. Asegúrate de:');
        console.error('1. Que el archivo .env esté en la raíz del proyecto');
        console.error('2. Que contenga: VITE_ADMIN_SECRET=tu_secret');
        console.error('3. Que hayas reiniciado el servidor de desarrollo');
      } else {
        console.log('✅ VITE_ADMIN_SECRET está configurado (longitud:', adminSecret.length, ')');
      }
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // Validar que el campo no esté vacío
    if (!secret.trim()) {
      setError('Por favor, ingresa tus credenciales.');
      setLoading(false);
      return;
    }

    try {
      const isValid = await signInAsAdmin(secret.trim());
      if (isValid) {
        // Verificar que se guardó en localStorage
        const isAdminFromStorage = localStorage.getItem('isAdmin') === 'true';
        
        if (isAdminFromStorage) {
          // Disparar evento personalizado para notificar a otros componentes
          window.dispatchEvent(new Event('adminLogin'));
          
          // Llamar al callback de éxito
          onLoginSuccess();
          
          // No poner setLoading(false) aquí porque el componente se desmontará
          // cuando isAdmin cambie a true
        } else {
          setError('Error al iniciar sesión. Por favor, intenta de nuevo.');
          setLoading(false);
        }
      } else {
        setError('Credenciales incorrectas. Intenta nuevamente.');
        setLoading(false);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al iniciar sesión');
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white dark:bg-secondary-800 rounded-lg shadow-lg p-8 border border-secondary-200 dark:border-secondary-700">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-secondary-900 dark:text-secondary-100 mb-2">Acceso Restringido</h2>
          <p className="text-secondary-600 dark:text-secondary-400">Ingresa tus credenciales para continuar</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="secret" className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
              Credencial de Acceso
            </label>
            <input
              type="password"
              id="secret"
              value={secret}
              onChange={(e) => setSecret(e.target.value)}
              className="w-full px-4 py-3 bg-white dark:bg-secondary-900 text-secondary-900 dark:text-secondary-100 border border-secondary-300 dark:border-secondary-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Ingresa tu credencial"
              required
              autoFocus
            />
          </div>

          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
              <p className="text-sm text-red-600 dark:text-red-400">Credenciales incorrectas. Intenta nuevamente.</p>
            </div>
          )}

          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full"
            disabled={loading}
          >
            {loading ? 'Verificando...' : 'Acceder'}
          </Button>
        </form>

        {/* Información de ayuda solo visible en desarrollo */}
        {import.meta.env.DEV && (
          <div className="mt-6">
            <p className="text-xs text-secondary-400 dark:text-secondary-500 text-center">
              Ingresa tu credencial de acceso
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
