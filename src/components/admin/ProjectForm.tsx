import { useState, useEffect } from 'react';
import type { Project, ProjectCreate, ProjectCategory } from '@/types/project';
import { projectService } from '@/services/projectService';
import { validateProject } from '@/utils/validation';
import Button from '@/components/common/Button';
import ImageUpload from './ImageUpload';
import TechnologyInput from './TechnologyInput';

interface ProjectFormProps {
  project?: Project | null;
  onSuccess: () => void;
  onCancel: () => void;
}

const categories: ProjectCategory[] = ['BackEnd', 'FrontEnd', 'Mobile', 'FullStack', 'DevOps'];

export default function ProjectForm({ project, onSuccess, onCancel }: ProjectFormProps) {
  const isEditing = !!project;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<Partial<ProjectCreate>>({
    title: '',
    description: '',
    longDescription: '',
    image: '',
    images: [],
    technologies: [],
    category: 'FullStack',
    documentationUrl: '',
    repositoryUrl: '',
    liveUrl: '',
    featured: false,
    order: 0,
  });


  useEffect(() => {
    if (project) {
      setFormData({
        title: project.title,
        description: project.description,
        longDescription: project.longDescription,
        image: project.image,
        images: project.images,
        technologies: project.technologies,
        category: project.category,
        documentationUrl: project.documentationUrl || '',
        repositoryUrl: project.repositoryUrl,
        liveUrl: project.liveUrl || '',
        featured: project.featured,
        order: project.order,
      });
    }
  }, [project]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleTechnologiesChange = (technologies: string[]) => {
    setFormData((prev) => ({
      ...prev,
      technologies,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validar datos
    const validation = validateProject(formData as ProjectCreate);
    if (!validation.isValid) {
      setError(validation.errors.join(', '));
      return;
    }

    setLoading(true);

    try {
      if (isEditing && project) {
        await projectService.update(project.id, formData);
      } else {
        await projectService.create(formData as ProjectCreate);
      }
      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al guardar proyecto');
      console.error('Error saving project:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-secondary-800 p-6 rounded-lg shadow border border-secondary-200 dark:border-secondary-700">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-secondary-900 dark:text-secondary-100">
          {isEditing ? 'Editar Proyecto' : 'Nuevo Proyecto'}
        </h2>
        <button
          type="button"
          onClick={onCancel}
          className="text-secondary-500 dark:text-secondary-400 hover:text-secondary-700 dark:hover:text-secondary-300"
        >
          ✕
        </button>
      </div>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Título */}
        <div className="md:col-span-2">
          <label htmlFor="title" className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
            Título *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-white dark:bg-secondary-900 text-secondary-900 dark:text-secondary-100 border border-secondary-300 dark:border-secondary-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        {/* Descripción corta */}
        <div className="md:col-span-2">
          <label htmlFor="description" className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
            Descripción Corta *
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={2}
            className="w-full px-4 py-2 bg-white dark:bg-secondary-900 text-secondary-900 dark:text-secondary-100 border border-secondary-300 dark:border-secondary-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
          />
        </div>

        {/* Descripción larga */}
        <div className="md:col-span-2">
          <label htmlFor="longDescription" className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
            Descripción Larga *
          </label>
          <textarea
            id="longDescription"
            name="longDescription"
            value={formData.longDescription}
            onChange={handleChange}
            required
            rows={5}
            className="w-full px-4 py-2 bg-white dark:bg-secondary-900 text-secondary-900 dark:text-secondary-100 border border-secondary-300 dark:border-secondary-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
          />
        </div>

        {/* Imagen principal */}
        <div className="md:col-span-2">
          <ImageUpload
            label="Imagen Principal *"
            value={formData.image || ''}
            onChange={(url) => setFormData((prev) => ({ ...prev, image: url }))}
            folder={`projects/${project?.id || 'new'}`}
          />
        </div>

        {/* Screenshots */}
        <div className="md:col-span-2">
          <ImageUpload
            label="Screenshots"
            value=""
            onChange={() => {}}
            multiple
            onMultipleChange={(urls) => setFormData((prev) => ({ ...prev, images: urls }))}
            existingImages={formData.images || []}
            folder={`projects/${project?.id || 'new'}`}
          />
        </div>

        {/* Categoría */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
            Categoría *
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-white dark:bg-secondary-900 text-secondary-900 dark:text-secondary-100 border border-secondary-300 dark:border-secondary-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Orden */}
        <div>
          <label htmlFor="order" className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
            Orden
          </label>
          <input
            type="number"
            id="order"
            name="order"
            value={formData.order}
            onChange={handleChange}
            min="0"
            className="w-full px-4 py-2 bg-white dark:bg-secondary-900 text-secondary-900 dark:text-secondary-100 border border-secondary-300 dark:border-secondary-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        {/* Tecnologías */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
            Tecnologías *
          </label>
          <TechnologyInput
            value={formData.technologies || []}
            onChange={handleTechnologiesChange}
            placeholder="Buscar o agregar tecnología..."
          />
        </div>

        {/* URL Repositorio */}
        <div>
          <label htmlFor="repositoryUrl" className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
            URL Repositorio *
          </label>
          <input
            type="url"
            id="repositoryUrl"
            name="repositoryUrl"
            value={formData.repositoryUrl}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-white dark:bg-secondary-900 text-secondary-900 dark:text-secondary-100 border border-secondary-300 dark:border-secondary-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        {/* URL Proyecto en Vivo */}
        <div>
          <label htmlFor="liveUrl" className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
            URL Proyecto en Vivo
          </label>
          <input
            type="url"
            id="liveUrl"
            name="liveUrl"
            value={formData.liveUrl}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-white dark:bg-secondary-900 text-secondary-900 dark:text-secondary-100 border border-secondary-300 dark:border-secondary-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        {/* URL Documentación */}
        <div className="md:col-span-2">
          <label htmlFor="documentationUrl" className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
            URL Documentación
          </label>
          <input
            type="url"
            id="documentationUrl"
            name="documentationUrl"
            value={formData.documentationUrl}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-white dark:bg-secondary-900 text-secondary-900 dark:text-secondary-100 border border-secondary-300 dark:border-secondary-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        {/* Destacado */}
        <div className="md:col-span-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              name="featured"
              checked={formData.featured}
              onChange={handleChange}
              className="w-4 h-4 text-primary-600 dark:text-primary-500 border-secondary-300 dark:border-secondary-600 rounded focus:ring-primary-500 bg-white dark:bg-secondary-900"
            />
            <span className="text-sm font-medium text-secondary-700 dark:text-secondary-300">Proyecto Destacado</span>
          </label>
        </div>
      </div>

      {/* Botones */}
      <div className="flex gap-4 pt-4 border-t border-secondary-200 dark:border-secondary-700">
        <Button type="submit" variant="primary" size="lg" disabled={loading} className="flex-1">
          {loading ? 'Guardando...' : isEditing ? 'Actualizar' : 'Crear Proyecto'}
        </Button>
        <Button type="button" variant="outline" size="lg" onClick={onCancel}>
          Cancelar
        </Button>
      </div>
    </form>
  );
}
