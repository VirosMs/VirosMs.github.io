/**
 * Categorías de proyectos disponibles
 */
export type ProjectCategory = 'BackEnd' | 'FrontEnd' | 'Mobile' | 'FullStack' | 'DevOps';

/**
 * Interfaz principal para proyectos del portfolio
 */
export interface Project {
  id: string; // UUID
  title: string;
  description: string; // Descripción corta para card
  longDescription: string; // Descripción larga para modal
  image: string; // URL del thumbnail
  images: string[]; // Array de screenshots
  technologies: string[]; // Array de tecnologías: ["React", "Node.js", "PostgreSQL"]
  category: ProjectCategory;
  documentationUrl?: string; // Opcional
  repositoryUrl: string; // Requerido
  liveUrl?: string; // Opcional
  featured: boolean; // Para proyectos destacados
  createdAt: string; // ISO timestamp
  updatedAt: string; // ISO timestamp
  order: number; // Número para ordenar manualmente
}

/**
 * Tipo para crear un nuevo proyecto (sin id, timestamps)
 */
export type ProjectCreate = Omit<Project, 'id' | 'createdAt' | 'updatedAt'>;

/**
 * Tipo para actualizar un proyecto (todos los campos opcionales excepto id)
 */
export type ProjectUpdate = Partial<Omit<Project, 'id' | 'createdAt'>> & {
  id: string;
};
