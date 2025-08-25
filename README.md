# CRM App - Aplicación de Gestión de Clientes

Una aplicación CRM moderna construida con React, TypeScript y Supabase para la gestión eficiente de clientes.

## 🚀 Características

- **Autenticación completa**: Login y registro de usuarios
- **Gestión de clientes**: CRUD completo (Crear, Leer, Actualizar, Eliminar)
- **Dashboard intuitivo**: Vista general con estadísticas
- **Búsqueda en tiempo real**: Filtrado de clientes por nombre, email o empresa
- **Diseño responsivo**: Optimizado para móviles y escritorio
- **Seguridad**: Row Level Security (RLS) en Supabase
- **Validación**: Formularios con validación Zod

## 🛠️ Stack Tecnológico

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Supabase (PostgreSQL + Auth)
- **Formularios**: React Hook Form + Zod
- **Routing**: React Router DOM
- **Estado**: React Context API

## 📋 Requisitos Previos

- Node.js 16+ 
- npm o yarn
- Cuenta de Supabase

## 🚀 Instalación

1. **Clonar el repositorio**
   ```bash
   git clone <tu-repositorio>
   cd crm-app
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   ```bash
   cp env.example .env.local
   ```
   
   Edita `.env.local` con tus credenciales de Supabase:
   ```env
   REACT_APP_SUPABASE_URL=tu_supabase_url
   REACT_APP_SUPABASE_ANON_KEY=tu_supabase_anon_key
   ```

4. **Configurar Supabase**
   
   En tu proyecto de Supabase, ejecuta el siguiente SQL para crear la tabla de clientes:

   ```sql
   -- Crear tabla de clientes
   CREATE TABLE clients (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
     updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
     name TEXT NOT NULL,
     email TEXT NOT NULL,
     phone TEXT NOT NULL,
     company TEXT NOT NULL,
     user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL
   );

   -- Habilitar RLS
   ALTER TABLE clients ENABLE ROW LEVEL SECURITY;

   -- Política para que los usuarios solo vean sus propios clientes
   CREATE POLICY "Users can only access their own clients" ON clients
     FOR ALL USING (auth.uid() = user_id);

   -- Crear índices para mejor rendimiento
   CREATE INDEX idx_clients_user_id ON clients(user_id);
   CREATE INDEX idx_clients_created_at ON clients(created_at);
   ```

5. **Ejecutar la aplicación**
   ```bash
   npm start
   ```

   La aplicación estará disponible en [http://localhost:3000](http://localhost:3000)

## 📱 Funcionalidades

### 🔐 Autenticación
- Registro de nuevos usuarios
- Login con email y contraseña
- Sesiones persistentes
- Rutas protegidas

### 👥 Gestión de Clientes
- **Crear**: Formulario para agregar nuevos clientes
- **Leer**: Lista de clientes con búsqueda y vista detallada
- **Actualizar**: Edición de información de clientes existentes
- **Eliminar**: Eliminación segura de clientes

### 📊 Dashboard
- Contador total de clientes
- Última actualización
- Lista de clientes recientes
- Acceso rápido a funciones principales

## 🏗️ Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── ClientDetail.tsx
│   ├── ClientForm.tsx
│   ├── ClientList.tsx
│   ├── Dashboard.tsx
│   ├── Login.tsx
│   ├── Navigation.tsx
│   └── ProtectedRoute.tsx
├── contexts/           # Contextos de React
│   └── AuthContext.tsx
├── lib/               # Configuración y utilidades
│   └── supabase.ts
├── App.tsx            # Componente principal
└── index.tsx          # Punto de entrada
```

## 🔒 Seguridad

- **Row Level Security (RLS)**: Los usuarios solo pueden acceder a sus propios datos
- **Validación de entrada**: Todos los formularios están validados con Zod
- **Autenticación**: Sistema de autenticación robusto con Supabase
- **Variables de entorno**: Credenciales seguras en archivos .env

## 📱 Diseño Responsivo

La aplicación está optimizada para funcionar en:
- Dispositivos móviles
- Tablets
- Escritorio
- Diferentes tamaños de pantalla

## 🚀 Despliegue

### Netlify
1. Conecta tu repositorio a Netlify
2. Configura las variables de entorno en Netlify
3. Deploy automático en cada push

### Variables de entorno para producción
```env
REACT_APP_SUPABASE_URL=tu_supabase_url_produccion
REACT_APP_SUPABASE_ANON_KEY=tu_supabase_anon_key_produccion
```

## 🧪 Testing

```bash
# Ejecutar tests
npm test

# Ejecutar tests en modo watch
npm test -- --watch

# Generar reporte de coverage
npm test -- --coverage
```

## 📝 Scripts Disponibles

```bash
npm start          # Iniciar en modo desarrollo
npm run build      # Construir para producción
npm test           # Ejecutar tests
npm run eject      # Eyectar configuración (irreversible)
```

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🆘 Soporte

Si tienes problemas o preguntas:

1. Revisa la documentación de Supabase
2. Verifica que las variables de entorno estén configuradas correctamente
3. Asegúrate de que la tabla de clientes esté creada en Supabase
4. Revisa la consola del navegador para errores

## 🔮 Próximas Funcionalidades

- [ ] Notas y comentarios por cliente
- [ ] Historial de actividades
- [ ] Exportación de datos
- [ ] Integración con calendario
- [ ] Notificaciones por email
- [ ] Dashboard avanzado con gráficos
- [ ] API REST para integraciones externas
