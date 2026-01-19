import { useEffect, useState } from 'react';
import { projectService } from '@/services/projectService';
import type { Project } from '@/types/project';
import ProjectCard from '@/components/projects/ProjectCard';
import { Link } from 'react-router-dom';
import Button from '@/components/common/Button';

export default function FeaturedProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        setLoading(true);
        const featured = await projectService.getFeatured(4);
        setProjects(featured);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al cargar proyectos');
        console.error('Error loading featured projects:', err);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  if (loading) {
    return (
      <section id="projects" className="section-padding">
        <div className="container-custom">
          <h2 className="text-center mb-12">Proyectos Destacados</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-secondary-100 rounded-lg h-64 animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="projects" className="section-padding">
        <div className="container-custom">
          <h2 className="text-center mb-12">Proyectos Destacados</h2>
          <div className="text-center text-secondary-600 dark:text-secondary-400">
            <p>Error al cargar proyectos: {error}</p>
            <p className="text-sm mt-2">Asegúrate de que Supabase esté configurado correctamente.</p>
          </div>
        </div>
      </section>
    );
  }

  if (projects.length === 0) {
    return (
      <section id="projects" className="section-padding">
        <div className="container-custom">
          <h2 className="text-center mb-12">Proyectos Destacados</h2>
          <div className="text-center text-secondary-600 dark:text-secondary-400">
            <p>No hay proyectos destacados aún.</p>
            <p className="text-sm mt-2">Agrega proyectos desde el panel de administración.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="section-padding">
      <div className="container-custom">
        <h2 className="text-center mb-12">Proyectos Destacados</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} featured />
          ))}
        </div>
        
        <div className="text-center">
          <Link to="/projects">
            <Button variant="outline" size="lg">
              Ver Todos los Proyectos
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
