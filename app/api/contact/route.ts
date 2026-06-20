import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type ContactPayload = {
  name: string;
  email: string;
  message: string;
  subject: string;
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message, subject, _hp } = body as {
      name?: string;
      email?: string;
      message?: string;
      subject?: string;
      _hp?: string;
    };

    if (_hp?.trim()) {
      return NextResponse.json({ ok: true });
    }

    const payload = validatePayload(name, email, message, subject);
    if ("error" in payload) {
      return NextResponse.json({ error: payload.error }, { status: 400 });
    }

    const configError = getSmtpConfigError();
    if (configError) {
      console.error("[contact]", configError);
      return NextResponse.json({ error: configError }, { status: 503 });
    }

    const toEmail = process.env.CONTACT_EMAIL!.trim();
    const result = await sendWithNodemailer(payload, toEmail);

    if (!result.ok) {
      console.error("[contact] Nodemailer error:", result.error);
      return NextResponse.json({ error: result.error }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact]", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}

function validatePayload(
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

function getSmtpConfigError(): string | null {
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS?.trim();
  const to = process.env.CONTACT_EMAIL?.trim();

  if (!user || !pass || !to) {
    return "Email is not configured. Add SMTP_USER, SMTP_PASS, and CONTACT_EMAIL to .env.local (see .env.example).";
  }
  return null;
}

function createTransporter() {
  const host = process.env.SMTP_HOST?.trim() || "smtp.gmail.com";
  const port = Number(process.env.SMTP_PORT ?? "465");
  const secure = process.env.SMTP_SECURE !== "false";

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user: process.env.SMTP_USER!.trim(),
      pass: process.env.SMTP_PASS!.trim(),
    },
  });
}

async function sendWithNodemailer(
  payload: ContactPayload,
  toEmail: string
): Promise<{ ok: true } | { ok: false; error: string }> {
  try {
    const transporter = createTransporter();
    const fromUser = process.env.SMTP_USER!.trim();
    const from =
      process.env.SMTP_FROM?.trim() || `"Portfolio — Sudhir Gomase" <${fromUser}>`;

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
          "Email authentication failed. For Gmail, use an App Password (not your normal password). See .env.example.",
      };
    }
    return { ok: false, error: "Could not send email. Please try again or contact me directly." };
  }
}

function formatPlainText(payload: ContactPayload): string {
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

function formatHtml(payload: ContactPayload): string {
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
