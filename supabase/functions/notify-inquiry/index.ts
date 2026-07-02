import "jsr:@supabase/functions-js/edge-runtime.d.ts";

type InquiryRecord = {
  id: string;
  created_at: string;
  type: "contact" | "quote" | "career";
  name: string;
  email: string;
  phone: string | null;
  subject: string | null;
  message: string;
  payload: Record<string, unknown>;
};

type WebhookPayload = {
  type: string;
  table: string;
  record: InquiryRecord;
};

const INQUIRY_TYPES = new Set(["contact", "quote", "career"]);

function notifyEmail(type: InquiryRecord["type"]): string {
  switch (type) {
    case "quote":
      return Deno.env.get("NOTIFY_QUOTE_EMAIL") ?? "sean@prodsec.ca";
    case "career":
      return Deno.env.get("NOTIFY_CAREERS_EMAIL") ?? "elie@prodsec.ca";
    default:
      return Deno.env.get("NOTIFY_CONTACT_EMAIL") ?? "info@prodsec.ca";
  }
}

function typeLabel(type: InquiryRecord["type"]): string {
  switch (type) {
    case "quote":
      return "Quote request";
    case "career":
      return "Career application";
    default:
      return "Contact inquiry";
  }
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && value.length <= 320;
}

Deno.serve(async (req) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  const webhookSecret = Deno.env.get("WEBHOOK_SECRET");
  if (!webhookSecret) {
    console.error("Missing WEBHOOK_SECRET");
    return new Response("Not configured", { status: 500 });
  }

  const providedSecret = req.headers.get("x-webhook-secret");
  if (!providedSecret || providedSecret !== webhookSecret) {
    return new Response("Unauthorized", { status: 401 });
  }

  const resendKey = Deno.env.get("RESEND_API_KEY");
  if (!resendKey) {
    console.error("Missing RESEND_API_KEY");
    return new Response("Email not configured", { status: 500 });
  }

  let body: WebhookPayload;
  try {
    body = await req.json();
  } catch {
    return new Response("Invalid JSON", { status: 400 });
  }

  if (body.type !== "INSERT" || body.table !== "inquiries") {
    return new Response("Invalid webhook event", { status: 400 });
  }

  const record = body.record;
  if (
    !record?.id ||
    !record?.type ||
    !INQUIRY_TYPES.has(record.type) ||
    !record?.name?.trim() ||
    !record?.message?.trim() ||
    !isValidEmail(record.email)
  ) {
    return new Response("Invalid inquiry record", { status: 400 });
  }

  const to = notifyEmail(record.type);
  const from = Deno.env.get("NOTIFY_FROM") ?? "Prodsec Website <onboarding@resend.dev>";
  const subject = record.subject ?? `${typeLabel(record.type)} from ${record.name}`;
  const dashboardUrl = Deno.env.get("SUPABASE_DASHBOARD_URL") ?? "";

  const text = [
    `${typeLabel(record.type)}`,
    "",
    `Name: ${record.name}`,
    `Email: ${record.email}`,
    record.phone ? `Phone: ${record.phone}` : null,
    "",
    record.message,
    "",
    dashboardUrl ? `View in Supabase: ${dashboardUrl}` : null,
    `Submission ID: ${record.id}`,
  ]
    .filter(Boolean)
    .join("\n");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: record.email,
      subject,
      text,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error("Resend error:", err);
    return new Response("Failed to send email", { status: 502 });
  }

  return new Response(JSON.stringify({ ok: true }), {
    headers: { "Content-Type": "application/json" },
  });
});
