# Sistema de Envío de Emails - Portal de Negocios

## 📋 Descripción

Sistema completo de envío de emails para formularios de consulta, desarrollado con **PHP + PHPMailer** y integrado con **Astro + React**. 

### Características principales:
- ✅ Envío de emails vía SMTP (Hostinger)
- ✅ Soporte para archivos adjuntos (PDF, imágenes hasta 30MB)
- ✅ Email de confirmación automático al cliente
- ✅ Templates HTML personalizables
- ✅ Validación de datos del formulario
- ✅ Manejo seguro de variables de entorno
- ✅ Sistema de logs y debugging

---

## 🏗️ Arquitectura del Sistema

```
src/
├── components/
│   └── forms/
│       ├── ConsultationForm.jsx          # Formulario React con validaciones
│       └── ConsultationForm.module.css   # Estilos y animaciones
├── pages/
│   └── api/
│       └── _send-email.php               # Endpoint principal (sube a raíz en producción)
└── services/
    ├── email/
    │   ├── PHPMailer/                    # Librería PHPMailer
    │   │   ├── PHPMailer.php
    │   │   ├── SMTP.php
    │   │   └── Exception.php
    │   ├── EmailService.php              # Servicio principal de emails
    │   └── templates/
    │       ├── consultation-email.html   # Template para el negocio
    │       └── confirmation-email.html   # Template para el cliente
    └── php/
        ├── config/
        │   └── mail.php                  # Configuración centralizada
        └── utils/
            └── helpers.php               # Funciones auxiliares
```

---

## 🔧 Configuración Inicial

### 1. Variables de Entorno

Crear archivo `.env` en la raíz del proyecto:

```env
# Configuración SMTP de Hostinger
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=info@tu-dominio.com
SMTP_PASS=tu-contraseña-segura

# Email de destino para consultas
RECIPIENT_EMAIL=info@tu-dominio.com

# Configuración general
NODE_ENV=production
MAX_FILE_SIZE=31457280
DEBUG=false
```

### 2. Configuración de Astro

En `astro.config.mjs`, configurar para modo estático:

```javascript
export default defineConfig({
  output: 'static',
  // ... resto de configuración
});
```

### 3. Cuenta de Email en Hostinger

1. Acceder al panel de Hostinger
2. Ir a **Emails** → **Crear cuenta de correo**
3. Crear: `info@tu-dominio.com` (o el email configurado)
4. Anotar las credenciales

---

## 📦 Instalación Local

### Requisitos
- PHP 8.0 o superior
- Composer (opcional, PHPMailer ya está incluido)
- Node.js 18+ y npm

### Pasos

1. **Clonar el repositorio**
```bash
git clone [url-del-repo]
cd servicios-financieros-website
```

2. **Instalar dependencias de Node**
```bash
npm install
```

3. **Configurar variables de entorno**
```bash
cp .env.example .env
# Editar .env con tus credenciales
```

4. **Desarrollo local con Docker (opcional)**

Para probar emails localmente:

```bash
# Iniciar servidor PHP
docker-compose up -d

# En otra terminal, iniciar Astro
npm run dev
```

5. **Desarrollo sin Docker**

Si solo querés probar el frontend:

```bash
npm run dev
```

> ⚠️ **Nota**: El envío de emails solo funciona en producción (Hostinger) o con Docker configurado.

---

## 🚀 Despliegue en Hostinger

### Paso 1: Preparar el Build

```bash
# Construir el proyecto
npm run build
```

Esto genera la carpeta `dist/client/` con todos los archivos estáticos.

### Paso 2: Estructura en Hostinger

La estructura final en el servidor debe ser:

