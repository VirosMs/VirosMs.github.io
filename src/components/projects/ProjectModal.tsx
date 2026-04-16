import { useEffect, useState } from 'react';
import type { Project } from '@/types/project';
import { cn } from '@/utils/classnames';
import Button from '@/components/common/Button';

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [enlargedImage, setEnlargedImage] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setCurrentImageIndex(0);
      setEnlargedImage(null);
    }
  }, [isOpen, project]);

  const maxIndex = project ? Math.max(0, (project.images?.length || 0) - 2) : 0;

  const nextImage = () => {
    if (!project?.images) return;
    setCurrentImageIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevImage = () => {
    if (!project?.images) return;
    setCurrentImageIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

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
              {project.images.length > 2 ? (
                <div className="relative group rounded-lg overflow-hidden border border-secondary-200 dark:border-secondary-700 bg-secondary-50 dark:bg-secondary-800">
                  <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentImageIndex * 50}%)` }}>
                    {project.images.map((image, index) => (
                      <div key={index} className="w-1/2 flex-shrink-0 px-2 flex justify-center items-center">
                        <div onClick={() => setEnlargedImage(image)} className="block w-full cursor-zoom-in">
                          <img
                            src={image}
                            alt={`${project.title} - Screenshot ${index + 1}`}
                            className="w-full h-auto object-contain max-h-[500px] rounded-lg hover:opacity-90 transition-opacity"
                            loading="lazy"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* Controles del Carrusel */}
                  <button
                    onClick={prevImage}
                    className="absolute top-1/2 left-2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
                    aria-label="Anterior"
                  >
                    ❮
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute top-1/2 right-2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
                    aria-label="Siguiente"
                  >
                    ❯
                  </button>
                  {/* Indicadores */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {Array.from({ length: maxIndex + 1 }).map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={cn(
                          "w-2.5 h-2.5 rounded-full transition-colors",
                          currentImageIndex === index ? "bg-white" : "bg-white/50 hover:bg-white/80"
                        )}
                        aria-label={`Ir a la vista ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {project.images.map((image, index) => (
                    <div key={index} className="rounded-lg overflow-hidden border border-secondary-200 dark:border-secondary-700">
                      <div onClick={() => setEnlargedImage(image)} className="block w-full h-full cursor-zoom-in">
                        <img
                          src={image}
                          alt={`${project.title} - Screenshot ${index + 1}`}
                          className="w-full h-auto hover:opacity-90 transition-opacity"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
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
            {project.repositoryUrl && (
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
            )}
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

      {/* Lightbox para imágenes */}
      {enlargedImage && (
        <div 
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-8 bg-black/95 cursor-zoom-out animate-fade-in"
          onClick={(e) => {
            e.stopPropagation();
            setEnlargedImage(null);
          }}
        >
          <img 
            src={enlargedImage} 
            alt="Vista ampliada" 
            className="w-auto h-auto max-w-full max-h-full object-contain select-none shadow-2xl rounded-sm"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            className="absolute top-4 right-4 md:top-8 md:right-8 bg-black/50 text-white rounded-full p-2 hover:bg-black/80 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              setEnlargedImage(null);
            }}
            aria-label="Cerrar imagen"
          >
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
