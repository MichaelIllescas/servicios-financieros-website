import { sendEmail, generateConsultationEmailHTML } from '../../services/email/directEmailService.js';

export async function POST({ request }) {
  try {
    console.log('📧 API: Recibiendo solicitud de consulta...');
    
    const formData = await request.formData();
    
    // Extraer valores del formData
    const data = {
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      message: formData.get('message'),
      cuit: formData.get('cuit'),
      additionalData: formData.get('additionalData'),
      hasAdditionalFields: formData.get('hasAdditionalFields')
    };
    
    console.log('📧 Datos del formulario:', data);
    
    // Validar campos obligatorios
    if (!data.firstName || !data.lastName || !data.email || !data.phone || !data.message) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Faltan campos obligatorios'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Generar HTML del email
    const emailHTML = generateConsultationEmailHTML(data);
    
    // Enviar email de consulta (por ahora simulado)
    console.log('📧 Enviando email de consulta...');
    const consultationResult = await sendEmail({
      to: 'info@imperial-net.com',
      from: `"${data.firstName} ${data.lastName}" <${data.email}>`,
      subject: `Nueva Consulta - ${data.firstName} ${data.lastName}`,
      html: emailHTML
    });
    
    if (!consultationResult.success) {
      console.error('❌ Error al enviar email de consulta:', consultationResult.error);
      return new Response(JSON.stringify({
        success: false,
        error: 'Error al enviar la consulta: ' + consultationResult.error
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Enviar email de confirmación al usuario
    console.log('📧 Enviando email de confirmación...');
    const confirmationResult = await sendEmail({
      to: data.email,
      from: 'Portal de Negocios <info@imperial-net.com>',
      subject: 'Confirmación de consulta recibida',
      html: `
        <h2>¡Gracias por tu consulta, ${data.firstName}!</h2>
        <p>Hemos recibido tu consulta y la procesaremos a la brevedad.</p>
        <p>Te contactaremos pronto a través del email o teléfono proporcionado.</p>
        <br>
        <p><strong>Portal de Negocios</strong></p>
        <p>En colaboración con Grupo Alpes</p>
      `
    });
    
    console.log('✅ Consulta procesada exitosamente');
    return new Response(JSON.stringify({
      success: true,
      message: 'Consulta enviada correctamente',
      consultationId: consultationResult.messageId,
      confirmationSent: confirmationResult.success
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
    
  } catch (error) {
    console.error('❌ Error en API send-consultation:', error);
    return new Response(JSON.stringify({
      success: false,
      error: 'Error interno del servidor: ' + error.message
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}