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
        user: import.meta.env.SMTP_USER,
        pass: import.meta.env.SMTP_PASS 
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
      this.transporter = nodemailer.createTransport(this.config);
      
      // Verificar conexión
      await this.transporter.verify();
      console.log('✅ SMTP conectado correctamente');
      return true;
    } catch (error) {
      console.error('❌ Error SMTP:', error.message);
      this.transporter = null;
      return false;
    }
  }

  /**
   * Obtiene el transportador (lo inicializa si es necesario)
  
   */
  async getTransporter() {
    if (!this.transporter) {
      const initialized = await this.initializeTransporter();
      if (!initialized) {
        throw new Error('No se pudo inicializar el transportador SMTP. Verifica las variables de entorno SMTP_USER y SMTP_PASS.');
      }
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
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Nueva Consulta</title>
        <style>
          @media only screen and (max-width: 600px) {
            .email-container { width: 100% !important; }
            .email-padding { padding: 24px 20px !important; }
            .header-padding { padding: 32px 24px !important; }
            .content-padding { padding: 0 24px 20px 24px !important; }
            .card-padding { padding: 20px 16px !important; }
            .footer-padding { padding: 24px 20px !important; }
            .title-main { font-size: 26px !important; }
            .title-section { font-size: 18px !important; }
            .icon-circle { width: 70px !important; height: 70px !important; }
            .icon-circle svg { width: 44px !important; height: 44px !important; margin-top: 13px !important; }
            .step-icon { width: 28px !important; height: 28px !important; }
            .step-icon svg { width: 16px !important; height: 16px !important; }
          }
        </style>
      </head>
      <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f9fafb;">
        <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f9fafb;">
          <tr>
            <td class="email-padding" style="padding: 40px 20px;">
              <table role="presentation" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.08); overflow: hidden;">
                
                <!-- Header with Alert Icon -->
                <tr>
                  <td class="header-padding" style="background: linear-gradient(135deg, #dc2626 0%, #ef4444 50%, #f87171 100%); padding: 48px 40px; text-align: center;">
                    <table role="presentation" style="margin: 0 auto;">
                      <tr>
                        <td class="icon-circle" style="background-color: #ffffff; width: 90px; height: 90px; border-radius: 50%; text-align: center; vertical-align: middle; box-shadow: 0 8px 20px rgba(0,0,0,0.15);">
                          <svg width="56" height="56" viewBox="0 0 24 24" fill="none" style="margin-top: 17px;">
                            <circle cx="12" cy="12" r="10" fill="#dc2626" opacity="0.2"/>
                            <path d="M12 9V13M12 17H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#dc2626" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                          </svg>
                        </td>
                      </tr>
                    </table>
                    <h1 class="title-main" style="margin: 24px 0 8px 0; color: #ffffff; font-size: 32px; font-weight: 700; letter-spacing: -0.5px;">Nueva Consulta</h1>
                    <p style="margin: 0; color: #fecaca; font-size: 16px; font-weight: 400;">Requiere atención prioritaria</p>
                  </td>
                </tr>
                
                <!-- Date Badge -->
                <tr>
                  <td class="content-padding" style="padding: 24px 40px;">
                    <div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border-left: 4px solid #f59e0b; padding: 16px 20px; border-radius: 8px;">
                      <table role="presentation">
                        <tr>
                          <td style="vertical-align: middle; padding-right: 12px;">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                              <path d="M12 8V12L15 15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#92400e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                          </td>
                          <td>
                            <p style="margin: 0; color: #92400e; font-size: 14px; font-weight: 600;">
                              Recibida: ${currentDate}
                            </p>
                          </td>
                        </tr>
                      </table>
                    </div>
                  </td>
                </tr>
                
                <!-- Client Info Card -->
                <tr>
                  <td class="content-padding" style="padding: 0 40px 24px 40px;">
                    <h2 class="title-section" style="margin: 0 0 16px 0; color: #111827; font-size: 20px; font-weight: 600;">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style="vertical-align: middle; margin-right: 8px;">
                        <path d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7ZM12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z" stroke="#2563eb" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                      Datos del Cliente
                    </h2>
                    <table role="presentation" style="width: 100%; background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border-radius: 12px; border: 1px solid #bfdbfe;">
                      <tr>
                        <td class="card-padding" style="padding: 24px;">
                          <!-- Name -->
                          <table role="presentation" style="width: 100%; margin-bottom: 16px;">
                            <tr>
                              <td style="width: 40px; vertical-align: top; padding-top: 2px;">
                                <div class="step-icon" style="width: 32px; height: 32px; background-color: #2563eb; border-radius: 8px; text-align: center; line-height: 32px;">
                                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style="vertical-align: middle;">
                                    <path d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                  </svg>
                                </div>
                              </td>
                              <td style="vertical-align: top; padding-left: 4px;">
                                <p style="margin: 0 0 4px 0; color: #6b7280; font-size: 13px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.5px;">Nombre Completo</p>
                                <p style="margin: 0; color: #111827; font-size: 18px; font-weight: 600;">${firstName} ${lastName}</p>
                              </td>
                            </tr>
                          </table>
                          
                          <!-- Email -->
                          <table role="presentation" style="width: 100%; margin-bottom: 16px;">
                            <tr>
                              <td style="width: 40px; vertical-align: top; padding-top: 2px;">
                                <div class="step-icon" style="width: 32px; height: 32px; background-color: #2563eb; border-radius: 8px; text-align: center; line-height: 32px;">
                                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style="vertical-align: middle;">
                                    <path d="M3 8L10.8906 13.2604C11.5624 13.7083 12.4376 13.7083 13.1094 13.2604L21 8M5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                  </svg>
                                </div>
                              </td>
                              <td style="vertical-align: top; padding-left: 4px;">
                                <p style="margin: 0 0 4px 0; color: #6b7280; font-size: 13px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.5px;">Email</p>
                                <p style="margin: 0;"><a href="mailto:${email}" style="color: #2563eb; font-size: 16px; font-weight: 500; text-decoration: none;">${email}</a></p>
                              </td>
                            </tr>
                          </table>
                          
                          ${phone ? `
                          <!-- Phone -->
                          <table role="presentation" style="width: 100%;">
                            <tr>
                              <td style="width: 40px; vertical-align: top; padding-top: 2px;">
                                <div class="step-icon" style="width: 32px; height: 32px; background-color: #2563eb; border-radius: 8px; text-align: center; line-height: 32px;">
                                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style="vertical-align: middle;">
                                    <path d="M3 5C3 3.89543 3.89543 3 5 3H8.27924C8.70967 3 9.09181 3.27543 9.22792 3.68377L10.7257 8.17721C10.8831 8.64932 10.6694 9.16531 10.2243 9.38787L7.96701 10.5165C9.06925 12.9612 11.0388 14.9308 13.4835 16.033L14.6121 13.7757C14.8347 13.3306 15.3507 13.1169 15.8228 13.2743L20.3162 14.7721C20.7246 14.9082 21 15.2903 21 15.7208V19C21 20.1046 20.1046 21 19 21H18C9.71573 21 3 14.2843 3 6V5Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                  </svg>
                                </div>
                              </td>
                              <td style="vertical-align: top; padding-left: 4px;">
                                <p style="margin: 0 0 4px 0; color: #6b7280; font-size: 13px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.5px;">Teléfono</p>
                                <p style="margin: 0;"><a href="tel:${phone}" style="color: #2563eb; font-size: 16px; font-weight: 500; text-decoration: none;">${phone}</a></p>
                              </td>
                            </tr>
                          </table>
                          ` : ''}
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                
                <!-- Message Section -->
                <tr>
                  <td class="content-padding" style="padding: 0 40px 24px 40px;">
                    <h2 class="title-section" style="margin: 0 0 12px 0; color: #111827; font-size: 20px; font-weight: 600; border-bottom: 2px solid #e5e7eb; padding-bottom: 12px;">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style="vertical-align: middle; margin-right: 8px;">
                        <path d="M7 8H17M7 12H17M7 16H13M5 3H19C20.1046 3 21 3.89543 21 5V15C21 16.1046 20.1046 17 19 17H13L7 21V17H5C3.89543 17 3 16.1046 3 15V5C3 3.89543 3.89543 3 5 3Z" stroke="#2563eb" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                      Mensaje / Consulta
                    </h2>
                    <div style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px;">
                      <p style="margin: 0; color: #374151; font-size: 15px; line-height: 1.7; white-space: pre-wrap;">${message}</p>
                    </div>
                  </td>
                </tr>
                
                ${hasAdditionalFields === 'true' && additionalData ? `
                <!-- Additional Info Section -->
                <tr>
                  <td class="content-padding" style="padding: 0 40px 24px 40px;">
                    <h2 class="title-section" style="margin: 0 0 12px 0; color: #111827; font-size: 20px; font-weight: 600; border-bottom: 2px solid #e5e7eb; padding-bottom: 12px;">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style="vertical-align: middle; margin-right: 8px;">
                        <path d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15M9 5C9 6.10457 9.89543 7 11 7H13C14.1046 7 15 6.10457 15 5M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5M12 12H15M12 16H15M9 12H9.01M9 16H9.01" stroke="#2563eb" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                      Información Adicional
                    </h2>
                    <div style="background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); border: 1px solid #86efac; border-radius: 8px; padding: 20px;">
                      <p style="margin: 0; color: #166534; font-size: 15px; line-height: 1.7; white-space: pre-wrap;">${additionalData}</p>
                    </div>
                    ${data.hasDocument ? `
                    <div style="margin-top: 16px; background-color: #fef3c7; border: 1px solid #fbbf24; border-radius: 8px; padding: 16px;">
                      <table role="presentation">
                        <tr>
                          <td style="vertical-align: middle; padding-right: 12px;">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                              <path d="M15.172 7L18.192 10.02M4 13C4 9.13401 4 7.20101 5.10051 5.93701C5.35785 5.64449 5.64449 5.35785 5.93701 5.10051C7.20101 4 9.13401 4 13 4H15C15.93 4 16.395 4 16.7765 4.10222C17.8117 4.37962 18.6204 5.18827 18.8978 6.22354C19 6.60504 19 7.07003 19 8M13 20H8.2C7.0799 20 6.51984 20 6.09202 19.782C5.71569 19.5903 5.40973 19.2843 5.21799 18.908C5 18.4802 5 17.9201 5 16.8V11.2C5 10.0799 5 9.51984 5.21799 9.09202C5.40973 8.71569 5.71569 8.40973 6.09202 8.21799C6.51984 8 7.0799 8 8.2 8H14.8C15.9201 8 16.4802 8 16.908 8.21799C17.2843 8.40973 17.5903 8.71569 17.782 9.09202C18 9.51984 18 10.0799 18 11.2V13M14 17H22M18 13V21" stroke="#92400e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                          </td>
                          <td>
                            <p style="margin: 0; color: #92400e; font-size: 14px; font-weight: 600;">Documento adjunto en este email</p>
                          </td>
                        </tr>
                      </table>
                    </div>
                    ` : ''}
                  </td>
                </tr>
                ` : ''}
                
                <!-- Footer -->
                <tr>
                  <td class="footer-padding" style="background: linear-gradient(180deg, #f9fafb 0%, #f3f4f6 100%); padding: 32px 40px; text-align: center; border-top: 1px solid #e5e7eb;">
                    <h3 style="margin: 0 0 8px 0; color: #111827; font-size: 20px; font-weight: 700;">Portal de Negocios</h3>
                    <p style="margin: 0 0 4px 0; color: #6b7280; font-size: 14px; font-weight: 500;">Servicios Financieros</p>
                    <p style="margin: 0 0 16px 0; color: #9ca3af; font-size: 13px; font-style: italic;">"Te buscamos la mejor opción para tu inversión o compra"</p>
                    <p style="margin: 0 0 20px 0; color: #9ca3af; font-size: 13px;">En colaboración con Grupo Alpes</p>
                    
                    <div style="border-top: 1px solid #e5e7eb; padding-top: 20px; margin-top: 20px;">
                      <p style="margin: 0; color: #9ca3af; font-size: 12px; line-height: 1.5;">
                        Email automático del formulario de consultas.<br>
                        Responde al cliente a la brevedad.
                      </p>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
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
      }

      // Enviar email
      const result = await transporter.sendMail(mailOptions);

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
        console.error('❌ SMTP no disponible para confirmación');
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
          <!DOCTYPE html>
          <html lang="es">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Consulta Recibida</title>
            <style>
              @media only screen and (max-width: 600px) {
                .email-container { width: 100% !important; }
                .email-padding { padding: 24px 20px !important; }
                .header-padding { padding: 32px 24px !important; }
                .content-padding { padding: 0 24px 20px 24px !important; }
                .card-padding { padding: 20px 16px !important; }
                .footer-padding { padding: 24px 20px !important; }
                .title-main { font-size: 26px !important; }
                .title-section { font-size: 18px !important; }
                .icon-circle { width: 70px !important; height: 70px !important; }
                .icon-circle svg { width: 44px !important; height: 44px !important; margin-top: 13px !important; }
                .step-icon { width: 28px !important; height: 28px !important; }
                .step-icon svg { width: 16px !important; height: 16px !important; }
              }
            </style>
          </head>
          <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f9fafb;">
            <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f9fafb;">
              <tr>
                <td class="email-padding" style="padding: 40px 20px;">
                  <table role="presentation" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.08); overflow: hidden;">
                    
                    <!-- Header with Success Icon -->
                    <tr>
                      <td class="header-padding" style="background: linear-gradient(135deg, #2563eb 0%, #3b82f6 50%, #60a5fa 100%); padding: 48px 40px; text-align: center;">
                        <table role="presentation" style="margin: 0 auto;">
                          <tr>
                            <td class="icon-circle" style="background-color: #ffffff; width: 90px; height: 90px; border-radius: 50%; text-align: center; vertical-align: middle; box-shadow: 0 8px 20px rgba(0,0,0,0.15);">
                              <svg width="56" height="56" viewBox="0 0 24 24" fill="none" style="margin-top: 17px;">
                                <circle cx="12" cy="12" r="10" fill="#10b981" opacity="0.2"/>
                                <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#10b981" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                              </svg>
                            </td>
                          </tr>
                        </table>
                        <h1 class="title-main" style="margin: 24px 0 8px 0; color: #ffffff; font-size: 32px; font-weight: 700; letter-spacing: -0.5px;">¡Consulta Recibida!</h1>
                        <p style="margin: 0; color: #e0e7ff; font-size: 16px; font-weight: 400;">Gracias por confiar en nosotros</p>
                      </td>
                    </tr>
                    
                    <!-- Greeting -->
                    <tr>
                      <td class="content-padding" style="padding: 30px 40px 20px 40px;">
                        <p style="margin: 0; color: #111827; font-size: 18px; line-height: 1.6; font-weight: 400;">
                          Hola <strong style="color: #2563eb; font-weight: 600;">${clientName}</strong>,
                        </p>
                      </td>
                    </tr>
                    
                    <!-- Main Message -->
                    <tr>
                      <td class="content-padding" style="padding: 0 40px 32px 40px;">
                        <p style="margin: 0 0 16px 0; color: #4b5563; font-size: 16px; line-height: 1.7;">
                          Hemos recibido tu consulta exitosamente. Nuestro equipo de expertos la está revisando y te contactaremos a la brevedad.
                        </p>
                        <p style="margin: 0; color: #4b5563; font-size: 16px; line-height: 1.7;">
                          Estamos aquí para ayudarte a encontrar la mejor solución para tus necesidades.
                        </p>
                      </td>
                    </tr>
                    
                    <!-- Next Steps Card -->
                    <tr>
                      <td class="content-padding" style="padding: 0 40px 32px 40px;">
                        <table role="presentation" style="width: 100%; background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border-radius: 12px; overflow: hidden;">
                          <tr>
                            <td class="card-padding" style="padding: 28px 24px;">
                              <h2 class="title-section" style="margin: 0 0 20px 0; color: #1e40af; font-size: 20px; font-weight: 600; display: flex; align-items: center;">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style="margin-right: 8px; vertical-align: middle;">
                                  <path d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15M9 5C9 6.10457 9.89543 7 11 7H13C14.1046 7 15 6.10457 15 5M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5M12 12H15M12 16H15M9 12H9.01M9 16H9.01" stroke="#1e40af" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                                Próximos Pasos
                              </h2>
                              
                              <!-- Step 1 -->
                              <table role="presentation" style="width: 100%; margin-bottom: 16px;">
                                <tr>
                                  <td style="width: 40px; vertical-align: top; padding-top: 2px;">
                                    <div class="step-icon" style="width: 32px; height: 32px; background-color: #2563eb; border-radius: 8px; text-align: center; line-height: 32px;">
                                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style="vertical-align: middle;">
                                        <path d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15M9 5C9 6.10457 9.89543 7 11 7H13C14.1046 7 15 6.10457 15 5M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                      </svg>
                                    </div>
                                  </td>
                                  <td style="vertical-align: top; padding-left: 4px;">
                                    <p style="margin: 0 0 4px 0; color: #1f2937; font-size: 15px; font-weight: 600; line-height: 1.4;">
                                      Análisis de tu Consulta
                                    </p>
                                    <p style="margin: 0; color: #6b7280; font-size: 14px; line-height: 1.5;">
                                      Revisaremos tu solicitud en detalle para ofrecerte la mejor solución
                                    </p>
                                  </td>
                                </tr>
                              </table>
                              
                              <!-- Step 2 -->
                              <table role="presentation" style="width: 100%; margin-bottom: 16px;">
                                <tr>
                                  <td style="width: 40px; vertical-align: top; padding-top: 2px;">
                                    <div class="step-icon" style="width: 32px; height: 32px; background-color: #2563eb; border-radius: 8px; text-align: center; line-height: 32px;">
                                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style="vertical-align: middle;">
                                        <path d="M3 5C3 3.89543 3.89543 3 5 3H8.27924C8.70967 3 9.09181 3.27543 9.22792 3.68377L10.7257 8.17721C10.8831 8.64932 10.6694 9.16531 10.2243 9.38787L7.96701 10.5165C9.06925 12.9612 11.0388 14.9308 13.4835 16.033L14.6121 13.7757C14.8347 13.3306 15.3507 13.1169 15.8228 13.2743L20.3162 14.7721C20.7246 14.9082 21 15.2903 21 15.7208V19C21 20.1046 20.1046 21 19 21H18C9.71573 21 3 14.2843 3 6V5Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                      </svg>
                                    </div>
                                  </td>
                                  <td style="vertical-align: top; padding-left: 4px;">
                                    <p style="margin: 0 0 4px 0; color: #1f2937; font-size: 15px; font-weight: 600; line-height: 1.4;">
                                      Contacto Personalizado
                                    </p>
                                    <p style="margin: 0; color: #6b7280; font-size: 14px; line-height: 1.5;">
                                      Te contactaremos en las próximas <strong style="color: #2563eb;">24-48 horas</strong> hábiles
                                    </p>
                                  </td>
                                </tr>
                              </table>
                              
                              <!-- Step 3 -->
                              <table role="presentation" style="width: 100%;">
                                <tr>
                                  <td style="width: 40px; vertical-align: top; padding-top: 2px;">
                                    <div class="step-icon" style="width: 32px; height: 32px; background-color: #2563eb; border-radius: 8px; text-align: center; line-height: 32px;">
                                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style="vertical-align: middle;">
                                        <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                      </svg>
                                    </div>
                                  </td>
                                  <td style="vertical-align: top; padding-left: 4px;">
                                    <p style="margin: 0 0 4px 0; color: #1f2937; font-size: 15px; font-weight: 600; line-height: 1.4;">
                                      Propuesta Personalizada
                                    </p>
                                    <p style="margin: 0; color: #6b7280; font-size: 14px; line-height: 1.5;">
                                      Te presentaremos las mejores opciones adaptadas a tus necesidades
                                    </p>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                    
                    <!-- Trust Badge -->
                    <tr>
                      <td class="content-padding" style="padding: 0 40px 32px 40px;">
                        <div class="card-padding" style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border-radius: 12px; padding: 24px; text-align: center; border: 1px solid #fbbf24;">
                          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" style="margin-bottom: 8px;">
                            <path d="M9 12L11 14L15 10M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" stroke="#92400e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                          </svg>
                          <p style="margin: 0; color: #78350f; font-size: 16px; font-weight: 600; line-height: 1.6;">
                            "Te buscamos la mejor opción para tu inversión o compra"
                          </p>
                          <p style="margin: 8px 0 0 0; color: #92400e; font-size: 13px;">
                            Compromiso y transparencia en cada paso
                          </p>
                        </div>
                      </td>
                    </tr>
                    
                    <!-- Contact Info -->
                    <tr>
                      <td class="content-padding" style="padding: 0 40px 32px 40px;">
                        <table role="presentation" style="width: 100%; background-color: #f9fafb; border-radius: 8px; padding: 20px;">
                          <tr>
                            <td style="text-align: center;">
                              <p style="margin: 0 0 8px 0; color: #6b7280; font-size: 14px;">
                                ¿Tienes alguna duda? Estamos aquí para ayudarte
                              </p>
                              <p style="margin: 0; color: #2563eb; font-size: 14px; font-weight: 500;">
                                Responde directamente a este email
                              </p>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                      <td class="footer-padding" style="background: linear-gradient(180deg, #f9fafb 0%, #f3f4f6 100%); padding: 32px 40px; text-align: center; border-top: 1px solid #e5e7eb;">
                        <h3 style="margin: 0 0 8px 0; color: #111827; font-size: 20px; font-weight: 700;">Portal de Negocios</h3>
                        <p style="margin: 0 0 4px 0; color: #6b7280; font-size: 14px; font-weight: 500;">Servicios Financieros</p>
                        <p style="margin: 0 0 20px 0; color: #9ca3af; font-size: 13px;">En colaboración con Grupo Alpes</p>
                        
                        <div style="border-top: 1px solid #e5e7eb; padding-top: 20px; margin-top: 20px;">
                          <p style="margin: 0; color: #9ca3af; font-size: 12px; line-height: 1.5;">
                            Este es un email automático, por favor no respondas a este mensaje.<br>
                            Para consultas, utiliza los canales oficiales de contacto.
                          </p>
                        </div>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </body>
          </html>
        `,
        text: `Hola ${clientName},\n\nRecibimos tu consulta exitosamente y nuestro equipo se pondrá en contacto contigo a la brevedad.\n\n¿Qué sigue?\n- Revisaremos tu consulta en detalle\n- Te contactaremos en las próximas 24-48 horas\n- Te presentaremos las mejores opciones disponibles\n\n"Te buscamos la mejor opción para tu inversión o compra"\n\nPortal de Negocios - En colaboración con Grupo Alpes`
      };

      const result = await transporter.sendMail(mailOptions);
      console.log('✅ Confirmación enviada a', clientEmail);
      
      return {
        success: true,
        messageId: result.messageId
      };

    } catch (error) {
      console.error('❌ Error en confirmación:', error.message);
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