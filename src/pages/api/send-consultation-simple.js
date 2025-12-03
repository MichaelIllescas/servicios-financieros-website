  import {getEmailService} from '../../services/email/emailService.js';

  /**
 * Endpoint POST para procesar consultas del formulario

 */

  export async function POST({request}) {
    try { 
      console.log('📧 API: Recibiendo solicitud de consulta...');
      
      const formData = await request.formData();

    // Extraer datos del formulario
    const consultationData = {
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      email: formData.get('email'), 
      phone: formData.get('phone'),
      message: formData.get('message'),
      additionalData: formData.get('additionalData') || '',
      hasAdditionalFields: formData.get('hasAdditionalFields') || 'false'
    };

    console.log('📧 API: Datos  recibidos:', {
      nombre: consultationData.firstName,
      apellido: consultationData.lastName,
      email: consultationData.email
    });

    // Validar campos obligatorios
    if (!consultationData.firstName || !consultationData.lastName ||
       !consultationData.email || !consultationData.message) {
        return new Response(
          JSON.stringify({
            success: false,
          error: 'Todos los campos son obligatorios.'
        }), 
        {
          status: 400,
          headers: {'Content-Type': 'application/json'}
    }
      );
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(consultationData.email)) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'El formato del email es inválido.'
        }),
        {
          status: 400,
          headers: {'Content-Type': 'application/json'}
        }
      );
    }

    // Procesar archivo adjunto si existe
    const documentFile = formData.get('document');  
    let processedDocument = null;

    if (documentFile && documentFile.size > 0) {
      // Validar tipo de archivo
      const allowedTypes = [
        'application/pdf',
        'image/jpeg',
        'image/jpg',  
        'image/png',
        'image/gif'
      ];  

      if (!allowedTypes.includes(documentFile.type)) {
        return new Response(
          JSON.stringify({
            success: false,
            error: 'Tipo de archivo no permitido. Solo se permiten PDF e imágenes.'
          }),
          
          {
            status: 400,
            headers: {'Content-Type': 'application/json'}
          }
        );
      }
      
      // Validar tamaño (máximo 30MB)
      const maxSizeInBytes = 30 * 1024 * 1024; // 30MB
      if (documentFile.size > maxSizeInBytes) {
        return new Response(
          JSON.stringify({
            success: false,
            error: 'El tamaño del archivo excede el límite de 30MB.'
          }),
          {
            status: 400,
            headers: {'Content-Type': 'application/json'}
          }
        );
      }

       // Convertir archivo a buffer
       const buffer = await documentFile.arrayBuffer();
        processedDocument = {
          name: documentFile.name,
          buffer: Buffer.from(buffer),  
          type: documentFile.type,
          size: documentFile.size
        };

        console.log('📎  API: Archivo adjunto:', documentFile.name, `(${(documentFile.size / 1024).toFixed(2)} KB)`);
    }

    // Obtener servicio de email
    const emailService = getEmailService();

  

    // Enviar email principal
    console.log('📤 API: Enviando email de consulta...');
    const emailResult = await emailService.sendConsultationEmail(consultationData, processedDocument);

    if (!emailResult.success) {
      console.error('❌ API: Error al enviar email :', emailResult.error);
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Error al enviar el email de consulta. Inténtelo nuevamente más tarde.'
        }),
        {
          status: 500,
          headers: {'Content-Type': 'application/json'}
        }  
      );
    }

    // Enviar email de confirmación al cliente (no bloquear si falla)
    try {
      console.log('📧  Enviando email de confirmación al cliente...');
      await emailService.sendConfirmationEmail(
        consultationData.email,
         `${consultationData.firstName} ${consultationData.lastName}`
      );
    } catch (confirmError) {
      console.warn('⚠️  No se pudo enviar email de confirmación al cliente:', confirmError.message);
    }

    console.log('✅ Consulta procesada exitosamente.');

     // Respuesta exitosa
    return new Response(
      JSON.stringify({
        success: true,
        message: 'Consulta enviada exitosamente. Te contactaremos pronto Por favor, revisá tu bandeja de correos no deseados o spam.',
        messageId: emailResult.messageId
      }),
      {
        status: 200,
        headers: {'Content-Type': 'application/json'}
      }
    );
  } catch (error) {
    console.error('❌ API: Error inesperado al procesar la consulta:', error);

    return new Response(
      JSON.stringify({
        success: false,
        error: 'Error inesperado al procesar la consulta. Inténtelo nuevamente más tarde.'
      }),

      {
        status: 500,
        headers: {'Content-Type': 'application/json'}
      }
    );
  }
}
 // configruacion para astro
export const prerender = false;


