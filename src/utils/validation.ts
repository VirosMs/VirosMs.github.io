import type { ProjectCreate } from '@/types/project';

/**
 * Valida que una URL sea válida
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Valida un email
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Valida los datos de un proyecto antes de crear/actualizar
 */
export function validateProject(project: Partial<ProjectCreate>): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (!project.title || project.title.trim().length === 0) {
    errors.push('El título es requerido');
  }

  if (!project.description || project.description.trim().length === 0) {
    errors.push('La descripción es requerida');
  }

  if (!project.longDescription || project.longDescription.trim().length === 0) {
    errors.push('La descripción larga es requerida');
  }

  if (!project.image || !isValidUrl(project.image)) {
    errors.push('La URL de la imagen es inválida');
  }

  if (!project.technologies || project.technologies.length === 0) {
    errors.push('Debe tener al menos una tecnología');
  }

  if (!project.category) {
    errors.push('La categoría es requerida');
  }

  const hasCodeUrl = project.repositoryUrl && project.repositoryUrl.trim() !== '';
  const hasLiveUrl = project.liveUrl && project.liveUrl.trim() !== '';

  if (!hasCodeUrl && !hasLiveUrl) {
    errors.push('Debe proporcionar al menos la URL del código (Repositorio) o la URL del proyecto en vivo');
  }

  if (hasCodeUrl && project.repositoryUrl && !isValidUrl(project.repositoryUrl)) {
    errors.push('La URL del repositorio es inválida');
  }

  if (hasLiveUrl && project.liveUrl && !isValidUrl(project.liveUrl)) {
    errors.push('La URL del proyecto en vivo es inválida');
  }

  if (project.documentationUrl && !isValidUrl(project.documentationUrl)) {
    errors.push('La URL de documentación es inválida');
  }

  if (project.order !== undefined && project.order < 0) {
    errors.push('El orden debe ser un número positivo');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}
