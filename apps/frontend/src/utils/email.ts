import nodemailer from 'nodemailer';

export async function sendEmail(options: { to: string; subject: string; text: string; html?: string }) {
  const user = process.env.SMTP_USER || process.env.EMAIL_USER;
  const pass = process.env.SMTP_PASS || process.env.EMAIL_PASS;
  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT;

  if (!host || !port || !user || !pass) {
    console.warn('SMTP configuration is incomplete. Email will not be sent.');
    console.info('Config status:', { host: !!host, port: !!port, user: !!user, pass: !!pass });
    return;
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: user,
      pass: pass,
    },
  });

  await transporter.sendMail({
    from: process.env.SMTP_FROM || user,
    to: options.to,
    subject: options.subject,
    text: options.text,
    html: options.html,
  });
}
