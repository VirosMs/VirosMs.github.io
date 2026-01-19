import { experience } from '@/data/profile';

const monthNames = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

function formatDate(dateStr: string | undefined): string {
  if (!dateStr || dateStr === 'Present' || dateStr === 'Actualidad') {
    return 'Actualidad';
  }
  const parts = dateStr.split('-');
  if (parts.length < 2) {
    return dateStr;
  }
  const [year, month] = parts;
  const monthIndex = parseInt(month || '1', 10) - 1;
  return `${monthNames[monthIndex]} ${year}`;
}

export default function Experience() {
  return (
    <section id="experience" className="section-padding">
      <div className="container-custom">
        <h2 className="text-center mb-12">Experiencia</h2>
        
        <div className="max-w-3xl mx-auto">
          <div className="space-y-8">
            {experience.map((exp, index) => (
              <div key={exp.id} className="relative group">
                {/* Timeline line */}
                {index < experience.length - 1 && (
                  <div className="absolute left-6 top-16 bottom-0 w-0.5 bg-secondary-200 dark:bg-secondary-700" />
                )}
                
                <div className="flex gap-6">
                  {/* Timeline dot */}
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-primary-600 dark:bg-primary-500 flex items-center justify-center text-white font-semibold transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg">
                      {index + 1}
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="flex-grow pb-8">
                    <div className="bg-white dark:bg-secondary-800 p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 border border-secondary-200 dark:border-secondary-700 hover:-translate-y-1 hover:scale-[1.02] cursor-pointer group">
                      <div className="mb-3">
                        <h3 className="text-xl font-semibold text-secondary-900 dark:text-secondary-100 transition-colors duration-300 group-hover:text-primary-600 dark:group-hover:text-primary-400">
                          {exp.position}
                        </h3>
                        <p className="text-lg text-primary-600 dark:text-primary-400 font-medium mb-2 transition-transform duration-300 group-hover:translate-x-1">{exp.company}</p>
                        <div className="text-sm text-secondary-600 dark:text-secondary-400">
                          {formatDate(exp.startDate)} – {formatDate(exp.endDate)} · {exp.location}
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <p className="text-sm font-semibold text-secondary-800 dark:text-secondary-200 mb-2">Responsabilidades destacadas:</p>
                        <ul className="list-disc list-inside space-y-1 text-secondary-700 dark:text-secondary-300 leading-relaxed">
                          {exp.description.split('\n').map((item, idx) => (
                            <li key={idx}>{item}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="text-xs bg-secondary-100 dark:bg-secondary-700 text-secondary-700 dark:text-secondary-300 px-3 py-1 rounded-full"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
