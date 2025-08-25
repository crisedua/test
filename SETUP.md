# 🚀 Guía de Configuración - CRM App

## 📋 Pasos para Configurar la Aplicación

### 1. Configurar Supabase

1. **Crear proyecto en Supabase**
   - Ve a [supabase.com](https://supabase.com)
   - Crea una nueva cuenta o inicia sesión
   - Crea un nuevo proyecto
   - Anota tu URL y anon key

2. **Configurar la base de datos**
   - Ve a la sección SQL Editor en tu proyecto
   - Copia y ejecuta el contenido del archivo `database-schema.sql`
   - Esto creará la tabla `clients` con todas las políticas de seguridad

### 2. Configurar Variables de Entorno

1. **Crear archivo .env.local**
   ```bash
   cp env.example .env.local
   ```

2. **Editar .env.local con tus credenciales**
   ```env
   REACT_APP_SUPABASE_URL=https://tu-proyecto.supabase.co
   REACT_APP_SUPABASE_ANON_KEY=tu_anon_key_aqui
   ```

### 3. Ejecutar la Aplicación

1. **Instalar dependencias** (si no lo has hecho)
   ```bash
   npm install
   ```

2. **Iniciar en modo desarrollo**
   ```bash
   npm start
   ```

3. **La aplicación estará disponible en** [http://localhost:3000](http://localhost:3000)

### 4. Probar la Aplicación

1. **Registrar un nuevo usuario**
   - Ve a la página de login
   - Haz clic en "Regístrate"
   - Ingresa tu email y contraseña
   - Confirma tu email (revisa tu bandeja de entrada)

2. **Iniciar sesión**
   - Usa las credenciales que acabas de crear
   - Serás redirigido al dashboard

3. **Agregar clientes**
   - Haz clic en "Agregar Cliente" desde el dashboard
   - Completa el formulario
   - Verifica que aparezca en la lista

### 5. Desplegar en Netlify (Opcional)

1. **Conectar repositorio**
   - Sube tu código a GitHub/GitLab
   - Conecta el repositorio a Netlify

2. **Configurar variables de entorno en Netlify**
   - Ve a Site settings > Environment variables
   - Agrega las mismas variables que en .env.local

3. **Deploy automático**
   - Cada push a la rama principal activará un deploy

## 🔧 Solución de Problemas

### Error de compilación
- Verifica que todas las dependencias estén instaladas: `npm install`
- Asegúrate de que las variables de entorno estén configuradas

### Error de conexión a Supabase
- Verifica que las credenciales en .env.local sean correctas
- Asegúrate de que la tabla `clients` esté creada en Supabase

### Error de autenticación
- Verifica que el email esté confirmado
- Revisa la consola del navegador para errores específicos

## 📱 Funcionalidades Disponibles

✅ **Autenticación completa**
- Registro de usuarios
- Login/logout
- Sesiones persistentes

✅ **Gestión de clientes**
- Crear nuevos clientes
- Ver lista de clientes
- Editar información
- Eliminar clientes
- Búsqueda en tiempo real

✅ **Dashboard**
- Estadísticas básicas
- Lista de clientes recientes
- Navegación intuitiva

✅ **Seguridad**
- Row Level Security (RLS)
- Usuarios solo ven sus propios datos
- Validación de formularios

## 🎯 Próximos Pasos

Una vez que la aplicación esté funcionando, puedes:

1. **Personalizar el diseño**
   - Modificar colores en `src/index.css`
   - Agregar más estilos personalizados

2. **Agregar funcionalidades**
   - Notas por cliente
   - Historial de actividades
   - Exportación de datos

3. **Mejorar la UX**
   - Agregar confirmaciones
   - Mejorar mensajes de error
   - Agregar animaciones

## 📞 Soporte

Si tienes problemas:
1. Revisa la consola del navegador
2. Verifica la configuración de Supabase
3. Consulta la documentación de React y Supabase
4. Revisa los logs de la aplicación

¡Tu aplicación CRM está lista para usar! 🎉
