// Prueba simple para verificar configuración SMTP
import nodemailer from 'nodemailer';

async function testSMTP() {
  console.log('🧪 Iniciando prueba SMTP...');
  
  try {
    // Configuración SMTP
    const transporter = nodemailer.createTransporter({
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
    });

    // Verificar conexión
    console.log('📡 Verificando conexión SMTP...');
    await transporter.verify();
    console.log('✅ Conexión SMTP exitosa');

    // Enviar email de prueba
    console.log('📤 Enviando email de prueba...');
    const result = await transporter.sendMail({
      from: '"Portal de Negocios" <info@imperial-net.com>',
      to: 'info@imperial-net.com',
      subject: '🧪 Prueba SMTP - ' + new Date().toLocaleString(),
      html: `
        <h2>Prueba SMTP Exitosa</h2>
        <p>Este es un email de prueba enviado desde el Portal de Negocios.</p>
        <p><strong>Fecha:</strong> ${new Date().toLocaleString()}</p>
        <p>Si recibes este email, la configuración SMTP está funcionando correctamente.</p>
      `,
      text: 'Prueba SMTP exitosa - Portal de Negocios'
    });

    console.log('✅ Email enviado exitosamente:', result.messageId);
    return { success: true, messageId: result.messageId };

  } catch (error) {
    console.error('❌ Error en prueba SMTP:', error.message);
    return { success: false, error: error.message };
  }
}

export { testSMTP };