import { specialties } from '@/data/profile';

export default function Specialties() {
  return (
    <section id="specialties" className="section-padding">
      <div className="container-custom">
        <h2 className="text-center mb-12">Especialidades</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {specialties.map((specialty) => (
            <div
              key={specialty.id}
              className="bg-white dark:bg-secondary-800 p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 border border-secondary-200 dark:border-secondary-700 hover:-translate-y-2 hover:scale-105 cursor-pointer group"
            >
              <div className="text-4xl mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                {specialty.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-secondary-900 dark:text-secondary-100 transition-colors duration-300 group-hover:text-primary-600 dark:group-hover:text-primary-400">
                {specialty.title}
              </h3>
              <p className="text-secondary-600 dark:text-secondary-400 leading-relaxed">{specialty.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