```
/home/tu-usuario/
├── .env                           # Variables de entorno (fuera de public_html)
└── public_html/
    ├── index.html
    ├── _astro/                    # Assets de Astro
    ├── favicon.svg
    ├── _send-email.php            # Endpoint principal
    └── services/
        ├── email/
        │   ├── PHPMailer/
        │   │   ├── PHPMailer.php
        │   │   ├── SMTP.php
        │   │   └── Exception.php
        │   ├── EmailService.php
        │   └── templates/
        │       ├── consultation-email.html
        │       └── confirmation-email.html
        └── php/
            ├── config/
            │   └── mail.php
            └── utils/
                └── helpers.php
```

### Paso 3: Subir Archivos

#### 3.1. Archivos Estáticos de Astro

1. Acceder a Hostinger → **Archivos** → **Administrador de archivos**
2. Ir a `/public_html`
3. Borrar contenido existente
4. Subir TODO el contenido de `dist/client/`:
   - `index.html`
   - `_astro/`
   - `favicon.svg`
   - etc.

#### 3.2. Archivos PHP

Crear la estructura de carpetas:

```
/public_html
  └── services/
      ├── email/
      │   ├── PHPMailer/
      │   └── templates/
      └── php/
          ├── config/
          └── utils/
```

Subir archivos PHP a sus respectivas ubicaciones:

- `src/pages/api/_send-email.php` → `/public_html/_send-email.php`
- `src/services/email/EmailService.php` → `/public_html/services/email/`
- `src/services/email/PHPMailer/*` → `/public_html/services/email/PHPMailer/`
- `src/services/email/templates/*` → `/public_html/services/email/templates/`
- `src/services/php/config/mail.php` → `/public_html/services/php/config/`
- `src/services/php/utils/helpers.php` → `/public_html/services/php/utils/`

#### 3.3. Variables de Entorno

1. Subir el archivo `.env` a `/home/tu-usuario/` (UN NIVEL ARRIBA de `public_html`)
2. **IMPORTANTE**: NO subir `.env` dentro de `public_html` (razones de seguridad)

### Paso 4: Ajustar Rutas

Ya están configuradas correctamente si seguiste los pasos anteriores, pero verificá:

**En `_send-email.php`:**
```php
require_once __DIR__ . '/services/email/EmailService.php';
require_once __DIR__ . '/services/php/utils/helpers.php';
$config = require __DIR__ . '/services/php/config/mail.php';
```

**En `EmailService.php`:**
```php
require_once __DIR__ . '/PHPMailer/PHPMailer.php';
require_once __DIR__ . '/PHPMailer/SMTP.php';
require_once __DIR__ . '/PHPMailer/Exception.php';
```

**En `mail.php`:**
```php
$envPath = dirname($_SERVER['DOCUMENT_ROOT']) . '/.env';
```

### Paso 5: Configurar PHP en Hostinger

1. Panel Hostinger → **Avanzado** → **PHP Configuration**
2. Seleccionar **PHP 8.0** o superior
3. Guardar

### Paso 6: Probar

1. Acceder a `https://tu-dominio.com`
2. Completar y enviar el formulario
3. Verificar que:
   - Se muestra el mensaje de éxito
   - Llega el email a `info@tu-dominio.com`
   - El cliente recibe email de confirmación

---

## 🔍 Troubleshooting

### Error: "Failed to load resource: 404"

**Problema**: El archivo `_send-email.php` no se encuentra.

**Solución**: 
- Verificar que `_send-email.php` esté en `/public_html/` (raíz)
- Verificar que el fetch en `ConsultationForm.jsx` apunte a `'/_send-email.php'`

### Error: "No such file or directory" (PHPMailer)

**Problema**: Rutas absolutas de Docker en producción.

**Solución**: 
- Abrir `EmailService.php`
- Cambiar rutas de `/app/src/...` a `__DIR__ . '/PHPMailer/...'`

### Error: "Failed opening required .env"

**Problema**: Archivo `.env` no encontrado.

**Solución**:
- Verificar que `.env` esté en `/home/tu-usuario/` (fuera de public_html)
- Verificar que `mail.php` tenga: `dirname($_SERVER['DOCUMENT_ROOT']) . '/.env'`

### Emails no se envían

