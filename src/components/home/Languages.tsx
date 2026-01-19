import { languages } from '@/data/profile';
import { cn } from '@/utils/classnames';

export default function Languages() {
  const levelLabels = {
    Basic: 'Básico',
    Intermediate: 'Intermedio',
    Advanced: 'Avanzado',
    Native: 'Nativo',
  };

  const levelColors = {
    Basic: 'bg-gray-200',
    Intermediate: 'bg-blue-200',
    Advanced: 'bg-green-200',
    Native: 'bg-purple-200',
  };

  const getLevelPercentage = (level: string) => {
    switch (level) {
      case 'Basic':
        return 25;
      case 'Intermediate':
        return 50;
      case 'Advanced':
        return 75;
      case 'Native':
        return 100;
      default:
        return 0;
    }
  };

  return (
    <section id="languages" className="section-padding bg-secondary-50 dark:bg-secondary-800/50">
      <div className="container-custom">
        <h2 className="text-center mb-12">Idiomas</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {languages.map((language) => (
            <div
              key={language.name}
              className="bg-white dark:bg-secondary-800 p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 border border-secondary-200 dark:border-secondary-700 hover:-translate-y-2 hover:scale-105 cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-secondary-900 dark:text-secondary-100 transition-colors duration-300 group-hover:text-primary-600 dark:group-hover:text-primary-400">{language.name}</h3>
                {language.certification && (
                  <span className="text-xs bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 px-2 py-1 rounded">
                    {language.certification}
                  </span>
                )}
              </div>
              
              <p className="text-sm text-secondary-600 dark:text-secondary-400 mb-3">
                {levelLabels[language.level]}
              </p>
              
              <div className="w-full bg-secondary-200 dark:bg-secondary-700 rounded-full h-2 overflow-hidden">
                <div
                  className={cn(
                    'h-2 rounded-full transition-all duration-500 group-hover:scale-y-125',
                    levelColors[language.level]
                  )}
                  style={{ width: `${getLevelPercentage(language.level)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
