import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { projectService } from '@/services/projectService';
import type { Project } from '@/types/project';
import AdminLogin from '@/components/admin/AdminLogin';
import ProjectTable from '@/components/admin/ProjectTable';
import ProjectForm from '@/components/admin/ProjectForm';
import Button from '@/components/common/Button';

export default function Admin() {
  const { isAdmin: isAdminFromHook, signOut } = useAuth();
  const [localIsAdmin, setLocalIsAdmin] = useState(() => {
    return localStorage.getItem('isAdmin') === 'true';
  });
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  // Usar el estado local o el del hook (el que sea true)
  const isAdmin = localIsAdmin || isAdminFromHook;

  // Sincronizar estado local con localStorage y hook
  useEffect(() => {
    const checkAdminStatus = () => {
      const isAdminFromStorage = localStorage.getItem('isAdmin') === 'true';
      setLocalIsAdmin(isAdminFromStorage);
    };

    // Verificar inmediatamente
    checkAdminStatus();

    // Escuchar evento de login
    const handleAdminLogin = () => {
      checkAdminStatus();
    };

    // Escuchar cambios en localStorage (por si se cambia desde otra pestaña)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'isAdmin') {
        checkAdminStatus();
      }
    };

    window.addEventListener('adminLogin', handleAdminLogin);
    window.addEventListener('storage', handleStorageChange);

    // Verificar periódicamente (fallback)
    const interval = setInterval(checkAdminStatus, 500);

    return () => {
      window.removeEventListener('adminLogin', handleAdminLogin);
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  // Sincronizar con el hook también
  useEffect(() => {
    if (isAdminFromHook) {
      setLocalIsAdmin(true);
    }
  }, [isAdminFromHook]);

  // Debug: Verificar estado de admin
  useEffect(() => {
    if (import.meta.env.DEV) {
      console.log('🔐 Estado de admin en componente Admin:', isAdmin);
      console.log('🔐 localStorage isAdmin:', localStorage.getItem('isAdmin'));
      console.log('🔐 isAdminFromHook:', isAdminFromHook);
      console.log('🔐 localIsAdmin:', localIsAdmin);
    }
  }, [isAdmin, isAdminFromHook, localIsAdmin]);

  // Cargar proyectos cuando el usuario es admin
  useEffect(() => {
    if (isAdmin) {
      loadProjects();
    }
  }, [isAdmin]);

  const loadProjects = async () => {
    try {
      setLoading(true);
      setError(null);
      const allProjects = await projectService.getAll();
      setProjects(allProjects);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar proyectos');
      console.error('Error loading projects:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLoginSuccess = () => {
    // El componente se re-renderizará automáticamente cuando isAdmin cambie
    // Solo necesitamos esperar un momento para que el estado se actualice
    setTimeout(() => {
      loadProjects();
    }, 100);
  };

  const handleLogout = async () => {
    try {
      await signOut();
      localStorage.removeItem('isAdmin');
      setProjects([]);
      setShowForm(false);
      setEditingProject(null);
    } catch (err) {
      console.error('Error logging out:', err);
    }
  };

  const handleCreate = () => {
    setEditingProject(null);
    setShowForm(true);
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setShowForm(true);
  };

  const handleDelete = async (projectId: string) => {
    try {
      await projectService.delete(projectId);
      await loadProjects();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al eliminar proyecto');
      console.error('Error deleting project:', err);
    }
  };

  const handleFormSuccess = async () => {
    setShowForm(false);
    setEditingProject(null);
    await loadProjects();
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingProject(null);
  };

  if (!isAdmin) {
    return (
      <div className="container-custom section-padding">
        <AdminLogin onLoginSuccess={handleLoginSuccess} />
      </div>
    );
  }

  return (
    <div className="container-custom section-padding">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-secondary-900 dark:text-secondary-100 mb-2">Panel de Administración</h1>
            <p className="text-secondary-600 dark:text-secondary-400">Gestiona tus proyectos desde aquí</p>
          </div>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Button variant="primary" size="lg" onClick={handleCreate} disabled={showForm}>
              + Nuevo Proyecto
            </Button>
            <Button variant="outline" size="lg" onClick={handleLogout}>
              Cerrar Sesión
            </Button>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
          </div>
        )}

        {/* Formulario o Tabla */}
        {showForm ? (
          <ProjectForm
            project={editingProject}
            onSuccess={handleFormSuccess}
            onCancel={handleFormCancel}
          />
        ) : (
          <>
            {/* Estadísticas */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-white dark:bg-secondary-800 rounded-lg shadow border border-secondary-200 dark:border-secondary-700 p-4">
                <p className="text-sm text-secondary-600 dark:text-secondary-400 mb-1">Total Proyectos</p>
                <p className="text-2xl font-bold text-secondary-900 dark:text-secondary-100">{projects.length}</p>
              </div>
              <div className="bg-white dark:bg-secondary-800 rounded-lg shadow border border-secondary-200 dark:border-secondary-700 p-4">
                <p className="text-sm text-secondary-600 dark:text-secondary-400 mb-1">Destacados</p>
                <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                  {projects.filter((p) => p.featured).length}
                </p>
              </div>
              <div className="bg-white dark:bg-secondary-800 rounded-lg shadow border border-secondary-200 dark:border-secondary-700 p-4">
                <p className="text-sm text-secondary-600 dark:text-secondary-400 mb-1">Categorías</p>
                <p className="text-2xl font-bold text-secondary-900 dark:text-secondary-100">
                  {new Set(projects.map((p) => p.category)).size}
                </p>
              </div>
            </div>

            {/* Tabla de proyectos */}
            <ProjectTable
              projects={projects}
              onEdit={handleEdit}
              onDelete={handleDelete}
              loading={loading}
            />
          </>
        )}
      </div>
    </div>
  );
}
