import type { Specialty, Technology, Experience, Language, ContactInfo } from '@/types/profile';

/**
 * Datos del perfil profesional
 * Personaliza estos datos con tu información
 */

export const specialties: Specialty[] = [
  {
    id: '1',
    title: 'Desarrollo Backend con Java & Spring Boot',
    description: 'Diseño de APIs REST, arquitectura limpia, validación, seguridad, integración con bases de datos SQL y NoSQL.',
    icon: '☕',
  },
  {
    id: '2',
    title: 'Modelado de Datos y Persistencia',
    description: 'Experiencia en SQL, JPA/Hibernate, Cassandra, diseño de entidades, value objects y estrategias de escalabilidad.',
    icon: '🗄️',
  },
  {
    id: '3',
    title: 'Integración Frontend–Backend',
    description: 'Resolución avanzada de problemas de CORS, autenticación, comunicación entre servicios y despliegues locales o en la nube.',
    icon: '🔗',
  },
  {
    id: '4',
    title: 'Automatización con IA aplicada al desarrollo',
    description: 'Uso de agentes, asistentes y herramientas de IA para acelerar tareas de programación, documentación y pruebas.',
    icon: '🤖',
  },
  {
    id: '5',
    title: 'Integración de IA en productos y servicios',
    description: 'Diseño de flujos que combinan APIs, modelos de lenguaje y sistemas backend.',
    icon: '🧠',
  },
  {
    id: '6',
    title: 'Optimización de procesos con IA',
    description: 'Aplicación de modelos para análisis, clasificación, generación de contenido y soporte técnico.',
    icon: '⚡',
  },
];

export const technologies: Technology[] = [
  // Frontend
  { name: 'React', category: 'Frontend', level: 'Beginner' },
  { name: 'TypeScript', category: 'Frontend', level: 'Intermediate' },
  { name: 'Tailwind CSS', category: 'Frontend', level: 'Beginner' },
  
  // Backend - Lenguajes y Frameworks
  { name: 'Java', category: 'Backend', level: 'Expert' },
  { name: 'Spring Boot', category: 'Backend', level: 'Expert' },
  { name: 'Spring Security', category: 'Backend', level: 'Intermediate' },
  { name: 'Kotlin', category: 'Backend', level: 'Intermediate' },
  
  // Backend - Arquitectura y Microservicios
  { name: 'Diseño de microservicios', category: 'Backend', level: 'Advanced' },
  { name: 'Spring Cloud', category: 'Backend', level: 'Advanced' },
  { name: 'Observabilidad (logs, métricas, trazas)', category: 'Backend', level: 'Advanced' },
  
  // Backend - APIs y Contratos
  { name: 'APIs REST', category: 'Backend', level: 'Expert' },
  { name: 'Swagger / OpenAPI', category: 'Backend', level: 'Advanced' },
  { name: 'JWT / OAuth2', category: 'Backend', level: 'Advanced' },
  
  // Backend - Persistencia
  { name: 'JPA / Hibernate', category: 'Backend', level: 'Expert' },
  { name: 'Spring Data', category: 'Backend', level: 'Advanced' },
  
  // Bases de Datos
  { name: 'Oracle', category: 'Database', level: 'Advanced' },
  { name: 'MySQL', category: 'Database', level: 'Advanced' },
  { name: 'PostgreSQL', category: 'Database', level: 'Advanced' },
  { name: 'MongoDB', category: 'Database', level: 'Intermediate' },
  { name: 'Cassandra', category: 'Database', level: 'Intermediate' },
  
  // DevOps
  { name: 'Docker', category: 'DevOps', level: 'Intermediate' },
  { name: 'Git / GitHub', category: 'DevOps', level: 'Advanced' },
  { name: 'CI/CD', category: 'DevOps', level: 'Beginner' },
  
  // Mobile
  { name: 'Kotlin (Android)', category: 'Mobile', level: 'Intermediate' },
  { name: 'Flutter / Dart', category: 'Mobile', level: 'Intermediate' },
  { name: 'React Native', category: 'Mobile', level: 'Beginner' },
];

