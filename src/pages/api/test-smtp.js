import { testSMTP } from '../../services/email/testSMTP.js';

export async function GET() {
  console.log('🧪 Ejecutando prueba SMTP...');
  
  try {
    const result = await testSMTP();
    
    return new Response(
      JSON.stringify({
        success: result.success,
        message: result.success ? 'SMTP funcionando correctamente' : 'Error en SMTP',
        details: result.success ? `Email enviado: ${result.messageId}` : result.error
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        message: 'Error en prueba SMTP',
        error: error.message
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}

export const prerender = false;