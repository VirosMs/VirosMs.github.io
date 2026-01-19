# Portfolio Profesional - virosms.com

Portfolio profesional dinámico con panel de administración, construido con React, TypeScript, Tailwind CSS y Supabase.

## 🚀 Características

- **Frontend Moderno**: React 18 + TypeScript + Tailwind CSS v3
- **Build Tool**: Vite para desarrollo rápido
- **Backend**: Supabase (PostgreSQL + Autenticación + Storage)
- **Responsive**: Diseño mobile-first completamente responsive
- **SEO Optimizado**: Meta tags y estructura semántica
- **Panel Admin**: CRUD de proyectos protegido con JWT

## 📋 Prerequisitos

- Node.js 18+ y npm/yarn/pnpm
- Cuenta de Supabase (para el siguiente paso)
- Git

## 🛠️ Instalación

1. **Clonar el repositorio** (o usar este proyecto directamente)

2. **Instalar dependencias**:
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**:
   ```bash
   cp .env.example .env
   ```
   
   Edita `.env` y agrega tus credenciales:
   ```env
   # Supabase
   VITE_SUPABASE_URL=tu_url_de_supabase
   VITE_SUPABASE_ANON_KEY=tu_anon_key
   VITE_ADMIN_SECRET=tu_secret_key
   
   # Email API
   VITE_EMAIL_API_URL=https://resendemailapi.onrender.com/api/send-email
   VITE_EMAIL_API_KEY=tu_api_key_del_email_api
   
   # Cloudflare Turnstile (para protección del formulario de contacto)
   VITE_CLOUDFLARE_SITE_KEY=tu_cloudflare_site_key
   CLOUDFLARE_SECRETE_KEY=tu_cloudflare_secret_key
   ```

4. **Iniciar servidor de desarrollo**:
   ```bash
   npm run dev
   ```

5. **Abrir en el navegador**:
   ```
   http://localhost:5173
   ```

## 📁 Estructura del Proyecto

```
portfolio-v2/
├── src/
│   ├── components/
│   │   ├── common/          # Componentes reutilizables
│   │   │   └── Button.tsx
│   │   └── layout/          # Componentes de layout
│   │       ├── Navbar.tsx
│   │       ├── Footer.tsx
│   │       └── Layout.tsx
│   ├── pages/               # Páginas principales
│   │   ├── Home.tsx
│   │   ├── Projects.tsx
│   │   ├── Admin.tsx
│   │   └── NotFound.tsx
│   ├── lib/                 # Configuración de librerías
│   │   └── supabase.ts      # Cliente de Supabase
│   ├── services/            # Servicios de datos
│   │   └── projectService.ts # CRUD de proyectos
│   ├── hooks/               # Custom hooks
│   │   └── useAuth.ts       # Hook de autenticación
│   ├── types/               # Tipos TypeScript
│   │   ├── project.ts       # Tipos de proyectos
│   │   └── database.ts      # Tipos de Supabase
│   ├── utils/               # Utilidades
│   │   └── classnames.ts
│   ├── App.tsx              # Router principal
│   ├── main.tsx             # Entry point
│   └── index.css            # Estilos globales Tailwind
├── supabase/                # Scripts de Supabase
│   ├── schema.sql           # Esquema de base de datos
│   └── *.sql                # Scripts SQL adicionales
├── public/                  # Archivos estáticos
├── .env.example             # Template de variables de entorno
├── package.json
├── tsconfig.json            # Configuración TypeScript
├── vite.config.ts           # Configuración Vite
├── tailwind.config.ts       # Configuración Tailwind
└── README.md
```

## 🎨 Tecnologías Utilizadas

- **React 18**: Biblioteca UI
- **TypeScript 5**: Tipado estático
- **Vite**: Build tool y dev server
- **Tailwind CSS 3**: Framework CSS utility-first
- **React Router 6**: Enrutamiento
- **Supabase**: Backend as a Service (PostgreSQL + Auth + Storage)
- **Cloudflare Turnstile**: Protección anti-spam en formularios

## 📝 Scripts Disponibles

- `npm run dev`: Inicia servidor de desarrollo
- `npm run build`: Construye para producción
- `npm run preview`: Previsualiza build de producción
- `npm run lint`: Ejecuta ESLint
- `npm run format`: Formatea código con Prettier

## 🔧 Configuración de Supabase

### Paso 1: Crear Proyecto en Supabase

