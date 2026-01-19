import { aboutMe } from '@/data/profile';

export default function About() {
  return (
    <section id="about" className="section-padding bg-secondary-50 dark:bg-secondary-800/50">
      <div className="container-custom">
        <h2 className="text-center mb-12">Sobre mí</h2>
        
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Foto */}
            <div className="order-2 md:order-1">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-400 to-accent-400 rounded-2xl transform rotate-3 opacity-20 dark:opacity-10"></div>
                <img
                  src="/profile-photo.jpg"
                  alt="Charles Arruda Santos - Desarrollador Backend"
                  className="relative w-full h-auto rounded-2xl shadow-xl object-cover"
                  loading="lazy"
                />
              </div>
            </div>
            
            {/* Texto */}
            <div className="order-1 md:order-2">
              <div className="bg-white dark:bg-secondary-800 p-6 md:p-8 rounded-lg shadow-md border border-secondary-200 dark:border-secondary-700">
                <p className="text-secondary-700 dark:text-secondary-300 leading-relaxed whitespace-pre-line text-lg">
                  {aboutMe}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
