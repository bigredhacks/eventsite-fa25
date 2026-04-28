import nodemailer from 'nodemailer';
import { Registration } from '../types/registration';

function createTransporter() {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    return null;
  }
  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT ?? 587),
    secure: Number(SMTP_PORT ?? 587) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });
}

const SUBJECTS: Record<string, string> = {
  accepted: 'Your BigRed//Hacks Application — You\'re In!',
  waitlisted: 'Your BigRed//Hacks Application — Waitlist Update',
  rejected: 'Your BigRed//Hacks Application — Status Update',
};

const BODIES: Record<string, (name: string) => string> = {
  accepted: (name) =>
    `Hi ${name},\n\nCongratulations! You've been accepted to BigRed//Hacks. We're thrilled to have you join us.\n\nPlease check your dashboard to confirm your attendance. More details about the event will follow soon.\n\nSee you there!\n— The BigRed//Hacks Team`,
  waitlisted: (name) =>
    `Hi ${name},\n\nThank you for applying to BigRed//Hacks. You've been placed on our waitlist. If a spot opens up, we'll reach out right away.\n\nWe appreciate your interest and hope to see you at a future event.\n\n— The BigRed//Hacks Team`,
  rejected: (name) =>
    `Hi ${name},\n\nThank you for applying to BigRed//Hacks. After careful consideration, we're unable to offer you a spot this year due to limited capacity.\n\nWe hope you'll apply again in the future!\n\n— The BigRed//Hacks Team`,
};

export async function sendStatusEmail(
  registration: Registration,
  newStatus: string
): Promise<void> {
  const transporter = createTransporter();
  if (!transporter) {
    console.warn('SMTP env vars not set — skipping status email');
    return;
  }

  const to = registration.email;
  if (!to) return;

  const name = registration.first_name ?? 'Hacker';
  const subject = SUBJECTS[newStatus];
  const text = BODIES[newStatus]?.(name);
  if (!subject || !text) return;

  await transporter.sendMail({
    from: process.env.EMAIL_FROM ?? 'BigRed//Hacks <noreply@bigredhacks.com>',
    to,
    subject,
    text,
  });
}
