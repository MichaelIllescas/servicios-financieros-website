import { getEmailService } from '../../services/email/emailService.js';
import formidable from 'formidable';
import fs from 'fs';

export async function POST({ request }) {
  try {
    // Verificar que el método sea POST
    if (request.method !== 'POST') {
      return new Response(
        JSON.stringify({ error: 'Método no permitido' }),
        { 
          status: 405,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    console.log('📧 Procesando nueva consulta...');

    // Obtener datos del formulario
    const formData = await request.formData();
    
    // Extraer campos del formulario
    const consultationData = {
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      message: formData.get('message'),
      cuit: formData.get('cuit') || '',
      additionalData: formData.get('additionalData') || '',
      hasAdditionalFields: formData.get('hasAdditionalFields')
    };

    // Obtener archivo si existe
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
            error: 'Tipo de archivo no permitido. Solo se aceptan PDF e imágenes.' 
          }),
          { 
            status: 400,
            headers: { 'Content-Type': 'application/json' }
          }
        );
      }

      // Validar tamaño (máximo 5MB)
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (documentFile.size > maxSize) {
        return new Response(
          JSON.stringify({ 
            error: 'Archivo demasiado grande. Máximo 5MB permitido.' 
          }),
          { 
            status: 400,
            headers: { 'Content-Type': 'application/json' }
          }
        );
      }

      // Convertir archivo a buffer para el email
      const buffer = await documentFile.arrayBuffer();
      processedDocument = {
        name: documentFile.name,
        buffer: Buffer.from(buffer),
        type: documentFile.type,
        size: documentFile.size
      };
    }

    // Validaciones básicas
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'message'];
    const missingFields = requiredFields.filter(field => !consultationData[field]);

    if (missingFields.length > 0) {
      return new Response(
        JSON.stringify({ 
          error: `Campos requeridos faltantes: ${missingFields.join(', ')}` 
        }),
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Validación de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(consultationData.email)) {
      return new Response(
        JSON.stringify({ error: 'Email inválido' }),
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    console.log('📧 Enviando consulta por email...');

    // Obtener instancia del servicio de email
    const emailService = await getEmailService();

    // Enviar email principal (a la empresa)
    const emailResult = await emailService.sendConsultationEmail(
      consultationData, 
      processedDocument
    );

    if (!emailResult.success) {
      console.error('❌ Error al enviar email principal:', emailResult.error);
      
      // Si es un error de configuración SMTP, pero los datos son válidos
      if (emailResult.message && emailResult.message.includes('simulado')) {
        return new Response(
          JSON.stringify({ 
            success: true,
            message: 'Consulta recibida correctamente. Te contactaremos pronto.',
            note: 'Email en modo simulado (configuración SMTP pendiente)',
            messageId: emailResult.messageId
          }),
          { 
            status: 200,
            headers: { 'Content-Type': 'application/json' }
          }
        );
      }
      
      return new Response(
        JSON.stringify({ 
          error: 'Error al procesar tu consulta. Inténtalo nuevamente.' 
        }),
        { 
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Enviar email de confirmación al cliente (opcional, no bloquear si falla)
    try {
      await emailService.sendConfirmationEmail(
        consultationData.email,
        `${consultationData.firstName} ${consultationData.lastName}`
      );
      console.log('✅ Email de confirmación enviado al cliente');
    } catch (confirmError) {
      console.warn('⚠️ Error al enviar confirmación al cliente (no crítico):', confirmError);
    }

    console.log('✅ Consulta procesada exitosamente');

    // Respuesta exitosa
    return new Response(
      JSON.stringify({ 
        success: true,
        message: 'Consulta enviada exitosamente. Te contactaremos pronto.',
        messageId: emailResult.messageId
      }),
      { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('❌ Error en endpoint de consulta:', error);
    
    return new Response(
      JSON.stringify({ 
        error: 'Error interno del servidor. Inténtalo más tarde.',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      }),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}

// Configuración para Astro
export const prerender = false;