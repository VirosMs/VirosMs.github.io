import { useEffect } from 'react';
import type { Project } from '@/types/project';
import { cn } from '@/utils/classnames';
import Button from '@/components/common/Button';

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  // Cerrar con ESC
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!project || !isOpen) return null;

  const categoryColors = {
    BackEnd: 'bg-red-100 text-red-800',
    FrontEnd: 'bg-blue-100 text-blue-800',
    Mobile: 'bg-green-100 text-green-800',
    FullStack: 'bg-purple-100 text-purple-800',
    DevOps: 'bg-orange-100 text-orange-800',
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-secondary-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header con imagen */}
        <div className="relative h-64 md:h-80 overflow-hidden bg-secondary-100 dark:bg-secondary-700">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white dark:bg-secondary-800 rounded-full p-2 shadow-lg hover:bg-secondary-100 dark:hover:bg-secondary-700 transition-colors"
            aria-label="Cerrar modal"
          >
            <svg
              className="w-6 h-6 text-secondary-700 dark:text-secondary-300"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          {project.featured && (
            <span className="absolute top-4 left-4 bg-primary-600 dark:bg-primary-500 text-white text-sm font-semibold px-3 py-1 rounded-full">
              ⭐ Destacado
            </span>
          )}
        </div>

        {/* Contenido */}
        <div className="p-6 md:p-8">
          {/* Título y categoría */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
            <h2 className="text-3xl font-bold text-secondary-900 dark:text-secondary-100 mb-2 md:mb-0">
              {project.title}
            </h2>
            <span
              className={cn(
                'inline-block px-4 py-2 text-sm font-semibold rounded-full',
                categoryColors[project.category]
              )}
            >
              {project.category}
            </span>
          </div>

          {/* Descripción corta */}
          <p className="text-lg text-secondary-600 dark:text-secondary-400 mb-6">{project.description}</p>

          {/* Descripción larga */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-3 text-secondary-900 dark:text-secondary-100">Descripción</h3>
            <p className="text-secondary-700 dark:text-secondary-300 leading-relaxed whitespace-pre-line">
              {project.longDescription}
            </p>
          </div>

          {/* Screenshots */}
          {project.images && project.images.length > 0 && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-3 text-secondary-900 dark:text-secondary-100">Screenshots</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.images.map((image, index) => (
                  <div key={index} className="rounded-lg overflow-hidden border border-secondary-200 dark:border-secondary-700">
                    <img
                      src={image}
                      alt={`${project.title} - Screenshot ${index + 1}`}
                      className="w-full h-auto"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tecnologías */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-3 text-secondary-900 dark:text-secondary-100">Tecnologías</h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-secondary-100 dark:bg-secondary-700 text-secondary-700 dark:text-secondary-300 rounded-full text-sm font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Enlaces */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-secondary-200 dark:border-secondary-700">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1"
              >
                <Button variant="primary" size="lg" className="w-full">
                  🌐 Ver Proyecto en Vivo
                </Button>
              </a>
            )}
            <a
              href={project.repositoryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1"
            >
              <Button variant="outline" size="lg" className="w-full">
                💻 Ver Código
              </Button>
            </a>
            {project.documentationUrl && (
              <a
                href={project.documentationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1"
              >
                <Button variant="ghost" size="lg" className="w-full">
                  📚 Documentación
                </Button>
              </a>
            )}
          </div>

          {/* Fechas */}
          <div className="mt-6 pt-6 border-t border-secondary-200 dark:border-secondary-700 text-sm text-secondary-500 dark:text-secondary-400">
            <p>
              Creado: {new Date(project.createdAt).toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
            {project.updatedAt !== project.createdAt && (
              <p>
                Actualizado: {new Date(project.updatedAt).toLocaleDateString('es-ES', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
