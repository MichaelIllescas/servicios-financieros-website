# 🏢 Portal de Negocios - Servicios Financieros

> **Te buscamos la mejor opción para tu inversión o compra**

Una web completa y moderna desarrollada con **Astro + React** para una empresa de servicios financieros. Incluye formulario dinámico con envío de emails, botón flotante de WhatsApp, secciones de categorías, y un diseño totalmente responsivo.

## ✨ Características

- 🎨 **Diseño moderno y responsivo** con CSS Modules
- ⚡ **Astro + React** para máximo rendimiento
- 📧 **Sistema de envío de emails** con SMTP de Hostinger
- 💬 **Botón flotante de WhatsApp** siempre visible
- 📝 **Formulario dinámico** con campos adicionales
- 🏷️ **8 categorías** de productos/servicios
- 🔍 **SEO optimizado** con meta tags y structured data
- ♿ **Accesibilidad** siguiendo estándares web
- 📱 **100% Mobile-first** y responsive

## 🚀 Inicio Rápido

### 1. Instalar dependencias

```bash
npm install
```

### 2. Configurar variables de entorno

Copia el archivo de ejemplo y configura tus datos:

```bash
cp .env.example .env
```

Edita el archivo `.env` con tus datos reales:

```env
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=465
SMTP_USER=info@imperial-net.com
SMTP_PASS=TU_PASSWORD_REAL_AQUI
CONSULTATION_EMAIL=info@imperial-net.com
NODE_ENV=development
```

### 3. Ejecutar en desarrollo

```bash
npm run dev
```

### 4. Construir para producción

```bash
npm run build
npm run preview
```

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes React modulares
│   ├── hero/           # Sección Hero principal
│   ├── forms/          # Formulario de consulta
│   ├── categories/     # Grid de categorías
│   ├── about/          # Sección explicativa
│   ├── footer/         # Footer completo
│   └── whatsapp/       # Botón flotante WhatsApp
├── services/
│   └── email/          # Servicio modular de emails
├── pages/
│   ├── api/            # Endpoints de API
│   └── index.astro     # Página principal
└── styles/             # Estilos globales
```

## 📧 Configuración de Email

El sistema de emails usa **nodemailer** con SMTP de Hostinger:

### Archivos clave:
- `src/services/email/emailService.js` - Servicio modular de emails
- `src/pages/api/send-consultation.js` - Endpoint API para consultas

### Características del email:
- ✅ Envío automático de consultas
- ✅ Email de confirmación al cliente
- ✅ Templates HTML profesionales
- ✅ Soporte para archivos adjuntos
- ✅ Validación de formularios
- ✅ Manejo de errores

### Para configurar tu email:

1. **Obtén las credenciales de tu hosting Hostinger**
2. **Actualiza el archivo `.env`** con tus datos reales
3. **El sistema automáticamente:**
   - Enviará consultas a tu email
   - Enviará confirmación al cliente
   - Manejará archivos adjuntos

## 💬 WhatsApp Integration

El botón flotante de WhatsApp incluye:
- **Número configurado:** +54 9 292 353-0179
- **Mensaje predeterminado** optimizado
- **Animaciones** y efectos visuales
- **Tooltip informativo**
- **Totalmente responsivo**

Para cambiar el número, edita:
`src/components/whatsapp/FloatingWhatsAppButton.jsx` línea 8

## 🎨 Personalización

### Colores principales:
```css
--primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%)
--success-color: #25d366
--text-dark: #1a202c
--text-light: #64748b
```

### Fuentes:
- **Principal:** Inter (Google Fonts)
- **Fallback:** System fonts

## 🏗️ Componentes Principales

### 🎯 Hero
- Título llamativo "Portal de Negocios"
- Slogan personalizado
- CTA que hace scroll al formulario

### 📋 Formulario de Consulta
- Campos básicos (nombre, email, teléfono, mensaje)
- **Toggle para campos adicionales** (CUIT, documentos, otros datos)
- Validación en tiempo real
- Envío con archivos adjuntos

### 🗂️ Categorías
- 8 categorías con imágenes
- Grid responsivo
- Efectos hover atractivos
- Links al formulario

### 📖 Sección About
- Explicación clara del modelo de negocio
- Proceso paso a paso
- Beneficios destacados
- Estadísticas

### 🦶 Footer
- Navegación completa
- Información de contacto
- **Colaboración con Grupo Alpes**
- Enlaces legales
- Botón "volver arriba"

## 📱 Responsive Design

- **Mobile-first approach**
- **Breakpoints:**
  - Mobile: < 480px
  - Tablet: 768px
  - Desktop: 1024px+
- **Grids CSS adaptativos**
- **Imágenes optimizadas**

## ♿ Accesibilidad

- **ARIA labels** y roles
- **Navegación por teclado**
- **Contraste suficiente**
- **Texto alternativo** en imágenes
- **Focus visible**
- **Soporte para screen readers**

## 🔧 Scripts Disponibles

```bash
# Desarrollo
npm run dev

# Construcción
npm run build

# Preview (después de build)
npm run preview

# Linting
npm run lint

# Format
npm run format
```

## 🌐 SEO Features

- **Meta tags** completos
- **Open Graph** para redes sociales
- **Twitter Cards**
- **Structured Data** (JSON-LD)
- **Canonical URLs**
- **Sitemap** automático

## 🔒 Seguridad

- **Validación** de formularios (frontend + backend)
- **Sanitización** de inputs
- **Rate limiting** preparado
- **CORS** configurado
- **Archivos permitidos** controlados

## 📊 Performance

- **Astro Islands** para hidratación selectiva
- **CSS Modules** para estilos optimizados
- **Lazy loading** de imágenes
- **Minificación** automática
- **Tree shaking** incluido

## 🛠️ Tecnologías Utilizadas

- **[Astro](https://astro.build/)** - Framework principal
- **[React](https://reactjs.org/)** - Componentes interactivos
- **[Nodemailer](https://nodemailer.com/)** - Envío de emails
- **CSS Modules** - Estilos modulares
- **Formidable** - Manejo de archivos
- **Inter Font** - Tipografía

## 📝 Configuración Adicional

### Variables de entorno completas:

```env
# SMTP Configuration
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=465
SMTP_USER=info@imperial-net.com
SMTP_PASS=tu_password_real

# General Configuration  
NODE_ENV=development
SITE_URL=https://tu-dominio.com
CONSULTATION_EMAIL=info@imperial-net.com

# File Upload
MAX_FILE_SIZE=5242880
ALLOWED_FILE_TYPES=application/pdf,image/jpeg,image/jpg,image/png,image/gif

# Optional
GA_MEASUREMENT_ID=G-XXXXXXXXXX
DEBUG=true
```

## 🚀 Deployment

### Hostinger (recomendado):
1. **Build** el proyecto: `npm run build`
2. **Sube** la carpeta `dist/` a tu hosting
3. **Configura** las variables de entorno en el panel
4. **Configura** el dominio

### Netlify/Vercel:
1. **Conecta** tu repositorio
2. **Configura** las variables de entorno
3. **Deploy** automático en cada commit

## 📞 Soporte

Para soporte o consultas sobre este proyecto:

- **WhatsApp:** +54 9 292 353-0179
- **Email:** info@imperial-net.com

## 📄 Licencia

Este proyecto fue desarrollado específicamente para Portal de Negocios.

---

**Portal de Negocios** - *Te buscamos la mejor opción para tu inversión o compra*  
En colaboración con **Grupo Alpes** 🏔️