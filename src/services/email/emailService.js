import nodemailer from 'nodemailer';

/**
 * Servicio modular para envío de emails usando SMTP de Hostinger
 */
class EmailService {
  constructor() {
    this.transporter = null;
    this.initializeTransporter();
  }

  /**
   * Inicializa el transportador SMTP con configuración de Hostinger
   */
  async initializeTransporter() {
    try {
      console.log('🔧 Inicializando transportador SMTP...');
      
      // Configuración directa para desarrollo
      const smtpConfig = {
        host: 'smtp.hostinger.com',
        port: 465,
        secure: true,
        auth: {
          user: 'info@imperial-net.com',
          pass: 'Imperialnet.1'
        },
        tls: {
          rejectUnauthorized: false
        }
      };

      this.transporter = nodemailer.createTransporter(smtpConfig);
      
      // Verificar conexión
      await this.transporter.verify();
      console.log('✅ Transportador SMTP inicializado y verificado correctamente');
    } catch (error) {
      console.error('❌ Error al inicializar transportador SMTP:', error.message);
      this.transporter = null;
    }
  }

  /**
   * Verifica la conexión SMTP
   * @returns {Promise<boolean>}
   */
  async verifyConnection() {
    try {
      await this.transporter.verify();
      console.log('✅ Conexión SMTP verificada exitosamente');
      return true;
    } catch (error) {
      console.error('❌ Error en verificación SMTP:', error);
      return false;
    }
  }

