import { useState, useEffect } from 'react';
import { supabase, adminSecret } from '@/lib/supabase';
import type { User, Session } from '@supabase/supabase-js';

interface AuthState {
  user: User | null;
  session: Session | null;
  loading: boolean;
  isAdmin: boolean;
}

/**
 * Hook personalizado para manejar autenticación
 * 
 * Nota: En producción, la validación de admin debería hacerse en el backend
 * con un JWT token válido. Por ahora, usamos una validación simple con secret.
 */
export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    session: null,
    loading: true,
    isAdmin: false,
  });

  useEffect(() => {
    // Verificar si ya hay sesión de admin en localStorage
    const isAdminFromStorage = localStorage.getItem('isAdmin') === 'true';
    
    // Obtener sesión inicial
    supabase.auth.getSession().then(({ data: { session } }) => {
      setAuthState({
        user: session?.user ?? null,
        session,
        loading: false,
        isAdmin: isAdminFromStorage, // Verificar localStorage al inicio
      });
    });

    // Escuchar cambios en la autenticación
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      const isAdmin = localStorage.getItem('isAdmin') === 'true';
      setAuthState({
        user: session?.user ?? null,
        session,
        loading: false,
        isAdmin, // Mantener estado de admin
      });
    });

    return () => subscription.unsubscribe();
  }, []);

  /**
   * Iniciar sesión con email y password
   */
  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw error;
    }

    return data;
  };

  /**
   * Cerrar sesión
   */
  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw error;
    }
  };

  /**
   * Validar si el usuario es admin usando el secret
   * 
   * En producción, esto debería validarse en el backend con un JWT
   */
  const validateAdmin = (secret: string): boolean => {
    const trimmedSecret = secret.trim();
    const trimmedAdminSecret = adminSecret.trim();
    
    // Debug en desarrollo
    if (import.meta.env.DEV) {
      console.log('🔍 Validando secret:', {
        inputLength: trimmedSecret.length,
        expectedLength: trimmedAdminSecret.length,
        match: trimmedSecret === trimmedAdminSecret,
      });
    }
    
    return trimmedSecret === trimmedAdminSecret;
  };

  /**
   * Iniciar sesión como admin (validación con secret)
   */
  const signInAsAdmin = async (secret: string): Promise<boolean> => {
    if (!adminSecret) {
      console.error('❌ VITE_ADMIN_SECRET no está configurado en las variables de entorno');
      return false;
    }
    
    const isValid = validateAdmin(secret);
    
    if (isValid) {
      // Guardar en localStorage que es admin (temporal)
      // En producción, esto debería ser un JWT del backend
      localStorage.setItem('isAdmin', 'true');
      
      // Actualizar estado inmediatamente y forzar re-render
      setAuthState((prev) => {
        const newState = { ...prev, isAdmin: true, loading: false };
        if (import.meta.env.DEV) {
          console.log('✅ Estado de admin actualizado:', newState.isAdmin);
        }
        return newState;
      });
      
      // Disparar evento personalizado para notificar a otros componentes
      // Usar un pequeño delay para asegurar que el estado se actualizó
      setTimeout(() => {
        window.dispatchEvent(new Event('adminLogin'));
      }, 50);
      
      return true;
    }
    
    return false;
  };

  /**
   * Verificar si el usuario actual es admin desde localStorage
   * Se ejecuta cuando cambia el estado o cuando se monta el componente
   */
  useEffect(() => {
    const checkAdminStatus = () => {
      const isAdmin = localStorage.getItem('isAdmin') === 'true';
      setAuthState((prev) => {
        if (prev.isAdmin !== isAdmin) {
          return { ...prev, isAdmin };
        }
        return prev;
      });
    };

    // Verificar inmediatamente
    checkAdminStatus();

    // Escuchar cambios en localStorage (por si se cambia desde otra pestaña)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'isAdmin') {
        checkAdminStatus();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return {
    ...authState,
    signIn,
    signOut,
    signInAsAdmin,
    validateAdmin,
  };
}
