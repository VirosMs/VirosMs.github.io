import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database';

/**
 * URL del proyecto de Supabase
 */
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;

/**
 * Clave anónima de Supabase (pública, segura para usar en el cliente)
 */
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

/**
 * Secret key para el admin panel (solo para uso en servidor, pero lo usaremos para validación)
 */
export const adminSecret = import.meta.env.VITE_ADMIN_SECRET?.trim() || '';

// Debug: Solo en desarrollo, mostrar si la variable está cargada (sin mostrar el valor)
if (import.meta.env.DEV) {
  console.log('🔐 Admin Secret configurado:', adminSecret ? '✅ Sí' : '❌ No');
}

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Faltan variables de entorno de Supabase. Por favor, configura VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY en tu archivo .env'
  );
}

/**
 * Cliente de Supabase con tipos TypeScript
 * Este cliente se usa para todas las operaciones de base de datos
 */
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

/**
 * Helper para obtener el cliente de Supabase con autenticación de admin
 * Nota: En producción, esto debería manejarse en el backend
 */
export const getAdminClient = () => {
  // En producción, esto debería ser una función que valide el JWT en el backend
  // Por ahora, usamos el cliente normal con validación manual
  return supabase;
};
