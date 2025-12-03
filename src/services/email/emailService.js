import nodemailer from 'nodemailer';

/**
 * Servicio modular para envío de emails usando SMTP de Hostinger
 */
class EmailService {
  constructor() {
    this.transporter = null;
    this.config = {
      host: import.meta.env.SMTP_HOST || 'smtp.hostinger.com',
      port: parseInt(import.meta.env.SMTP_PORT || '465'),
      secure: true, 
      auth: {
        user: import.meta.env.SMTP_USER || 'info@imperial-net.com',
        pass: import.meta.env.SMTP_PASS || 'Imperialnet.1'
      },
      tls: {
        rejectUnauthorized: false
      }
    };
  }

  /**
   * Inicializa el transportador SMTP con configuración de Hostinger
   */
  async initializeTransporter() {
    try {
      console.log('🔧 Inicializando transportador SMTP...');
      console.log('📍 Host:', this.config.host);
      console.log('📍 Puerto:', this.config.port);
      console.log('📍 Usuario:', this.config.auth.user);
      
      this.transporter = nodemailer.createTransport(this.config);
      
      // Verificar conexión
      await this.transporter.verify();
      console.log('✅ Transportador SMTP verificado correctamente');
      return true;
    } catch (error) {
      console.error('❌ Error al inicializar SMTP:', error.message);
      this.transporter = null;
      return false;
    }
  }

  /**
   * Obtiene el transportador (lo inicializa si es necesario)
  
   */
  async getTransporter() {
    if (!this.transporter) {
      await this.initializeTransporter();
    }
    return this.transporter;
  }

