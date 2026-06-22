import {
  getContactConfigError,
  sendContactEmail,
  validateContactPayload,
  type ContactEnv,
} from "../../lib/contactServer";

type PagesContext = {
  request: Request;
  env: ContactEnv;
};

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

export const onRequestPost = async (context: PagesContext) => {
  try {
    const body = (await context.request.json()) as {
      name?: string;
      email?: string;
      message?: string;
      subject?: string;
      _hp?: string;
    };

    if (body._hp?.trim()) {
      return json({ ok: true });
    }

    const payload = validateContactPayload(body.name, body.email, body.message, body.subject);
    if ("error" in payload) {
      return json({ error: payload.error }, 400);
    }

    const configError = getContactConfigError(context.env);
    if (configError) {
      console.error("[contact]", configError);
      return json({ error: configError }, 503);
    }

    const result = await sendContactEmail(payload, context.env);
    if (!result.ok) {
      console.error("[contact] send error:", result.error);
      return json({ error: result.error }, 502);
    }

    return json({ ok: true });
  } catch (err) {
    console.error("[contact]", err);
    return json({ error: "Something went wrong. Please try again." }, 500);
  }
};
