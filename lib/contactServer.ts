const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type ContactPayload = {
  name: string;
  email: string;
  message: string;
  subject: string;
};

export type ContactEnv = {
  CONTACT_EMAIL?: string;
  SMTP_USER?: string;
  SMTP_PASS?: string;
  SMTP_HOST?: string;
  SMTP_PORT?: string;
  SMTP_SECURE?: string;
  SMTP_FROM?: string;
};

export function validateContactPayload(
  name?: string,
  email?: string,
  message?: string,
  subject?: string
): ContactPayload | { error: string } {
  const trimmedName = name?.trim() ?? "";
  const trimmedEmail = email?.trim() ?? "";
  const trimmedMessage = message?.trim() ?? "";
  const trimmedSubject = subject?.trim() || "Portfolio inquiry";

  if (!trimmedName || trimmedName.length < 2) {
    return { error: "Please enter your name." };
  }
  if (!trimmedEmail || !EMAIL_RE.test(trimmedEmail)) {
    return { error: "Please enter a valid email." };
  }
  if (!trimmedMessage || trimmedMessage.length < 10) {
    return { error: "Message must be at least 10 characters." };
  }
  if (trimmedMessage.length > 5000) {
    return { error: "Message is too long." };
  }

  return {
    name: trimmedName,
    email: trimmedEmail,
    message: trimmedMessage,
    subject: trimmedSubject,
  };
}

export function getSmtpConfigError(env: ContactEnv): string | null {
  const user = env.SMTP_USER?.trim();
  const pass = env.SMTP_PASS?.trim();
  const to = env.CONTACT_EMAIL?.trim();

  if (!user || !pass || !to) {
    return "Email is not configured. Add SMTP_USER, SMTP_PASS, and CONTACT_EMAIL in Cloudflare environment variables.";
  }
  return null;
}

export function formatPlainText(payload: ContactPayload): string {
  return [
    "New message from your portfolio",
    "",
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `Subject: ${payload.subject}`,
    "",
    payload.message,
  ].join("\n");
}

export function formatHtml(payload: ContactPayload): string {
  return `
    <div style="font-family:Arial,sans-serif;max-width:560px;color:#111">
      <h2 style="margin:0 0 16px">New portfolio message</h2>
      <p><strong>Name:</strong> ${escapeHtml(payload.name)}</p>
      <p><strong>Email:</strong> <a href="mailto:${escapeHtml(payload.email)}">${escapeHtml(payload.email)}</a></p>
      <p><strong>Subject:</strong> ${escapeHtml(payload.subject)}</p>
      <hr style="border:none;border-top:1px solid #ddd;margin:20px 0" />
      <p style="white-space:pre-wrap;line-height:1.6">${escapeHtml(payload.message)}</p>
    </div>
  `;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function sendContactEmail(
  payload: ContactPayload,
  env: ContactEnv
): Promise<{ ok: true } | { ok: false; error: string }> {
  const nodemailer = await import("nodemailer");
  const host = env.SMTP_HOST?.trim() || "smtp.gmail.com";
  const port = Number(env.SMTP_PORT ?? "465");
  const secure = env.SMTP_SECURE !== "false";
  const toEmail = env.CONTACT_EMAIL!.trim();
  const fromUser = env.SMTP_USER!.trim();
  const from = env.SMTP_FROM?.trim() || `"Portfolio — Sudhir Gomase" <${fromUser}>`;

  try {
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: {
        user: fromUser,
        pass: env.SMTP_PASS!.trim(),
      },
    });

    await transporter.sendMail({
      from,
      to: toEmail,
      replyTo: payload.email,
      subject: `[Portfolio] ${payload.subject} — ${payload.name}`,
      text: formatPlainText(payload),
      html: formatHtml(payload),
    });

    return { ok: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to send email";
    if (/invalid login|authentication|535|534/i.test(message)) {
      return {
        ok: false,
        error:
          "Email authentication failed. For Gmail, use an App Password (not your normal password).",
      };
    }
    return { ok: false, error: "Could not send email. Please try again or contact me directly." };
  }
}
