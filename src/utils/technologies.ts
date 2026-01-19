/**
 * Utilidad para gestionar tecnologías del portfolio
 * Extrae tecnologías de diferentes fuentes y las centraliza
 */

import { technologies as profileTechnologies } from '@/data/profile';
import { experience } from '@/data/profile';

/**
 * Obtiene todas las tecnologías únicas del perfil
 */
export function getProfileTechnologies(): string[] {
  return profileTechnologies.map((tech) => tech.name);
}

/**
 * Obtiene todas las tecnologías únicas de la experiencia laboral
 */
export function getExperienceTechnologies(): string[] {
  const techs = new Set<string>();
  experience.forEach((exp) => {
    exp.technologies.forEach((tech) => techs.add(tech));
  });
  return Array.from(techs);
}

/**
 * Obtiene todas las tecnologías disponibles en el portfolio
 * Combina tecnologías del perfil y de la experiencia
 */
export function getAllTechnologies(): string[] {
  const techs = new Set<string>();
  
  // Agregar tecnologías del perfil
  profileTechnologies.forEach((tech) => techs.add(tech.name));
  
  // Agregar tecnologías de la experiencia
  experience.forEach((exp) => {
    exp.technologies.forEach((tech) => techs.add(tech));
  });
  
  // Ordenar alfabéticamente
  return Array.from(techs).sort();
}

/**
 * Busca tecnologías que coincidan con un término de búsqueda
 */
export function searchTechnologies(query: string, availableTechs?: string[]): string[] {
  const techs = availableTechs || getAllTechnologies();
  const lowerQuery = query.toLowerCase().trim();
  
  if (!lowerQuery) {
    return techs;
  }
  
  return techs.filter((tech) => tech.toLowerCase().includes(lowerQuery));
}

/**
 * Añade una nueva tecnología a la lista (solo en memoria, no persiste)
 */
export function addTechnology(tech: string, existingTechs: string[]): string[] {
  const trimmed = tech.trim();
  if (!trimmed || existingTechs.includes(trimmed)) {
    return existingTechs;
  }
  return [...existingTechs, trimmed].sort();
}
