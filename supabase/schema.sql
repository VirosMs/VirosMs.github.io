-- ============================================================================
-- SCHEMA DE BASE DE DATOS PARA PORTFOLIO - virosms.com
-- ============================================================================
-- Este script crea la estructura de la base de datos en Supabase
-- Ejecuta este script en el SQL Editor de Supabase Dashboard
-- ============================================================================

-- Crear enum para categorías de proyectos
CREATE TYPE project_category AS ENUM ('BackEnd', 'FrontEnd', 'Mobile', 'FullStack', 'DevOps');

-- Crear tabla de proyectos
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  long_description TEXT NOT NULL,
  image TEXT NOT NULL, -- URL del thumbnail
  images TEXT[] DEFAULT ARRAY[]::TEXT[], -- Array de screenshots
  technologies TEXT[] NOT NULL, -- Array de tecnologías: ["React", "Node.js", "PostgreSQL"]
  category project_category NOT NULL,
  documentation_url TEXT, -- URL opcional de documentación
  repository_url TEXT NOT NULL, -- URL del repositorio (requerido)
  live_url TEXT, -- URL opcional del proyecto en vivo
  featured BOOLEAN DEFAULT FALSE, -- Para proyectos destacados
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  "order" INTEGER DEFAULT 0 -- Número para ordenar manualmente
);

-- Crear índices para mejorar el rendimiento
CREATE INDEX IF NOT EXISTS idx_projects_category ON projects(category);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects(featured);
CREATE INDEX IF NOT EXISTS idx_projects_order ON projects("order");
CREATE INDEX IF NOT EXISTS idx_projects_created_at ON projects(created_at DESC);

-- Función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para actualizar updated_at
CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Habilitar Row Level Security (RLS)
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Política: Permitir lectura pública de proyectos
CREATE POLICY "Proyectos son públicos para lectura"
  ON projects
  FOR SELECT
  USING (true);

-- Política: Solo usuarios autenticados pueden insertar (para admin)
-- Nota: En producción, deberías crear una política más específica
-- que valide que el usuario es admin usando JWT
CREATE POLICY "Solo admins pueden insertar proyectos"
  ON projects
  FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- Política: Solo usuarios autenticados pueden actualizar
CREATE POLICY "Solo admins pueden actualizar proyectos"
  ON projects
  FOR UPDATE
  USING (auth.role() = 'authenticated');

-- Política: Solo usuarios autenticados pueden eliminar
CREATE POLICY "Solo admins pueden eliminar proyectos"
  ON projects
  FOR DELETE
  USING (auth.role() = 'authenticated');

-- ============================================================================
-- DATOS DE EJEMPLO (OPCIONAL)
-- ============================================================================
-- Puedes descomentar estas líneas para insertar proyectos de ejemplo

/*
INSERT INTO projects (
  title,
  description,
  long_description,
  image,
  images,
  technologies,
  category,
  repository_url,
  live_url,
  featured,
  "order"
) VALUES (
  'Proyecto Ejemplo',
  'Descripción corta del proyecto',
  'Descripción larga y detallada del proyecto con más información sobre las características, tecnologías utilizadas, desafíos enfrentados y soluciones implementadas.',
  'https://via.placeholder.com/800x600',
  ARRAY['https://via.placeholder.com/1920x1080', 'https://via.placeholder.com/1920x1080'],
  ARRAY['React', 'TypeScript', 'Tailwind CSS'],
  'FullStack',
  'https://github.com/usuario/proyecto',
  'https://proyecto-ejemplo.com',
  true,
  1
);
*/

-- ============================================================================
-- NOTAS IMPORTANTES
-- ============================================================================
-- 1. Después de ejecutar este script, ve a Authentication > Policies en Supabase
--    para ajustar las políticas de seguridad según tus necesidades
--
-- 2. Para usar autenticación de admin más segura:
--    - Crea una función en Supabase Edge Functions que valide el JWT
--    - O usa Supabase Auth con roles personalizados
--
-- 3. Para subir imágenes, configura Supabase Storage:
--    - Ve a Storage en el dashboard
--    - Crea un bucket llamado "project-images"
--    - Configura políticas de acceso público para lectura
--
-- 4. Para generar tipos TypeScript automáticamente:
--    npx supabase gen types typescript --project-id YOUR_PROJECT_ID > src/types/database.ts
-- ============================================================================
