import { useState, useMemo, useEffect } from 'react';
import type { Project, ProjectCategory } from '@/types/project';
import { cn } from '@/utils/classnames';
import Button from '@/components/common/Button';

interface ProjectFiltersProps {
  projects: Project[];
  onFilterChange: (filteredProjects: Project[]) => void;
}

export default function ProjectFilters({ projects, onFilterChange }: ProjectFiltersProps) {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory | 'All'>('All');
  const [selectedTechnologies, setSelectedTechnologies] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isTechModalOpen, setIsTechModalOpen] = useState(false);
  const [techSearchQuery, setTechSearchQuery] = useState('');

  // Obtener todas las categorías únicas
  const categories = useMemo(() => {
    const cats = new Set(projects.map((p) => p.category));
    return Array.from(cats);
  }, [projects]);

  // Obtener todas las tecnologías únicas
  const technologies = useMemo(() => {
    const techs = new Set<string>();
    projects.forEach((p) => {
      p.technologies.forEach((t) => techs.add(t));
    });
    return Array.from(techs).sort();
  }, [projects]);

  // Filtrar tecnologías para el modal
  const filteredTechnologies = useMemo(() => {
    if (!techSearchQuery.trim()) return technologies;
    const query = techSearchQuery.toLowerCase();
    return technologies.filter((tech) => tech.toLowerCase().includes(query));
  }, [technologies, techSearchQuery]);

  // Aplicar filtros
  useMemo(() => {
    let filtered = [...projects];

    // Filtro por categoría
    if (selectedCategory !== 'All') {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    // Filtro por tecnología (múltiple)
    if (selectedTechnologies.length > 0) {
      filtered = filtered.filter((p) =>
        selectedTechnologies.some((tech) => p.technologies.includes(tech))
      );
    }

    // Filtro por búsqueda
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.technologies.some((t) => t.toLowerCase().includes(query))
      );
    }

    onFilterChange(filtered);
  }, [selectedCategory, selectedTechnologies, searchQuery, projects, onFilterChange]);

  const resetFilters = () => {
    setSelectedCategory('All');
    setSelectedTechnologies([]);
    setSearchQuery('');
  };

  const hasActiveFilters = selectedCategory !== 'All' || selectedTechnologies.length > 0 || searchQuery.trim() !== '';

  const handleTechnologyToggle = (tech: string) => {
    setSelectedTechnologies((prev) => {
      if (prev.includes(tech)) {
        // Deseleccionar
        return prev.filter((t) => t !== tech);
      } else {
        // Seleccionar
        return [...prev, tech];
      }
    });
  };

  const handleSelectAll = () => {
    setSelectedTechnologies([]);
  };

  // Cerrar modal con ESC
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isTechModalOpen) {
        setIsTechModalOpen(false);
        setTechSearchQuery('');
      }
    };

    if (isTechModalOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isTechModalOpen]);

  return (
    <div className="space-y-6 mb-8">
      {/* Búsqueda */}
      <div className="max-w-md mx-auto">
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar proyectos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 pl-10 bg-white dark:bg-secondary-900 text-secondary-900 dark:text-secondary-100 border border-secondary-300 dark:border-secondary-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent placeholder:text-secondary-400 dark:placeholder:text-secondary-500"
          />
          <svg
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-secondary-400 dark:text-secondary-500"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {/* Filtros */}
      <div className="space-y-4">
        {/* Filtro por categoría */}
        <div>
          <h3 className="text-sm font-semibold text-secondary-700 dark:text-secondary-300 mb-3">Categoría</h3>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory('All')}
              className={cn(
                'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                selectedCategory === 'All'
                  ? 'bg-primary-600 dark:bg-primary-500 text-white'
                  : 'bg-secondary-100 dark:bg-secondary-700 text-secondary-700 dark:text-secondary-300 hover:bg-secondary-200 dark:hover:bg-secondary-600'
              )}
            >
              Todas
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={cn(
                  'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                  selectedCategory === category
                    ? 'bg-primary-600 dark:bg-primary-500 text-white'
                    : 'bg-secondary-100 dark:bg-secondary-700 text-secondary-700 dark:text-secondary-300 hover:bg-secondary-200 dark:hover:bg-secondary-600'
                )}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Filtro por tecnología */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-secondary-700 dark:text-secondary-300">
              Tecnología
              {selectedTechnologies.length > 0 && (
                <span className="ml-2 text-xs font-normal text-primary-600 dark:text-primary-400">
                  ({selectedTechnologies.length} seleccionada{selectedTechnologies.length > 1 ? 's' : ''})
                </span>
              )}
            </h3>
            {selectedTechnologies.length > 0 && (
              <button
                onClick={handleSelectAll}
                className="text-xs text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
              >
                Limpiar
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {selectedTechnologies.length > 0 && (
              <button
                onClick={handleSelectAll}
                className={cn(
                  'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                  'bg-secondary-100 dark:bg-secondary-700 text-secondary-700 dark:text-secondary-300 hover:bg-secondary-200 dark:hover:bg-secondary-600'
                )}
              >
                Todas
              </button>
            )}
            {technologies.slice(0, 6).map((tech) => (
              <button
                key={tech}
                onClick={() => handleTechnologyToggle(tech)}
                className={cn(
                  'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                  selectedTechnologies.includes(tech)
                    ? 'bg-primary-600 dark:bg-primary-500 text-white'
                    : 'bg-secondary-100 dark:bg-secondary-700 text-secondary-700 dark:text-secondary-300 hover:bg-secondary-200 dark:hover:bg-secondary-600'
                )}
              >
                {tech}
              </button>
            ))}
            {technologies.length > 6 && (
              <button
                onClick={() => setIsTechModalOpen(true)}
                className="px-4 py-2 rounded-lg text-sm font-medium transition-colors bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 hover:bg-primary-200 dark:hover:bg-primary-900/50 border border-primary-300 dark:border-primary-700"
              >
                Ver todas ({technologies.length})
              </button>
            )}
          </div>
          {/* Mostrar tecnologías seleccionadas que no están en las primeras 6 */}
          {selectedTechnologies.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {selectedTechnologies
                .filter((tech) => !technologies.slice(0, 6).includes(tech))
                .map((tech) => (
                  <span
                    key={tech}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 rounded-full text-sm"
                  >
                    {tech}
                    <button
                      onClick={() => handleTechnologyToggle(tech)}
                      className="text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-300 transition-colors"
                      aria-label={`Deseleccionar ${tech}`}
                    >
                      ×
                    </button>
                  </span>
                ))}
            </div>
          )}
        </div>
      </div>

      {/* Botón de reset */}
      {hasActiveFilters && (
        <div className="text-center">
          <Button variant="ghost" size="sm" onClick={resetFilters}>
            Limpiar Filtros
          </Button>
        </div>
      )}

      {/* Modal de tecnologías */}
      {isTechModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 animate-fade-in"
          onClick={() => {
            setIsTechModalOpen(false);
            setTechSearchQuery('');
          }}
        >
          <div
            className="bg-white dark:bg-secondary-800 rounded-lg max-w-2xl w-full max-h-[80vh] overflow-hidden shadow-2xl animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header del modal */}
            <div className="flex items-center justify-between p-6 border-b border-secondary-200 dark:border-secondary-700">
              <h3 className="text-xl font-bold text-secondary-900 dark:text-secondary-100">
                Todas las Tecnologías ({technologies.length})
              </h3>
              <button
                onClick={() => {
                  setIsTechModalOpen(false);
                  setTechSearchQuery('');
                }}
                className="text-secondary-500 dark:text-secondary-400 hover:text-secondary-700 dark:hover:text-secondary-300 transition-colors"
                aria-label="Cerrar modal"
              >
                <svg
                  className="w-6 h-6"
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
            </div>

            {/* Buscador dentro del modal */}
            <div className="p-6 border-b border-secondary-200 dark:border-secondary-700">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Buscar tecnología..."
                  value={techSearchQuery}
                  onChange={(e) => setTechSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 pl-10 bg-white dark:bg-secondary-900 text-secondary-900 dark:text-secondary-100 border border-secondary-300 dark:border-secondary-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent placeholder:text-secondary-400 dark:placeholder:text-secondary-500"
                  autoFocus
                />
                <svg
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-secondary-400 dark:text-secondary-500"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Lista de tecnologías */}
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              {filteredTechnologies.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-secondary-600 dark:text-secondary-400">
                    No se encontraron tecnologías que coincidan con "{techSearchQuery}"
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {selectedTechnologies.length > 0 && (
                    <div className="mb-4 pb-4 border-b border-secondary-200 dark:border-secondary-700">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-medium text-secondary-700 dark:text-secondary-300">
                          Seleccionadas ({selectedTechnologies.length})
                        </p>
                        <button
                          onClick={handleSelectAll}
                          className="text-xs text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
                        >
                          Limpiar todas
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {selectedTechnologies
                          .filter((tech) => filteredTechnologies.includes(tech))
                          .map((tech) => (
                            <button
                              key={tech}
                              onClick={() => handleTechnologyToggle(tech)}
                              className="px-4 py-2 rounded-lg text-sm font-medium transition-colors bg-primary-600 dark:bg-primary-500 text-white hover:bg-primary-700 dark:hover:bg-primary-600"
                            >
                              {tech} ×
                            </button>
                          ))}
                      </div>
                    </div>
                  )}
                  <div className="flex flex-wrap gap-2">
                    {filteredTechnologies.map((tech) => (
                      <button
                        key={tech}
                        onClick={() => handleTechnologyToggle(tech)}
                        className={cn(
                          'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                          selectedTechnologies.includes(tech)
                            ? 'bg-primary-600 dark:bg-primary-500 text-white'
                            : 'bg-secondary-100 dark:bg-secondary-700 text-secondary-700 dark:text-secondary-300 hover:bg-secondary-200 dark:hover:bg-secondary-600'
                        )}
                      >
                        {tech}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
