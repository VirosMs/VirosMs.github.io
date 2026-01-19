import { technologies } from '@/data/profile';
import { cn } from '@/utils/classnames';

export default function Technologies() {
  const levelOrder = {
    Expert: 0,
    Advanced: 1,
    Intermediate: 2,
    Beginner: 3,
  };

  const technologiesByCategory = technologies.reduce(
    (acc, tech) => {
      if (!acc[tech.category]) {
        acc[tech.category] = [];
      }
      const categoryArray = acc[tech.category];
      if (categoryArray) {
        categoryArray.push(tech);
      }
      return acc;
    },
    {} as Record<string, typeof technologies>
  );

  // Ordenar tecnologías por nivel dentro de cada categoría
  Object.keys(technologiesByCategory).forEach((category) => {
    const categoryArray = technologiesByCategory[category];
    if (categoryArray) {
      categoryArray.sort((a, b) => {
        return levelOrder[a.level] - levelOrder[b.level];
      });
    }
  });

  const levelColors = {
    Beginner: 'bg-gray-100 text-gray-700',
    Intermediate: 'bg-blue-100 text-blue-700',
    Advanced: 'bg-green-100 text-green-700',
    Expert: 'bg-purple-100 text-purple-700',
  };

  const levelLabels = {
    Beginner: 'Iniciante',
    Intermediate: 'Medio',
    Advanced: 'Avanzado',
    Expert: 'Experto',
  };

  return (
    <section id="technologies" className="section-padding bg-secondary-50 dark:bg-secondary-800/50">
      <div className="container-custom">
        <h2 className="text-center mb-12">Tecnologías</h2>
        
        <div className="space-y-8">
          {Object.entries(technologiesByCategory).map(([category, techs]) => (
            <div key={category}>
              <h3 className="text-lg font-semibold mb-4 text-secondary-900 dark:text-secondary-100">{category}</h3>
              <div className="flex flex-wrap gap-3">
                {techs.map((tech) => (
                  <div
                    key={tech.name}
                    className="flex items-center gap-2 bg-white dark:bg-secondary-800 px-4 py-2 rounded-lg shadow-sm border border-secondary-200 dark:border-secondary-700"
                  >
                    <span className="font-medium text-secondary-900 dark:text-secondary-100">{tech.name}</span>
                    <span
                      className={cn(
                        'text-xs px-2 py-1 rounded-full font-medium',
                        levelColors[tech.level]
                      )}
                    >
                      {levelLabels[tech.level]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
