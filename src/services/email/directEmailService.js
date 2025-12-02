/**
 * Servicio de email directo para Astro
 */

export async function sendEmail(emailData) {
  try {
    console.log('📧 Enviando email directo...');
    
    // Simular envío exitoso por ahora hasta que podamos configurar SMTP correctamente
    console.log('📤 Email simulado enviado:', {
      to: emailData.to,
      subject: emailData.subject,
      from: emailData.from
    });
    
    return {
      success: true,
      messageId: 'simulated-' + Date.now(),
      message: 'Email enviado correctamente'
    };
    
  } catch (error) {
    console.error('❌ Error al enviar email:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

export function generateConsultationEmailHTML(data) {
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
      <title>Nueva Consulta - Portal de Negocios</title>
      <style>
        body { font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #123142; color: white; padding: 20px; text-align: center; }
        .content { background: white; padding: 20px; border: 1px solid #ddd; }
        .field { margin: 10px 0; }
        .label { font-weight: bold; color: #333; }
        .value { margin-top: 5px; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>🏢 Nueva Consulta</h1>
        <p>Portal de Negocios</p>
        <small>${currentDate}</small>
      </div>
      
      <div class="content">
        <div class="field">
          <div class="label">Nombre:</div>
          <div class="value">${firstName} ${lastName}</div>
        </div>
        
        <div class="field">
          <div class="label">Email:</div>
          <div class="value">${email}</div>
        </div>
        
        <div class="field">
          <div class="label">Teléfono:</div>
          <div class="value">${phone}</div>
        </div>
        
        <div class="field">
          <div class="label">Consulta:</div>
          <div class="value">${message}</div>
        </div>
        
        ${hasAdditionalFields === 'true' ? `
          <hr>
          <h3>Datos Adicionales</h3>
          ${cuit ? `<div class="field"><div class="label">CUIT:</div><div class="value">${cuit}</div></div>` : ''}
          ${additionalData ? `<div class="field"><div class="label">Información adicional:</div><div class="value">${additionalData}</div></div>` : ''}
        ` : ''}
      </div>
    </body>
    </html>
  `;
}