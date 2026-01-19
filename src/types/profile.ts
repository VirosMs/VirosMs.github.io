/**
 * Tipos para datos del perfil profesional
 */

export interface Specialty {
  id: string;
  title: string;
  description: string;
  icon: string; // Nombre del icono o emoji
}

export interface Technology {
  name: string;
  category: 'Frontend' | 'Backend' | 'Database' | 'DevOps' | 'Mobile' | 'Other';
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string; // YYYY-MM
  endDate?: string; // YYYY-MM o "Present"
  description: string;
  technologies: string[];
  location?: string;
}

export interface Language {
  name: string;
  level: 'Basic' | 'Intermediate' | 'Advanced' | 'Native';
  certification?: string;
}

export interface ContactInfo {
  email: string;
  phone?: string;
  location?: string;
  linkedin?: string;
  github?: string;
  twitter?: string;
  website?: string;
}
