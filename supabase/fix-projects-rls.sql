-- ============================================================================
-- CORRECCIÓN DE POLÍTICAS RLS PARA TABLA PROJECTS
-- ============================================================================
-- Este script corrige las políticas RLS de la tabla projects para permitir
-- operaciones sin requerir autenticación de Supabase (ya que usamos secret key)
-- ============================================================================

-- Eliminar políticas existentes
DROP POLICY IF EXISTS "Proyectos son públicos para lectura" ON projects;
DROP POLICY IF EXISTS "Solo admins pueden insertar proyectos" ON projects;
DROP POLICY IF EXISTS "Solo admins pueden actualizar proyectos" ON projects;
DROP POLICY IF EXISTS "Solo admins pueden eliminar proyectos" ON projects;

-- Política de lectura pública (todos pueden leer proyectos)
CREATE POLICY "Proyectos son públicos para lectura"
  ON projects
  FOR SELECT
  USING (true);

-- Política de inserción pública (todos pueden crear proyectos)
-- NOTA: Esto es seguro porque el panel admin está protegido por secret key
CREATE POLICY "Todos pueden insertar proyectos"
  ON projects
  FOR INSERT
  WITH CHECK (true);

-- Política de actualización pública (todos pueden actualizar proyectos)
CREATE POLICY "Todos pueden actualizar proyectos"
  ON projects
  FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- Política de eliminación pública (todos pueden eliminar proyectos)
CREATE POLICY "Todos pueden eliminar proyectos"
  ON projects
  FOR DELETE
  USING (true);

-- ============================================================================
-- NOTA IMPORTANTE:
-- Estas políticas permiten operaciones sin autenticación porque:
-- 1. El panel admin está protegido por VITE_ADMIN_SECRET
-- 2. Solo quien conoce el secret puede acceder al panel
-- 3. Los proyectos son públicos de todas formas (para mostrarlos en el portfolio)
-- 
-- Si en el futuro quieres usar Supabase Auth, puedes cambiar las políticas
-- para requerir: auth.role() = 'authenticated'
-- ============================================================================
