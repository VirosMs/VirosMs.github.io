import { supabase } from '@/lib/supabase';
import type { Project, ProjectCreate } from '@/types/project';
import type { Database } from '@/types/database';

type ProjectRow = Database['public']['Tables']['projects']['Row'];
type ProjectInsert = Database['public']['Tables']['projects']['Insert'];
type ProjectUpdateDB = Database['public']['Tables']['projects']['Update'];

// Helper para hacer insert con tipos correctos
const insertProject = (data: ProjectInsert) => {
  return (supabase.from('projects') as any).insert([data]).select().single();
};

// Helper para hacer update con tipos correctos
const updateProject = (id: string, data: ProjectUpdateDB) => {
  return (supabase.from('projects') as any).update(data).eq('id', id).select().single();
};

/**
 * Convierte un ProjectRow de la base de datos a Project
 */
function mapProjectFromDB(row: ProjectRow): Project {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    longDescription: row.long_description,
    image: row.image,
    images: row.images,
    technologies: row.technologies,
    category: row.category,
    documentationUrl: row.documentation_url ?? undefined,
    repositoryUrl: row.repository_url,
    liveUrl: row.live_url ?? undefined,
    featured: row.featured,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    order: row.order,
  };
}

/**
 * Convierte un ProjectCreate a ProjectInsert para la base de datos
 */
function mapProjectToDB(project: ProjectCreate): ProjectInsert {
  const insert: ProjectInsert = {
    title: project.title,
    description: project.description,
    long_description: project.longDescription,
    image: project.image,
    technologies: project.technologies,
    category: project.category,
    repository_url: project.repositoryUrl,
  };

  // Campos opcionales
  if (project.images && project.images.length > 0) {
    insert.images = project.images;
  }
  if (project.documentationUrl) {
    insert.documentation_url = project.documentationUrl;
  }
  if (project.liveUrl) {
    insert.live_url = project.liveUrl;
  }
  if (project.featured !== undefined) {
    insert.featured = project.featured;
  }
  if (project.order !== undefined) {
    insert.order = project.order;
  }

  return insert;
}

/**
 * Servicio para gestionar proyectos en Supabase
 */
export const projectService = {
  /**
   * Obtiene todos los proyectos
   */
  async getAll(): Promise<Project[]> {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('order', { ascending: true });

    if (error) {
      throw new Error(`Error al obtener proyectos: ${error.message}`);
    }

    return data.map(mapProjectFromDB);
  },

  /**
   * Obtiene proyectos destacados (top 4)
   */
  async getFeatured(limit: number = 4): Promise<Project[]> {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('featured', true)
      .order('order', { ascending: true })
      .limit(limit);

    if (error) {
      throw new Error(`Error al obtener proyectos destacados: ${error.message}`);
    }

    return data.map(mapProjectFromDB);
  },

  /**
   * Obtiene proyectos filtrados por categoría
   */
  async getByCategory(category: Project['category']): Promise<Project[]> {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('category', category)
      .order('order', { ascending: true });

    if (error) {
      throw new Error(`Error al obtener proyectos por categoría: ${error.message}`);
    }

    return data.map(mapProjectFromDB);
  },

  /**
   * Obtiene proyectos filtrados por tecnología
   */
  async getByTechnology(technology: string): Promise<Project[]> {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .contains('technologies', [technology])
      .order('order', { ascending: true });

    if (error) {
      throw new Error(`Error al obtener proyectos por tecnología: ${error.message}`);
    }

    return data.map(mapProjectFromDB);
  },

  /**
   * Obtiene un proyecto por ID
   */
  async getById(id: string): Promise<Project | null> {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return null; // No se encontró el proyecto
      }
      throw new Error(`Error al obtener proyecto: ${error.message}`);
    }

    return mapProjectFromDB(data);
  },

  /**
   * Crea un nuevo proyecto
   */
  async create(project: ProjectCreate): Promise<Project> {
    const projectDB = mapProjectToDB(project);
    
    const { data, error } = await insertProject(projectDB);

    if (error) {
      throw new Error(`Error al crear proyecto: ${error.message}`);
    }

    return mapProjectFromDB(data);
  },

  /**
   * Actualiza un proyecto existente
   */
  async update(id: string, updates: Partial<ProjectCreate>): Promise<Project> {
    const updateData: ProjectUpdateDB = {};
    
    if (updates.title !== undefined) updateData.title = updates.title;
    if (updates.description !== undefined) updateData.description = updates.description;
    if (updates.longDescription !== undefined) updateData.long_description = updates.longDescription;
    if (updates.image !== undefined) updateData.image = updates.image;
    if (updates.images !== undefined) updateData.images = updates.images;
    if (updates.technologies !== undefined) updateData.technologies = updates.technologies;
    if (updates.category !== undefined) updateData.category = updates.category;
    if (updates.documentationUrl !== undefined) updateData.documentation_url = updates.documentationUrl ?? null;
    if (updates.repositoryUrl !== undefined) updateData.repository_url = updates.repositoryUrl;
    if (updates.liveUrl !== undefined) updateData.live_url = updates.liveUrl ?? null;
    if (updates.featured !== undefined) updateData.featured = updates.featured;
    if (updates.order !== undefined) updateData.order = updates.order;
    
    updateData.updated_at = new Date().toISOString();

    const { data, error } = await updateProject(id, updateData);

    if (error) {
      throw new Error(`Error al actualizar proyecto: ${error.message}`);
    }

    return mapProjectFromDB(data);
  },

  /**
   * Elimina un proyecto
   */
  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id);

    if (error) {
      throw new Error(`Error al eliminar proyecto: ${error.message}`);
    }
  },
};
