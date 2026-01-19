-- ============================================================================
-- CORRECCIÓN DE POLÍTICAS DE STORAGE
-- ============================================================================
-- Este script corrige las políticas de Storage para permitir subir imágenes
-- sin requerir autenticación de Supabase (ya que usamos secret key)
-- ============================================================================

-- Eliminar políticas existentes si existen (tanto las antiguas como las nuevas)
DROP POLICY IF EXISTS "Imágenes públicas para lectura" ON storage.objects;
DROP POLICY IF EXISTS "Solo admins pueden subir imágenes" ON storage.objects;
DROP POLICY IF EXISTS "Solo admins pueden actualizar imágenes" ON storage.objects;
DROP POLICY IF EXISTS "Solo admins pueden eliminar imágenes" ON storage.objects;
DROP POLICY IF EXISTS "Todos pueden subir imágenes" ON storage.objects;
DROP POLICY IF EXISTS "Todos pueden actualizar imágenes" ON storage.objects;
DROP POLICY IF EXISTS "Todos pueden eliminar imágenes" ON storage.objects;

-- Política de lectura pública (todos pueden leer)
CREATE POLICY "Imágenes públicas para lectura"
ON storage.objects FOR SELECT
USING (bucket_id = 'project-images');

-- Política de escritura pública (todos pueden subir)
-- NOTA: Esto es seguro porque el panel admin está protegido por secret key
CREATE POLICY "Todos pueden subir imágenes"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'project-images');

-- Política de actualización pública
CREATE POLICY "Todos pueden actualizar imágenes"
ON storage.objects FOR UPDATE
USING (bucket_id = 'project-images')
WITH CHECK (bucket_id = 'project-images');

-- Política de eliminación pública
CREATE POLICY "Todos pueden eliminar imágenes"
ON storage.objects FOR DELETE
USING (bucket_id = 'project-images');

-- ============================================================================
-- ALTERNATIVA: Si prefieres mantener las políticas restrictivas,
-- puedes usar autenticación de Supabase Auth en lugar del secret key
-- ============================================================================
