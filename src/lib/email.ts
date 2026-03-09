import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'localhost',
    port: parseInt(process.env.SMTP_PORT || '1025'),
    secure: process.env.SMTP_PORT === '465',
    auth: process.env.SMTP_USER ? {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    } : undefined,
});

interface SendEmailOptions {
    to: string;
    subject: string;
    html: string;
}

export const emailService = {
    async sendEmail({ to, subject, html }: SendEmailOptions) {
        try {
            await transporter.sendMail({
                from: process.env.SMTP_FROM || 'no-reply@byteflow.dev',
                to,
                subject,
                html,
            });
            return { success: true };
        } catch (error) {
            console.error('Error sending email:', error);
            return { success: false, error };
        }
    },

    generateResetPasswordTemplate(resetUrl: string) {
        return `
      <!DOCTYPE html>
      <html lang="es">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Recuperar Contraseña</title>
          <style>
              body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #334155; margin: 0; padding: 0; }
              .container { max-width: 600px; margin: 40px auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px; }
              .logo { font-size: 24px; font-weight: bold; color: #2563eb; margin-bottom: 24px; }
              h1 { font-size: 20px; color: #0f172a; margin-bottom: 16px; }
              p { margin-bottom: 24px; }
              .button { display: inline-block; padding: 12px 24px; background-color: #2563eb; color: #ffffff !important; text-decoration: none; border-radius: 8px; font-weight: 600; }
              .footer { margin-top: 32px; font-size: 12px; color: #94a3b8; border-top: 1px solid #f1f5f9; padding-top: 16px; }
          </style>
      </head>
      <body>
          <div class="container">
              <div class="logo">Byteflow</div>
              <h1>Recuperar acceso</h1>
              <p>Has solicitado restablecer tu contraseña. Haz clic en el siguiente botón para continuar con el proceso:</p>
              <a href="${resetUrl}" class="button">Restablecer contraseña</a>
              <p>Este enlace expirará en 1 hora. Si no solicitaste este cambio, puedes ignorar este correo.</p>
              <div class="footer">
                  © ${new Date().getFullYear()} Byteflow. Todos los derechos reservados.
              </div>
          </div>
      </body>
      </html>
    `;
    }
};