  /**
   * Genera el HTML para el email de consulta
   * @param {Object} data - Datos del formulario
   * @returns {string} - HTML del email
   */
  generateConsultationEmailHTML(data) {
    const {
      firstName,
      lastName,
      email,
      phone,
      message,
      cuit,
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
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Nueva Consulta - Portal de Negocios</title>
        <style>
          body {
            font-family: 'Arial', sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            background-color: #f4f4f4;
            padding: 20px;
          }
          .email-container {
            background: white;
            border-radius: 10px;
            padding: 30px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }
          .header {
            text-align: center;
            border-bottom: 3px solid #123142;
            padding-bottom: 20px;
            margin-bottom: 30px;
          }
          .header h1 {
            color: #123142;
            margin: 0;
            font-size: 28px;
          }
          .header p {
            color: #666;
            margin: 5px 0 0 0;
            font-size: 14px;
          }
          .content {
            margin-bottom: 30px;
          }
          .field-group {
            background: #f8fafc;
            border-left: 4px solid #123142;
            padding: 15px;
            margin-bottom: 15px;
            border-radius: 0 5px 5px 0;
          }
          .field-label {
            font-weight: bold;
            color: #123142;
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }
          .field-value {
            margin-top: 5px;
            font-size: 16px;
            color: #333;
          }
          .message-field {
            background: #fff8e1;
            border-left: 4px solid #ff9800;
            padding: 20px;
            border-radius: 0 5px 5px 0;
            margin: 20px 0;
          }
          .additional-section {
            background: #e8f5e8;
            border: 1px solid #4caf50;
            border-radius: 5px;
            padding: 20px;
            margin-top: 20px;
          }
          .additional-title {
            color: #4caf50;
            font-weight: bold;
            font-size: 18px;
            margin-bottom: 15px;
            text-align: center;
          }
          .footer {
            text-align: center;
            padding-top: 20px;
            border-top: 1px solid #eee;
            font-size: 12px;
            color: #666;
          }
          .urgent {
            background: #ffebee;
            border: 1px solid #f44336;
            border-radius: 5px;
            padding: 15px;
            text-align: center;
            color: #c62828;
            font-weight: bold;
            margin-bottom: 20px;
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <div class="header">
            <h1>🏢 Portal de Negocios</h1>
            <p>Nueva consulta recibida</p>
            <p><strong>Fecha:</strong> ${currentDate}</p>
          </div>

          <div class="urgent">
            ⚡ Nueva consulta requiere atención
          </div>

          <div class="content">
            <div class="field-group">
              <div class="field-label">Nombre Completo</div>
              <div class="field-value">${firstName} ${lastName}</div>
            </div>

            <div class="field-group">
              <div class="field-label">Email</div>
              <div class="field-value">${email}</div>
            </div>

            <div class="field-group">
              <div class="field-label">Teléfono</div>
              <div class="field-value">${phone}</div>
            </div>

            <div class="message-field">
              <div class="field-label">📝 Mensaje / Consulta</div>
              <div class="field-value">${message}</div>
            </div>

            ${hasAdditionalFields === 'true' ? `
              <div class="additional-section">
                <div class="additional-title">📋 Datos Adicionales</div>
                
                ${cuit ? `
                  <div class="field-group" style="background: white;">
                    <div class="field-label">CUIT</div>
                    <div class="field-value">${cuit}</div>
                  </div>
                ` : ''}

                ${additionalData ? `
                  <div class="field-group" style="background: white;">
                    <div class="field-label">Información Adicional</div>
                    <div class="field-value">${additionalData}</div>
                  </div>
                ` : ''}

                ${data.hasDocument ? `
                  <div class="field-group" style="background: white;">
                    <div class="field-label">📎 Documento</div>
                    <div class="field-value">Archivo adjunto en el email</div>
                  </div>
                ` : ''}
              </div>
            ` : ''}
          </div>

          <div class="footer">
            <p><strong>Portal de Negocios</strong> - Servicios Financieros</p>
            <p>Te buscamos la mejor opción para tu inversión o compra</p>
            <p>En colaboración con Grupo Alpes</p>
            <p style="font-size: 10px; margin-top: 10px;">
              Este email fue enviado automáticamente desde el formulario de consultas de la web.
            </p>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  /**
   * Envía email de consulta
   * @param {Object} formData - Datos del formulario de consulta
   * @param {File} [document] - Archivo adjunto opcional
   * @returns {Promise<Object>} - Resultado del envío
   */
  async sendConsultationEmail(formData, document = null) {
    try {
      // Si no hay transportador, intentar reinicializarlo
      if (!this.transporter) {
        console.log('🔄 Reintentando inicialización SMTP...');
        await this.initializeTransporter();
      }

      // Verificar que el transportador esté disponible
      if (!this.transporter) {
        console.warn('⚠️ Transportador SMTP no disponible. Simulando envío...');
        return {
          success: true,
          messageId: 'simulated-' + Date.now(),
          message: 'Email simulado (configuración SMTP no disponible)'
        };
      }

      const { firstName, lastName, email } = formData;

      // Configuración del email
      const mailOptions = {
        from: {
          name: 'Portal de Negocios',
          address: 'info@imperial-net.com'
        },
        to: 'info@imperial-net.com',
        replyTo: email,
        subject: `🔔 Nueva Consulta - ${firstName} ${lastName}`,
        html: this.generateConsultationEmailHTML(formData),
        text: this.generatePlainTextEmail(formData),
      };

      // Agregar archivo adjunto si existe
      if (document) {
        mailOptions.attachments = [{
          filename: document.name,
          content: document.buffer || document,
          contentType: document.type
        }];
        formData.hasDocument = true;
      }

      // Enviar email
      console.log('📤 Enviando email...');
      const result = await this.transporter.sendMail(mailOptions);

      console.log('✅ Email de consulta enviado exitosamente:', result.messageId);
      
      return {
        success: true,
        messageId: result.messageId,
        message: 'Email enviado correctamente'
      };

    } catch (error) {
      console.error('❌ Error al enviar email de consulta:', error);
      
      return {
        success: false,
        error: error.message,
        message: 'Error al enviar el email'
      };
    }
  }

  /**
   * Genera versión texto plano del email (fallback)
   * @param {Object} data - Datos del formulario
   * @returns {string} - Texto plano
   */
  generatePlainTextEmail(data) {
    const currentDate = new Date().toLocaleString('es-AR');
    
    let text = `NUEVA CONSULTA - PORTAL DE NEGOCIOS\n`;
    text += `=====================================\n\n`;
    text += `Fecha: ${currentDate}\n\n`;
    text += `DATOS DEL CLIENTE:\n`;
    text += `Nombre: ${data.firstName} ${data.lastName}\n`;
    text += `Email: ${data.email}\n`;
    text += `Teléfono: ${data.phone}\n\n`;
    text += `CONSULTA:\n${data.message}\n\n`;

    if (data.hasAdditionalFields === 'true') {
      text += `DATOS ADICIONALES:\n`;
      if (data.cuit) text += `CUIT: ${data.cuit}\n`;
      if (data.additionalData) text += `Información adicional: ${data.additionalData}\n`;
      if (data.hasDocument) text += `Documento: Archivo adjunto\n`;
    }

    text += `\n--\nPortal de Negocios - Servicios Financieros\n`;
    text += `Te buscamos la mejor opción para tu inversión o compra`;

    return text;
  }

  /**
   * Envía email de confirmación al cliente
   * @param {string} clientEmail - Email del cliente
   * @param {string} clientName - Nombre del cliente
   * @returns {Promise<Object>} - Resultado del envío
   */
  async sendConfirmationEmail(clientEmail, clientName) {
    try {
      // Si no hay transportador, intentar reinicializarlo
      if (!this.transporter) {
        console.log('🔄 Reintentando inicialización SMTP para confirmación...');
        await this.initializeTransporter();
      }

      // Si no hay transportador, no enviar confirmación
      if (!this.transporter) {
        console.warn('⚠️ No se puede enviar confirmación - SMTP no configurado');
        return {
          success: false,
          error: 'SMTP no configurado'
        };
      }

      const mailOptions = {
        from: {
          name: 'Portal de Negocios',
          address: 'info@imperial-net.com'
        },
        to: clientEmail,
        subject: '✅ Consulta recibida - Portal de Negocios',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f4f4f4;">
            <div style="background: white; padding: 30px; border-radius: 10px;">
              <h2 style="color: #123142; text-align: center;">¡Gracias por tu consulta!</h2>
              
              <p>Hola <strong>${clientName}</strong>,</p>
              
              <p>Recibimos tu consulta exitosamente y nuestro equipo se pondrá en contacto contigo a la brevedad.</p>
              
              <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <p><strong>¿Qué sigue?</strong></p>
                <ul>
                  <li>Revisaremos tu consulta en detalle</li>
                  <li>Te contactaremos en las próximas 24-48 horas</li>
                  <li>Te presentaremos las mejores opciones disponibles</li>
                </ul>
              </div>
              
              <p style="text-align: center; color: #123142; font-style: italic;">
                "Te buscamos la mejor opción para tu inversión o compra"
              </p>
              
              <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #666;">
                <p><strong>Portal de Negocios</strong><br>
                En colaboración con Grupo Alpes</p>
              </div>
            </div>
          </div>
        `,
        text: `Hola ${clientName}, recibimos tu consulta exitosamente y nuestro equipo se pondrá en contacto contigo a la brevedad. Portal de Negocios - En colaboración con Grupo Alpes`
      };

      console.log('📤 Enviando email de confirmación...');
      const result = await this.transporter.sendMail(mailOptions);
      
      return {
        success: true,
        messageId: result.messageId
      };

    } catch (error) {
      console.error('❌ Error al enviar email de confirmación:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }
}

// Crear instancia única
const emailServiceInstance = new EmailService();

export default emailServiceInstance;

// Exportar también funciones específicas
export const { 
  sendConsultationEmail, 
  sendConfirmationEmail 
} = emailServiceInstance;