1. Ve a [supabase.com](https://supabase.com) y crea una cuenta
2. Crea un nuevo proyecto
3. Anota tu **Project URL** y **anon/public key** (los encontrarás en Settings > API)

### Paso 2: Configurar la Base de Datos

1. En el dashboard de Supabase, ve a **SQL Editor**
2. Abre el archivo `supabase/schema.sql` de este proyecto
3. Copia y pega todo el contenido en el SQL Editor
4. Ejecuta el script (botón "Run")
5. Verifica que la tabla `projects` se haya creado correctamente (ve a **Table Editor**)

### Paso 3: Configurar Storage para Imágenes

1. Ve a **Storage** en el dashboard
2. Crea un nuevo bucket llamado `project-images`
3. Márcalo como **Public bucket**
4. Configura las políticas de acceso RLS (Row Level Security) para permitir lectura pública

### Paso 4: Configurar Variables de Entorno

1. Copia `.env.example` a `.env`:
   ```bash
   cp .env.example .env
   ```

2. Edita `.env` y agrega tus credenciales:
   ```env
   # Supabase
   VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
   VITE_SUPABASE_ANON_KEY=tu_anon_key_aqui
   VITE_ADMIN_SECRET=tu_secret_key_segura_aqui
   
   # Email API
   VITE_EMAIL_API_URL=https://resendemailapi.onrender.com/api/send-email
   VITE_EMAIL_API_KEY=tu_api_key_del_email_api
   
   # Cloudflare Turnstile (protección anti-spam)
   VITE_CLOUDFLARE_SITE_KEY=tu_cloudflare_site_key
   CLOUDFLARE_SECRETE_KEY=tu_cloudflare_secret_key
   ```

3. **Importante**: Genera un `VITE_ADMIN_SECRET` seguro (puedes usar un generador de strings aleatorios)

### Paso 5: Generar Tipos TypeScript (Opcional pero Recomendado)

Para tener tipos automáticos de tu base de datos:

```bash
npx supabase gen types typescript --project-id YOUR_PROJECT_ID > src/types/database.ts
```

O instala la CLI de Supabase:
```bash
npm install -g supabase
supabase gen types typescript --project-id YOUR_PROJECT_ID > src/types/database.ts
```

### Paso 6: Verificar la Conexión

1. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

2. Abre la consola del navegador y verifica que no haya errores de conexión a Supabase

## 🔄 Próximos Pasos

### Tercer Paso: Página Home Completa

### Tercer Paso: Página Home Completa
1. Implementar sección Hero
2. Agregar sección "Sobre mí"
3. Mostrar especialidades y tecnologías
4. Timeline de experiencia
5. Sección de idiomas
6. Top 4 proyectos destacados
7. Formulario de contacto

### Cuarto Paso: Página Projects
1. Galería de proyectos con cards
2. Filtros por categoría y tecnología
3. Modal detallado de proyectos
4. Integración con Supabase

### Quinto Paso: Admin Panel ✅ COMPLETADO
1. ✅ Autenticación con secret key
2. ✅ CRUD completo de proyectos
3. ✅ Upload de imágenes a Supabase Storage
4. ✅ Validación de formularios
5. ✅ Ruta oculta: `/panel-gestion`

### Sexto Paso: Protección con Cloudflare Turnstile ✅ COMPLETADO
1. ✅ Integración de Cloudflare Turnstile en formulario de contacto
2. ✅ Validación del token en el frontend
3. ✅ El backend debe verificar el token antes de enviar emails

### Séptimo Paso: Deploy a GitHub Pages ✅ CONFIGURADO
1. ✅ Workflow de GitHub Actions configurado (`.github/workflows/deploy.yml`)
2. ✅ Se despliega automáticamente al hacer push a `main`
3. ⚠️ **IMPORTANTE**: Las variables de entorno necesitan configurarse en el repositorio (Settings > Secrets)
4. Verificar que Cloudflare Turnstile funcione correctamente en producción
5. Si usas dominio personalizado, configúralo en Settings > Pages > Custom domain

## 🔒 Seguridad

- **Cloudflare Turnstile**: Protege el formulario de contacto contra spam y bots
- **Variables de entorno**: Todas las claves sensibles están en `.env` (no commitear)
- **Admin Panel**: Protegido con secret key
- **Supabase RLS**: Row Level Security configurado en la base de datos

## ⚠️ Importante para Producción

1. **NUNCA** commitees el archivo `.env` (está en `.gitignore`)
2. **Variables de entorno en GitHub Pages**: 
   - Ve a Settings > Secrets and variables > Actions en tu repositorio
   - Agrega todas las variables que empiezan con `VITE_` como secrets
   - El workflow las usará durante el build automáticamente
3. El backend debe verificar el token de Turnstile antes de procesar el email
4. Usa claves de producción de Cloudflare Turnstile (no las de prueba)
5. **Habilitar GitHub Pages**: Ve a Settings > Pages y asegúrate de que esté configurado para usar GitHub Actions

## 🚀 Deploy a GitHub Pages

El proyecto está configurado para desplegarse automáticamente a GitHub Pages usando GitHub Actions.

### Configuración Inicial:

1. **Habilita GitHub Pages** en tu repositorio:
   - Ve a Settings > Pages
   - En "Source", selecciona "GitHub Actions"

2. **Configura los Secrets** (Settings > Secrets and variables > Actions):
   ```
   VITE_SUPABASE_URL
   VITE_SUPABASE_ANON_KEY
   VITE_ADMIN_SECRET
   VITE_EMAIL_API_URL
   VITE_EMAIL_API_KEY
   VITE_CLOUDFLARE_SITE_KEY
   ```

3. **Haz push a la rama `main`**:
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

4. El workflow se ejecutará automáticamente y desplegará el sitio a GitHub Pages.

5. Tu sitio estará disponible en: `https://virosms.github.io` (o tu dominio personalizado)

## 🎯 Características del Tema

El proyecto usa un tema profesional con:
- **Colores primarios**: Azules (#3b82f6 - #1e3a8a)
- **Colores secundarios**: Grises (#f8fafc - #020617)
- **Colores de acento**: Cyan/Azul claro (#0ea5e9 - #082f49)
- **Tipografía**: Inter (Google Fonts)

## 📄 Licencia

Este proyecto es de uso personal/profesional.

## 👤 Autor

Desarrollado para virosms.com

---

**Nota**: Este es el setup inicial. Las funcionalidades completas se implementarán en los siguientes pasos.