**Problema**: Credenciales SMTP incorrectas o bloqueadas.

**Solución**:
1. Verificar credenciales en `.env`
2. Verificar que la cuenta de email existe en Hostinger
3. Revisar logs de error en Hostinger: **Avanzado** → **Error Log**

### Archivos adjuntos no llegan

**Problema**: Límite de tamaño excedido o tipo no permitido.

**Solución**:
- Verificar que el archivo sea < 30MB
- Verificar que sea PDF, word o imagen (jpg, png, gif)
- Revisar `upload.max_filesize` en configuración de PHP

---

## 📝 Flujo de Funcionamiento

1. **Usuario completa el formulario** en el frontend (React)
2. **Validación en frontend** (campos requeridos, formato email, etc.)
3. **Envío vía POST** a `/_send-email.php`
4. **Validación en backend** (PHP)
5. **EmailService procesa**:
   - Genera HTML del email desde templates
   - Adjunta archivo si existe
   - Configura PHPMailer con SMTP
6. **Envía 2 emails**:
   - Email al negocio con datos de la consulta
   - Email de confirmación al cliente
7. **Respuesta JSON** al frontend
8. **UI muestra** modal de éxito o error

---

## 🛡️ Seguridad

### Implementado:
- ✅ Variables sensibles en `.env` fuera de `public_html`
- ✅ Sanitización de inputs (XSS prevention)
- ✅ Validación de tipos de archivo
- ✅ Límite de tamaño de archivos
- ✅ CORS configurado
- ✅ Rate limiting (10 requests/hora por IP)

### Recomendaciones adicionales:
- Cambiar contraseñas periódicamente
- Habilitar SSL/TLS en el dominio
- Configurar SPF y DKIM en Hostinger
- Monitorear logs regularmente

---

## 🔄 Actualizaciones Futuras

Para actualizar el sitio después de cambios:

1. **Modificar código local**
2. **Rebuild del proyecto**:
   ```bash
   npm run build
   ```
3. **Subir solo archivos modificados**:
   - Si cambiaste componentes React → subir nueva carpeta `_astro/`
   - Si cambiaste PHP → subir archivos PHP específicos
   - Si cambiaste templates → subir templates HTML

---

## 📧 Personalización de Templates

### Email de Consulta (`consultation-email.html`)

Variables disponibles:
- `{{APP_NAME}}` - Nombre de la aplicación
- `{{COMPANY}}` - Nombre de la empresa
- `{{TAGLINE}}` - Eslogan
- `{{PARTNER}}` - Socio/colaborador
- `{{CURRENT_DATE}}` - Fecha actual
- `{{FIRST_NAME}}` - Nombre del cliente
- `{{LAST_NAME}}` - Apellido del cliente
- `{{EMAIL}}` - Email del cliente
- `{{MESSAGE}}` - Mensaje/consulta
- `{{PHONE_SECTION}}` - Sección de teléfono (opcional)
- `{{ADDITIONAL_SECTION}}` - Datos adicionales (opcional)

### Email de Confirmación (`confirmation-email.html`)

Variables disponibles:
- `{{APP_NAME}}` - Nombre de la aplicación
- `{{COMPANY}}` - Nombre de la empresa
- `{{TAGLINE}}` - Eslogan
- `{{PARTNER}}` - Socio/colaborador
- `{{CLIENT_NAME}}` - Nombre completo del cliente

---

## 📊 Logs y Debugging

### Habilitar logs:

En `.env`:
```env
DEBUG=true
```

Los logs se escriben en: `/public_html/logs/email.log`

### Ver errores de PHP:

Hostinger → **Avanzado** → **Error Log**

---

## 👥 Soporte

Para problemas o dudas:
- Revisar esta documentación
- Verificar los logs de error
- Contactar al equipo de desarrollo

---

## 📄 Licencia

[Especificar licencia del proyecto]

---

**Última actualización**: Diciembre 2025
**Versión**: 1.0.0