export const experience: Experience[] = [
  {
    id: '1',
    company: 'NTT DATA Europe & Latam',
    position: 'Junior Developer 3',
    startDate: '2025-07',
    endDate: 'Present',
    description: 'Desarrollo de microservicios y APIs REST con Java y Spring.\nGestión de bases de datos Oracle y DB2.\nAutomatización de pruebas con JUnit y Mockito.\nGestión de incidencias y soporte técnico en entornos productivos.\nTrabajo en entornos ágiles (Scrum).',
    technologies: ['Java', 'Spring', 'Spring Boot', 'Oracle', 'DB2', 'JUnit', 'Mockito', 'Scrum'],
    location: 'Castellón, España',
  },
  {
    id: '2',
    company: 'NTT DATA Europe & Latam',
    position: 'Junior Developer 2',
    startDate: '2025-01',
    endDate: '2025-07',
    description: 'Desarrollo de microservicios y dataservices con Spring Boot.\nDocumentación de APIs con Swagger/OpenAPI.\nUso de Postman para pruebas de endpoints.\nIntegración con sistemas IBM InfoSphere.\nTrabajo con SQL, YAML y herramientas de desarrollo como IntelliJ y VS Code.',
    technologies: ['Spring Boot', 'Swagger', 'OpenAPI', 'Postman', 'IBM InfoSphere', 'SQL', 'YAML', 'IntelliJ', 'VS Code'],
    location: 'Castellón, España',
  },
  {
    id: '3',
    company: 'NTT DATA Europe & Latam',
    position: 'Junior Developer 1',
    startDate: '2024-07',
    endDate: '2025-01',
    description: 'Desarrollo backend con Java y Spring Framework.\nImplementación de microservicios y mantenimiento de infraestructura software.',
    technologies: ['Java', 'Spring Framework', 'Microservicios'],
    location: 'Castellón, España',
  },
  {
    id: '4',
    company: 'NTT DATA Europe & Latam',
    position: 'Student Internship',
    startDate: '2023-10',
    endDate: '2024-06',
    description: 'Desarrollo de APIs REST y microservicios.\nPruebas de software y validación funcional.\nTrabajo con SQL, Git, MySQL y Postman.\nParticipación en equipos ágiles (Scrum).',
    technologies: ['APIs REST', 'Microservicios', 'SQL', 'Git', 'MySQL', 'Postman', 'Scrum'],
    location: 'Castellón, España',
  },
  {
    id: '5',
    company: 'Hospital Universitario de la Plana',
    position: 'IT Technician',
    startDate: '2022-03',
    endDate: '2022-07',
    description: 'Soporte técnico y resolución de incidencias.\nMantenimiento de hardware y asistencia a usuarios.',
    technologies: ['Soporte Técnico', 'Hardware', 'Resolución de Incidencias'],
    location: 'Vila-real, España',
  },
];

export const languages: Language[] = [
  { name: 'Español', level: 'Native' },
  { name: 'Inglés', level: 'Intermediate' },
  { name: 'Portugués', level: 'Native' },
];

export const contactInfo: ContactInfo = {
  email: 'contact@virosms.com',
  location: 'España',
  linkedin: 'https://www.linkedin.com/in/charlesarrudasantos-vms092/',
  github: 'https://github.com/VirosMs',
  website: 'https://virosms.com',
};

export const aboutMe = `¡Mucho gusto!
Soy Charles Arruda Santos, desarrollador backend especializado en la construcción de microservicios y APIs REST robustas, seguras y escalables. Disfruto transformar problemas complejos en soluciones claras y eficientes, apoyándome en tecnologías como Spring Boot, Spring Cloud, Spring Security, OAuth2, JWT, Kotlin, Java, React Native, TypeScript, Flutter y Dart.

Mi enfoque combina buenas prácticas, arquitectura limpia y un fuerte compromiso con la calidad del software. Me motiva crear sistemas que no solo funcionen, sino que sean mantenibles, predecibles y preparados para crecer.

Actualmente estoy ampliando mis habilidades hacia el desarrollo frontend, con el objetivo de convertirme en un desarrollador full stack capaz de entregar soluciones completas de extremo a extremo. Aprender nuevas tecnologías, experimentar y enfrentar desafíos es lo que más disfruto de esta profesión.

Si te interesa colaborar conmigo, estaré encantado de conocer tu proyecto y ayudarte a llevarlo al siguiente nivel.`;
