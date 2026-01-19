# 📝 Personalización de Datos del Perfil

Este directorio contiene los datos que se muestran en tu portfolio. Personaliza estos archivos con tu información real.

## 📄 Archivo: `profile.ts`

Este archivo contiene todos los datos de tu perfil profesional:

### Datos que puedes personalizar:

1. **`summary`** - Resumen profesional corto (1-2 líneas)
2. **`aboutMe`** - Descripción más detallada sobre ti
3. **`specialties`** - Tus especialidades (Frontend, Backend, etc.)
4. **`technologies`** - Tecnologías que manejas con su nivel
5. **`experience`** - Tu historial laboral
6. **`languages`** - Idiomas que hablas
7. **`contactInfo`** - Información de contacto y redes sociales

### Ejemplo de personalización:

```typescript
export const summary = `Tu resumen profesional aquí`;

export const aboutMe = `Tu descripción personal aquí...`;

export const specialties: Specialty[] = [
  {
    id: '1',
    title: 'Tu Especialidad',
    description: 'Descripción de tu especialidad',
    icon: '💻', // Puedes usar emojis o iconos
  },
];

export const technologies: Technology[] = [
  { name: 'React', category: 'Frontend', level: 'Expert' },
  // Agrega más tecnologías...
];

export const experience: Experience[] = [
  {
    id: '1',
    company: 'Nombre de la Empresa',
    position: 'Tu Posición',
    startDate: '2023-01', // Formato: YYYY-MM
    endDate: 'Present', // o '2024-12'
    description: 'Descripción de tus responsabilidades',
    technologies: ['React', 'TypeScript'],
    location: 'Ciudad, País',
  },
];

export const languages: Language[] = [
  { name: 'Español', level: 'Native' },
  { name: 'Inglés', level: 'Advanced', certification: 'TOEFL' },
];

export const contactInfo: ContactInfo = {
  email: 'tu-email@ejemplo.com',
  phone: '+34 123 456 789',
  location: 'Tu Ubicación',
  linkedin: 'https://linkedin.com/in/tu-perfil',
  github: 'https://github.com/tu-usuario',
  twitter: 'https://twitter.com/tu-usuario',
  website: 'https://tu-website.com',
};
```

## 🎨 Niveles de Tecnología

Los niveles disponibles son:
- `'Beginner'` - Principiante
- `'Intermediate'` - Intermedio
- `'Advanced'` - Avanzado
- `'Expert'` - Experto

## 📅 Formato de Fechas

Las fechas deben estar en formato `YYYY-MM`:
- Ejemplo: `'2023-01'` para enero de 2023
- Para fechas actuales, usa `'Present'`

## 🔄 Después de Personalizar

Una vez que personalices los datos:

1. Guarda los cambios
2. El servidor de desarrollo se recargará automáticamente
3. Verifica que toda la información se muestre correctamente en la página Home

## 💡 Consejos

- Mantén las descripciones concisas pero informativas
- Usa emojis en los iconos de especialidades para hacerlo más visual
- Actualiza regularmente tu experiencia y tecnologías
- Asegúrate de que los enlaces de redes sociales sean correctos
