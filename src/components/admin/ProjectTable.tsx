import type { Project } from '@/types/project';
import { cn } from '@/utils/classnames';
import Button from '@/components/common/Button';

interface ProjectTableProps {
  projects: Project[];
  onEdit: (project: Project) => void;
  onDelete: (projectId: string) => void;
  loading?: boolean;
}

export default function ProjectTable({ projects, onEdit, onDelete, loading }: ProjectTableProps) {
  const categoryColors = {
    BackEnd: 'bg-red-100 text-red-800',
    FrontEnd: 'bg-blue-100 text-blue-800',
    Mobile: 'bg-green-100 text-green-800',
    FullStack: 'bg-purple-100 text-purple-800',
    DevOps: 'bg-orange-100 text-orange-800',
  };

  if (loading) {
    return (
      <div className="bg-white dark:bg-secondary-800 rounded-lg shadow border border-secondary-200 dark:border-secondary-700 p-8">
        <div className="animate-pulse space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-16 bg-secondary-100 dark:bg-secondary-700 rounded" />
          ))}
        </div>
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="bg-white dark:bg-secondary-800 rounded-lg shadow border border-secondary-200 dark:border-secondary-700 p-8 text-center">
        <p className="text-secondary-600 dark:text-secondary-400">No hay proyectos. Crea uno nuevo para comenzar.</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-secondary-800 rounded-lg shadow border border-secondary-200 dark:border-secondary-700 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-secondary-50 dark:bg-secondary-900">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-secondary-700 dark:text-secondary-300 uppercase tracking-wider">
                Proyecto
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-secondary-700 dark:text-secondary-300 uppercase tracking-wider">
                Categoría
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-secondary-700 dark:text-secondary-300 uppercase tracking-wider">
                Tecnologías
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-secondary-700 dark:text-secondary-300 uppercase tracking-wider">
                Destacado
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-secondary-700 dark:text-secondary-300 uppercase tracking-wider">
                Orden
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-secondary-700 dark:text-secondary-300 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-secondary-800 divide-y divide-secondary-200 dark:divide-secondary-700">
            {projects.map((project) => (
              <tr key={project.id} className="hover:bg-secondary-50 dark:hover:bg-secondary-700/50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-12 h-12 rounded-lg object-cover mr-3"
                    />
                    <div>
                      <div className="text-sm font-medium text-secondary-900 dark:text-secondary-100">{project.title}</div>
                      <div className="text-sm text-secondary-500 dark:text-secondary-400 line-clamp-1 max-w-xs">
                        {project.description}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={cn(
                      'px-2 py-1 text-xs font-semibold rounded-full',
                      categoryColors[project.category]
                    )}
                  >
                    {project.category}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-1">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="text-xs bg-secondary-100 dark:bg-secondary-700 text-secondary-700 dark:text-secondary-300 px-2 py-1 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="text-xs text-secondary-500 dark:text-secondary-400">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {project.featured ? (
                    <span className="text-primary-600 dark:text-primary-400 font-semibold">⭐ Sí</span>
                  ) : (
                    <span className="text-secondary-400 dark:text-secondary-500">No</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-600 dark:text-secondary-400">
                  {project.order}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEdit(project)}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => {
                        if (window.confirm(`¿Estás seguro de eliminar "${project.title}"?`)) {
                          onDelete(project.id);
                        }
                      }}
                    >
                      Eliminar
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
