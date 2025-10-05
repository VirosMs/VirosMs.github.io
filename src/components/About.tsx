
const About = () => {
  return (
    <section id="about" className="py-20 px-[4%] lg:px-[8%] flex flex-col md:flex-row items-center justify-center gap-12">
      <div className="flex-1 max-w-md mx-auto">
        <img 
          src="/images/about-me.png" 
          alt="Charles Arruda Santos" 
          className="rounded-2xl grayscale w-full h-auto shadow-lg"
        />
      </div>
      <div className="flex-1 max-w-2xl">
        <h2 className="text-4xl font-bold text-dark-green dark:text-light-green">
          ¡Mucho Gusto! 
          <span className="block text-mint-2 font-bold">Soy Charles Arruda Santos.</span>
        </h2>
        <p className="mt-4 text-dark-green dark:text-light-green">
          Un desarrollador backend con experiencia en el desarrollo de microservicios y API Rest. Me apasiona la creación de soluciones eficientes y escalables, utilizando tecnologías como Spring Boot, Spring Cloud, Spring Security, OAuth2, JWT, Kotlin, Java, Flutter y Dart.
        </p>
        <p className="mt-4 text-dark-green dark:text-light-green">
          Actualmente, estoy aprendiendo frontend para convertirme en un desarrollador full stack, integrando soluciones tanto en el servidor como en la interfaz de usuario. Me encanta aprender nuevas tecnologías y enfrentar desafíos que me permitan crecer profesionalmente.
        </p>
        <p className="mt-4 text-dark-green dark:text-light-green">
          Si estás interesado en trabajar juntos, no dudes en contactarme. ¡Estoy ansioso por conocer tu proyecto y ayudarte a alcanzar tus objetivos!
        </p>
      </div>
    </section>
  )
}

export default About