  /**
   * Genera el HTML para el email de consulta
   
   */
  generateConsultationEmailHTML(data) {
    const {
      firstName,
      lastName,
      email,
      phone,
      message,
      additionalData,
      hasAdditionalFields
    } = data;

    const currentDate = new Date().toLocaleString('es-AR', {
      timeZone: 'America/Argentina/Buenos_Aires',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    return `
      <div>
        <h1>🏢 Portal de Negocios</h1>
        <p>Nueva consulta recibida</p>
        <p><strong>Fecha:</strong> ${currentDate}</p>
        
        <div>
          <p>⚡ Nueva consulta requiere atención</p>
        </div>
        
        <div>
          <p><strong>Nombre Completo:</strong> ${firstName} ${lastName}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          ${phone ? `<p><strong>Teléfono:</strong> <a href="tel:${phone}">${phone}</a></p>` : ''}
          
          <div>
            <p><strong>📝 Mensaje / Consulta:</strong></p>
            <p>${message}</p>
          </div>
          
          ${hasAdditionalFields === 'true' && additionalData ? `
            <div>
              <h3>📋 Información Adicional</h3>
              <p>${additionalData}</p>
              ${data.hasDocument ? `<p><strong>📎 Documento:</strong> Ver archivo adjunto</p>` : ''}
            </div>
          ` : ''}
        </div>
        
        <footer>
          <p><strong>Portal de Negocios</strong> - Servicios Financieros</p>
          <p>Te buscamos la mejor opción para tu inversión o compra</p>
          <p>En colaboración con Grupo Alpes</p>
          <p style="font-size: 10px;">Este email fue enviado automáticamente desde el formulario de consultas.</p>
        </footer>
      </div>
    `;
  }

  /**
   * Genera versión texto plano del email (fallback)
   
   */
  generatePlainTextEmail(data) {
    const currentDate = new Date().toLocaleString('es-AR');
    
    let text = `NUEVA CONSULTA - PORTAL DE NEGOCIOS\n`;
    text += `=====================================\n\n`;
    text += `Fecha: ${currentDate}\n\n`;
    text += `DATOS DEL CLIENTE:\n`;
    text += `Nombre: ${data.firstName} ${data.lastName}\n`;
    text += `Email: ${data.email}\n`;
    if (data.phone) text += `Teléfono: ${data.phone}\n`;
    text += `\nCONSULTA:\n${data.message}\n\n`;

    if (data.hasAdditionalFields === 'true' && data.additionalData) {
      text += `INFORMACIÓN ADICIONAL:\n${data.additionalData}\n\n`;
    }

    if (data.hasDocument) {
      text += `DOCUMENTO: Ver archivo adjunto\n\n`;
    }

    text += `\n--\nPortal de Negocios - Servicios Financieros\n`;
    text += `Te buscamos la mejor opción para tu inversión o compra`;

    return text;
  }

  /**
   * Envía email de consulta
   
   * @returns {Promise<Object>} - Resultado del envío
   */
  async sendConsultationEmail(formData, document = null) {
    try {
      const transporter = await this.getTransporter();
      
      if (!transporter) {
        throw new Error('No se pudo inicializar el transportador SMTP');
      }

      const { firstName, lastName, email } = formData;

      // Marcar si tiene documento
      if (document) {
        formData.hasDocument = true;
      }

      // Configuración del email
      const mailOptions = {
        from: {
          name: 'Portal de Negocios',
          address: this.config.auth.user
        },
        to: this.config.auth.user,
        replyTo: email,
        subject: `🔔 Nueva Consulta - ${firstName} ${lastName}`,
        html: this.generateConsultationEmailHTML(formData),
        text: this.generatePlainTextEmail(formData),
      };

      // Agregar archivo adjunto si existe
      if (document && document.buffer) {
        mailOptions.attachments = [{
          filename: document.name,
          content: document.buffer,
          contentType: document.type
        }];
        console.log('📎 Adjuntando archivo:', document.name);
      }

      // Enviar email
      console.log('📤 Enviando email...');
      const result = await transporter.sendMail(mailOptions);
      console.log('✅ Email enviado. ID:', result.messageId);

      return {
        success: true,
        messageId: result.messageId,
        message: 'Email enviado correctamente'
      };

    } catch (error) {
      console.error('❌ Error al enviar email:', error);
      
      return {
        success: false,
        error: error.message,
        message: 'Error al enviar el email'
      };
    }
  }

  /**
   * Envía email de confirmación al cliente
  
   */
  async sendConfirmationEmail(clientEmail, clientName) {
    try {
      const transporter = await this.getTransporter();
      
      if (!transporter) {
        console.warn('⚠️ No se puede enviar confirmación - SMTP no disponible');
        return { success: false, error: 'SMTP no configurado' };
      }

      const mailOptions = {
        from: {
          name: 'Portal de Negocios',
          address: this.config.auth.user
        },
        to: clientEmail,
        subject: '✅ Consulta recibida - Portal de Negocios',
        html: `
          <div>
            <h2>¡Gracias por tu consulta!</h2>
            
            <p>Hola <strong>${clientName}</strong>,</p>
            
            <p>Recibimos tu consulta exitosamente y nuestro equipo se pondrá en contacto contigo a la brevedad.</p>
            
            <div>
              <p><strong>¿Qué sigue?</strong></p>
              <ul>
                <li>📋 Revisaremos tu consulta en detalle</li>
                <li>📞 Te contactaremos en las próximas 24-48 horas</li>
                <li>💡 Te presentaremos las mejores opciones disponibles</li>
              </ul>
            </div>
            
            <p style="text-align: center; font-style: italic;">
              "Te buscamos la mejor opción para tu inversión o compra"
            </p>
            
            <footer>
              <p><strong>Portal de Negocios</strong><br>
              Servicios Financieros<br>
              En colaboración con Grupo Alpes</p>
            </footer>
          </div>
        `,
        text: `Hola ${clientName},\n\nRecibimos tu consulta exitosamente y nuestro equipo se pondrá en contacto contigo a la brevedad.\n\n¿Qué sigue?\n- Revisaremos tu consulta en detalle\n- Te contactaremos en las próximas 24-48 horas\n- Te presentaremos las mejores opciones disponibles\n\n"Te buscamos la mejor opción para tu inversión o compra"\n\nPortal de Negocios - En colaboración con Grupo Alpes`
      };

      console.log('📧 Enviando confirmación a:', clientEmail);
      const result = await transporter.sendMail(mailOptions);
      
      console.log('✅ Confirmación enviada');
      return {
        success: true,
        messageId: result.messageId
      };

    } catch (error) {
      console.error('⚠️ Error al enviar confirmación:', error.message);
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Prueba la conexión SMTP
  
   */
  async testConnection() {
    try {
      const transporter = await this.getTransporter();
      
      if (!transporter) {
        throw new Error('No se pudo inicializar el transportador');
      }

      await transporter.verify();
      
      // Enviar email de prueba
      const result = await transporter.sendMail({
        from: `"Portal de Negocios" <${this.config.auth.user}>`,
        to: this.config.auth.user,
        subject: '🧪 Prueba SMTP - ' + new Date().toLocaleString('es-AR'),
        html: `
          <h2>✅ Prueba SMTP Exitosa</h2>
          <p>Este es un email de prueba enviado desde el Portal de Negocios.</p>
          <p><strong>Fecha:</strong> ${new Date().toLocaleString('es-AR')}</p>
          <p>La configuración SMTP está funcionando correctamente.</p>
        `,
        text: 'Prueba SMTP exitosa - Portal de Negocios'
      });

      return {
        success: true,
        messageId: result.messageId,
        message: 'Email de prueba enviado correctamente'
      };
      
    } catch (error) {
      console.error('❌ Error en prueba SMTP:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }
}

// Crear instancia única (singleton)
const emailServiceInstance = new EmailService();

export default emailServiceInstance;

// Función auxiliar para obtener la instancia (REMOVEMOS el async)
export function getEmailService() {
  return emailServiceInstance;
}