import type { Project } from '@/types/project';
import { cn } from '@/utils/classnames';

interface ProjectCardProps {
  project: Project;
  featured?: boolean;
}

export default function ProjectCard({ project, featured = false }: ProjectCardProps) {
  const categoryColors = {
    BackEnd: 'bg-red-100 text-red-800',
    FrontEnd: 'bg-blue-100 text-blue-800',
    Mobile: 'bg-green-100 text-green-800',
    FullStack: 'bg-purple-100 text-purple-800',
    DevOps: 'bg-orange-100 text-orange-800',
  };

  return (
    <div
      className={cn(
        'bg-white dark:bg-secondary-800 rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2 hover:scale-105 cursor-pointer group',
        featured && 'border-2 border-primary-200 dark:border-primary-700'
      )}
    >
      {/* Imagen */}
      <div className="relative h-48 overflow-hidden bg-secondary-100 dark:bg-secondary-700">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          loading="lazy"
        />
        {project.featured && (
          <span className="absolute top-2 right-2 bg-primary-600 text-white text-xs font-semibold px-2 py-1 rounded">
            Destacado
          </span>
        )}
      </div>

      {/* Contenido */}
      <div className="p-6">
        {/* Categoría */}
        <span
          className={cn(
            'inline-block px-3 py-1 text-xs font-semibold rounded-full mb-3',
            categoryColors[project.category]
          )}
        >
          {project.category}
        </span>

        {/* Título */}
        <h3 className="text-xl font-semibold mb-2 text-secondary-900 dark:text-secondary-100 transition-colors duration-300 group-hover:text-primary-600 dark:group-hover:text-primary-400">{project.title}</h3>

        {/* Descripción */}
        <p className="text-secondary-600 dark:text-secondary-400 text-sm mb-4 line-clamp-2">{project.description}</p>

        {/* Tecnologías */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="text-xs bg-secondary-100 dark:bg-secondary-700 text-secondary-700 dark:text-secondary-300 px-2 py-1 rounded transition-transform duration-300 group-hover:scale-105"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className="text-xs text-secondary-500">+{project.technologies.length - 3}</span>
          )}
        </div>

        {/* Botones */}
        <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center text-sm font-medium text-primary-600 hover:text-primary-700 py-2 px-4 border border-primary-300 rounded-lg hover:bg-primary-50 transition-colors"
            >
              Ver Demo
            </a>
          )}
          <a
            href={project.repositoryUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 text-center text-sm font-medium bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors"
          >
            Código
          </a>
        </div>
        
        {/* Indicador de click para ver más */}
        <div className="mt-3 text-center">
          <span className="text-xs text-secondary-500 dark:text-secondary-400 transition-colors duration-300 group-hover:text-primary-600 dark:group-hover:text-primary-400">Click para ver más detalles</span>
        </div>
      </div>
    </div>
  );
}
