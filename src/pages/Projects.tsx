import { useState, useEffect } from 'react';
import { projectService } from '@/services/projectService';
import type { Project } from '@/types/project';
import ProjectCard from '@/components/projects/ProjectCard';
import ProjectFilters from '@/components/projects/ProjectFilters';
import ProjectModal from '@/components/projects/ProjectModal';

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Cargar proyectos desde Supabase
  useEffect(() => {
    const loadProjects = async () => {
      try {
        setLoading(true);
        const allProjects = await projectService.getAll();
        setProjects(allProjects);
        setFilteredProjects(allProjects);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al cargar proyectos');
        console.error('Error loading projects:', err);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  // Abrir modal con proyecto
  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  // Cerrar modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  if (loading) {
    return (
      <div className="container-custom section-padding dark:bg-secondary-900">
        <div className="text-center mb-12">
          <h1 className="mb-4 dark:text-secondary-100">Proyectos</h1>
          <p className="text-lg text-secondary-600 dark:text-secondary-400 max-w-2xl mx-auto">
            Galería completa de proyectos desarrollados
          </p>
        </div>

        {/* Skeleton loading */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-secondary-100 dark:bg-secondary-800 rounded-lg h-96 animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container-custom section-padding dark:bg-secondary-900">
        <div className="text-center mb-12">
          <h1 className="mb-4 dark:text-secondary-100">Proyectos</h1>
          <p className="text-lg text-secondary-600 dark:text-secondary-400 max-w-2xl mx-auto">
            Galería completa de proyectos desarrollados
          </p>
        </div>

        <div className="text-center py-12">
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 max-w-md mx-auto">
            <h3 className="text-lg font-semibold text-red-800 dark:text-red-400 mb-2">Error al cargar proyectos</h3>
            <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
            <p className="text-sm text-red-500 dark:text-red-400">
              Asegúrate de que Supabase esté configurado correctamente y que existan proyectos en la base de datos.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-custom section-padding dark:bg-secondary-900">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="mb-4 dark:text-secondary-100">Proyectos</h1>
        <p className="text-lg text-secondary-600 dark:text-secondary-400 max-w-2xl mx-auto">
          Galería completa de proyectos desarrollados
        </p>
        {projects.length > 0 && (
          <p className="text-sm text-secondary-500 dark:text-secondary-400 mt-2">
            Mostrando {filteredProjects.length} de {projects.length} proyectos
          </p>
        )}
      </div>

      {/* Filtros */}
      {projects.length > 0 && (
        <ProjectFilters projects={projects} onFilterChange={setFilteredProjects} />
      )}

      {/* Galería de Proyectos */}
      {filteredProjects.length === 0 ? (
        <div className="text-center py-12">
          <div className="bg-secondary-50 dark:bg-secondary-800 border border-secondary-200 dark:border-secondary-700 rounded-lg p-6 max-w-md mx-auto">
            <p className="text-secondary-600 dark:text-secondary-400 mb-2">No se encontraron proyectos</p>
            <p className="text-sm text-secondary-500 dark:text-secondary-400">
              {projects.length === 0
                ? 'Aún no hay proyectos. Agrega proyectos desde el panel de administración.'
                : 'Intenta ajustar los filtros de búsqueda.'}
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => handleProjectClick(project)}
              className="cursor-pointer"
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}
