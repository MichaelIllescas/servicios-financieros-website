import {getEmailService} from '../../services/email/emailService.js';

/**
 * Endpoint GET para probar la configuración SMTP
 
 */

export async function GET() {
    console.log ('🧪 Ejecutando prueba SMTP...');

    try {
        const emailService = getEmailService();
        const result = await (await emailService).testConnection();

     return new Response(
        JSON.stringify({    
            success: result.success,
            message: result.message 
             ? '✅ SMTP funcionando correctamente' 
          : '❌ Error en configuración SMTP',
          details: result.success
            ? `Email de prueba enviado. ID: ${result.messageId}` 
          : result.error,
        timestamp: new Date().toISOString()
      }),
      {
        status: result.success ? 200 : 500,
        headers: {'Content-Type': 'application/json'}   
      });
      } catch (error) {
        console.error('❌ Error inesperado durante la prueba SMTP:', error);
        return new Response(
            JSON.stringify({
                success: false,
                message: 'Error inesperado durante la prueba SMTP. Revise los logs del servidor.',
                error: error.message,
                timestamp: new Date().toISOString() 
            }),
            {
                status: 500,
                headers: {'Content-Type': 'application/json'}
            }
        );
    }

}


export const prerender = false;

