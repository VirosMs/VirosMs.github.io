import { useState, useEffect, useRef } from 'react';
import { contactInfo } from '@/data/profile';
import Button from '@/components/common/Button';

// Extender el tipo Window para incluir Turnstile
declare global {
  interface Window {
    turnstile?: {
      render: (
        element: string | HTMLElement,
        options: {
          sitekey: string;
          callback?: (token: string) => void;
          'error-callback'?: () => void;
          'expired-callback'?: () => void;
          theme?: 'light' | 'dark' | 'auto';
        }
      ) => string;
      reset: (widgetId?: string) => void;
      remove: (widgetId?: string) => void;
    };
  }
}

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const turnstileWidgetId = useRef<string | null>(null);

  // Inicializar el widget de Turnstile cuando el componente se monta
  useEffect(() => {
    const siteKey = import.meta.env.VITE_CLOUDFLARE_SITE_KEY;
    
    if (!siteKey) {
      console.error('VITE_CLOUDFLARE_SITE_KEY no encontrada en variables de entorno');
      return;
    }

    // Función para verificar que el elemento está en el DOM
    const elementExists = () => {
      return document.getElementById('cf-turnstile') !== null;
    };

    // Esperar a que el script de Turnstile se cargue Y el elemento esté en el DOM
    const initTurnstile = () => {
      const element = document.getElementById('cf-turnstile');
      
      if (!element) {
        console.warn('Turnstile: Elemento #cf-turnstile no encontrado en el DOM');
        return false;
      }

      if (!window.turnstile) {
        console.warn('Turnstile: window.turnstile no está disponible');
        return false;
      }

      if (turnstileWidgetId.current) {
        return true;
      }

      try {
        const widgetId = window.turnstile.render('#cf-turnstile', {
          sitekey: siteKey,
          callback: (token: string) => {
            setTurnstileToken(token);
          },
          'error-callback': () => {
            setTurnstileToken(null);
            console.error('Error al cargar el widget de Turnstile');
          },
          'expired-callback': () => {
            setTurnstileToken(null);
          },
          theme: 'auto', // Se adapta automáticamente al tema del sitio
        });
        turnstileWidgetId.current = widgetId;
        return true;
      } catch (error) {
        console.error('Turnstile: Error al inicializar:', error);
        return false;
      }
    };

    // Función que espera tanto el script como el elemento DOM
    const tryInit = () => {
      if (window.turnstile && elementExists()) {
        if (initTurnstile()) {
          return true;
        }
      }
      return false;
    };

    // Intentar inicializar inmediatamente
    if (tryInit()) {
      return;
    }

    // Si no funciona, esperar a que ambos estén disponibles
    let attempts = 0;
    const maxAttempts = 50; // 5 segundos (50 * 100ms)

    const checkInterval = setInterval(() => {
      attempts++;
      
      if (tryInit()) {
        clearInterval(checkInterval);
        return;
      }

      if (attempts >= maxAttempts) {
        clearInterval(checkInterval);
        console.error('Turnstile: No se pudo inicializar después de 5 segundos');
        if (!window.turnstile) {
          console.error('Turnstile: El script no se ha cargado');
        }
        if (!elementExists()) {
          console.error('Turnstile: El elemento #cf-turnstile no existe en el DOM');
        }
      }
    }, 100);

    // Cleanup: remover el widget cuando el componente se desmonte
    return () => {
      clearInterval(checkInterval);
      if (turnstileWidgetId.current && window.turnstile) {
        try {
          window.turnstile.remove(turnstileWidgetId.current);
          turnstileWidgetId.current = null;
        } catch (error) {
          console.error('Error al remover widget de Turnstile:', error);
        }
      }
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Verificar que existe un token de Turnstile antes de enviar
    if (!turnstileToken) {
      setStatus('error');
      setTimeout(() => {
        setStatus('idle');
      }, 3000);
      return;
    }

    setStatus('sending');

    try {
      // URL del API backend y API Key desde variables de entorno
      const apiUrl = import.meta.env.VITE_EMAIL_API_URL;
      const apiKey = import.meta.env.VITE_EMAIL_API_KEY;

      if (!apiUrl || !apiKey) {
        throw new Error('Configuración del API no encontrada. Por favor, configura las variables de entorno.');
      }
      
      // Formatear el mensaje completo con nombre, email y mensaje
      // Usar saltos de línea normales \n - el backend debe renderizarlos con white-space: pre-wrap o convertir a <br>
      const mensajeCompleto = `Nombre: ${formData.name}\nEmail: ${formData.email}\n\nMensaje:\n${formData.message}`;
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': apiKey,
        },
        body: JSON.stringify({
          email_to_reply: formData.email,
          subject: `Nuevo mensaje de contacto de ${formData.name}`,
          mensaje: mensajeCompleto,
          turnstile_token: turnstileToken,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Error al enviar el mensaje');
      }

      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTurnstileToken(null);
      
      // Resetear el widget de Turnstile después de envío exitoso
      if (turnstileWidgetId.current && window.turnstile) {
        try {
          window.turnstile.reset(turnstileWidgetId.current);
        } catch (error) {
          console.error('Error al resetear widget de Turnstile:', error);
        }
      }
      
      setTimeout(() => setStatus('idle'), 3000);
    } catch (error) {
      console.error('Error enviando mensaje:', error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section id="contact" className="section-padding bg-secondary-50 dark:bg-secondary-800/50">
      <div className="container-custom">
        <h2 className="text-center mb-12">Contacto</h2>
        
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Información de contacto */}
            <div>
              <h3 className="text-xl font-semibold mb-6 text-secondary-900 dark:text-secondary-100">
                Información de Contacto
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">📧</span>
                  <div>
                    <p className="font-medium text-secondary-900 dark:text-secondary-100">Email</p>
                    <a
                      href={`mailto:${contactInfo.email}`}
                      className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300"
                    >
                      {contactInfo.email}
                    </a>
                  </div>
                </div>
                
                {contactInfo.phone && (
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">📱</span>
                    <div>
                      <p className="font-medium text-secondary-900">Teléfono</p>
                      <a
                        href={`tel:${contactInfo.phone}`}
                        className="text-primary-600 hover:text-primary-700"
                      >
                        {contactInfo.phone}
                      </a>
                    </div>
                  </div>
                )}
                
                {contactInfo.location && (
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">📍</span>
                    <div>
                      <p className="font-medium text-secondary-900 dark:text-secondary-100">Ubicación</p>
                      <p className="text-secondary-600 dark:text-secondary-400">{contactInfo.location}</p>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Redes sociales */}
              <div className="mt-8">
                <h4 className="font-semibold mb-4 text-secondary-900 dark:text-secondary-100">Redes Sociales</h4>
                <div className="flex gap-4">
                  {contactInfo.linkedin && (
                    <a
                      href={contactInfo.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-600 hover:text-primary-700 transition-colors"
                      aria-label="LinkedIn"
                    >
                      <svg
                        className="w-8 h-8"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </a>
                  )}
                  {contactInfo.github && (
                    <a
                      href={contactInfo.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-600 hover:text-primary-700 transition-colors"
                      aria-label="GitHub"
                    >
                      <svg
                        className="w-8 h-8"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            </div>
            
            {/* Formulario */}
            <div>
              <h3 className="text-xl font-semibold mb-6 text-secondary-900 dark:text-secondary-100">
                Envíame un Mensaje
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                    Nombre
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-white dark:bg-secondary-800 text-secondary-900 dark:text-secondary-100 border border-secondary-300 dark:border-secondary-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-white dark:bg-secondary-800 text-secondary-900 dark:text-secondary-100 border border-secondary-300 dark:border-secondary-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                    Mensaje
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-2 bg-white dark:bg-secondary-800 text-secondary-900 dark:text-secondary-100 border border-secondary-300 dark:border-secondary-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                  />
                </div>
                
                {/* Widget de Cloudflare Turnstile */}
                <div>
                  <div id="cf-turnstile" className="flex justify-center"></div>
                  {!turnstileToken && status === 'error' && (
                    <p className="text-red-600 dark:text-red-400 text-sm text-center mt-2">
                      Por favor, completa la verificación de seguridad antes de enviar.
                    </p>
                  )}
                </div>
                
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full"
                  disabled={status === 'sending' || !turnstileToken}
                >
                  {status === 'sending'
                    ? 'Enviando...'
                    : status === 'success'
                    ? '✓ Mensaje Enviado'
                    : 'Enviar Mensaje'}
                </Button>
                
                {status === 'error' && (
                  <p className="text-red-600 dark:text-red-400 text-sm text-center">
                    Error al enviar el mensaje. Por favor, intenta de nuevo.
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
