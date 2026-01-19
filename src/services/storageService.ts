import { supabase } from '@/lib/supabase';

const BUCKET_NAME = 'project-images';

/**
 * Servicio para gestionar archivos en Supabase Storage
 */
export const storageService = {
  /**
   * Sube una imagen al bucket de proyectos
   * @param file Archivo a subir
   * @param path Ruta donde guardar el archivo (ej: "projects/project-1/thumbnail.jpg")
   * @returns URL pública de la imagen subida
   */
  async uploadImage(file: File, path: string): Promise<string> {
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(path, file, {
        cacheControl: '3600',
        upsert: false, // No sobrescribir si existe
      });

    if (error) {
      throw new Error(`Error al subir imagen: ${error.message}`);
    }

    // Obtener URL pública
    const { data: urlData } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(data.path);

    return urlData.publicUrl;
  },

  /**
   * Sube múltiples imágenes
   * @param files Array de archivos
   * @param basePath Ruta base (ej: "projects/project-1")
   * @returns Array de URLs públicas
   */
  async uploadImages(files: File[], basePath: string): Promise<string[]> {
    const uploadPromises = files.map((file, index) => {
      const fileName = `${basePath}/screenshot-${index + 1}.${file.name.split('.').pop()}`;
      return this.uploadImage(file, fileName);
    });

    return Promise.all(uploadPromises);
  },

  /**
   * Elimina una imagen del storage
   * @param path Ruta del archivo a eliminar
   */
  async deleteImage(path: string): Promise<void> {
    const { error } = await supabase.storage
      .from(BUCKET_NAME)
      .remove([path]);

    if (error) {
      throw new Error(`Error al eliminar imagen: ${error.message}`);
    }
  },

  /**
   * Elimina múltiples imágenes
   * @param paths Array de rutas a eliminar
   */
  async deleteImages(paths: string[]): Promise<void> {
    const { error } = await supabase.storage
      .from(BUCKET_NAME)
      .remove(paths);

    if (error) {
      throw new Error(`Error al eliminar imágenes: ${error.message}`);
    }
  },

  /**
   * Obtiene la URL pública de una imagen
   * @param path Ruta del archivo
   * @returns URL pública
   */
  getPublicUrl(path: string): string {
    const { data } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(path);

    return data.publicUrl;
  },
};
