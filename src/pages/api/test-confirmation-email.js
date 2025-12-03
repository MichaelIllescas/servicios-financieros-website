import { getEmailService } from '../../services/email/emailService.js';

/**
 * Endpoint de prueba para verificar el envío de email de confirmación
 */
export async function GET() {
  try {
    console.log('🧪 [TEST] Iniciando prueba de email de confirmación...');
    
    const emailService = getEmailService();
    
    const testEmail = 'jonii@example.com'; // Cambia esto por tu email de prueba
    const testName = 'Juan Pérez';
    
    console.log('🧪 [TEST] Enviando email a:', testEmail);
    
    const result = await emailService.sendConfirmationEmail(testEmail, testName);
    
    console.log('🧪 [TEST] Resultado:', result);
    
    return new Response(
      JSON.stringify({
        success: result.success,
        message: result.success 
          ? `Email de confirmación enviado exitosamente a ${testEmail}` 
          : `Error al enviar email: ${result.error}`,
        messageId: result.messageId || null,
        error: result.error || null
      }),
      {
        status: result.success ? 200 : 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
    
  } catch (error) {
    console.error('🧪 [TEST] Error en prueba:', error);
    
    return new Response(
      JSON.stringify({
        success: false,
        message: 'Error al ejecutar prueba',
        error: error.message,
        stack: error.stack
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}

export const prerender = false;
