/**
 * Utilidades de debug para desarrollo
 */

export function checkEnvVariables() {
  const requiredVars = {
    VITE_SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL,
    VITE_SUPABASE_ANON_KEY: import.meta.env.VITE_SUPABASE_ANON_KEY,
    VITE_ADMIN_SECRET: import.meta.env.VITE_ADMIN_SECRET,
  };

  if (import.meta.env.DEV) {
    console.group('🔍 Verificación de Variables de Entorno');
    Object.entries(requiredVars).forEach(([key, value]) => {
      if (value) {
        console.log(`✅ ${key}:`, value ? 'Configurado' : 'No configurado');
      } else {
        console.error(`❌ ${key}:`, 'NO CONFIGURADO');
      }
    });
    console.groupEnd();
  }

  return requiredVars;
}
