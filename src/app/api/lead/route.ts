import { NextResponse } from "next/server";

export const runtime = "nodejs";

// Simple in-memory rate limit (per server instance). For multi-instance
// production deployments, use Upstash Redis or your host's WAF rules instead.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, { count: number; start: number }>();

function limited(ip: string) {
  const now = Date.now();
  if (hits.size > 5000) hits.clear();
  const rec = hits.get(ip);
  if (!rec || now - rec.start > WINDOW_MS) {
    hits.set(ip, { count: 1, start: now });
    return false;
  }
  rec.count += 1;
  return rec.count > MAX_PER_WINDOW;
}

const clean = (v: unknown, max: number) =>
  typeof v === "string" ? v.replace(/[\u0000-\u001f\u007f]/g, " ").trim().slice(0, max) : "";

const fail = (error: string, status: number) => NextResponse.json({ error }, { status });

export async function POST(req: Request) {
  // Same-origin check
  const origin = req.headers.get("origin");
  const host = req.headers.get("host");
  if (origin && host) {
    let originHost = "";
    try { originHost = new URL(origin).host; } catch { /* invalid */ }
    if (originHost !== host) return fail("Forbidden", 403);
  }

  if (Number(req.headers.get("content-length") ?? 0) > 10_000) return fail("Request too large", 413);

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (limited(ip)) return fail("Too many requests. Please message us on WhatsApp instead.", 429);

  let raw: Record<string, unknown>;
  try {
    raw = await req.json();
  } catch {
    return fail("Invalid request", 400);
  }

  // Honeypot: pretend success so bots do not retry
  if (clean(raw.company, 100)) return NextResponse.json({ ok: true });

  const lead = {
    name: clean(raw.name, 80),
    phone: clean(raw.phone, 20),
    email: clean(raw.email, 120),
    service: clean(raw.service, 80),
    preferredDate: clean(raw.preferredDate, 12),
    preferredTime: clean(raw.preferredTime, 20),
    message: clean(raw.message, 1200),
    page: clean(raw.page, 100),
    utm: clean(raw.utm, 300),
  };

  if (lead.name.length < 2) return fail("Please enter your name.", 400);
  if (!/^[+()\d\s-]{7,20}$/.test(lead.phone)) return fail("Please enter a valid phone number.", 400);
  if (lead.email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(lead.email)) return fail("Please enter a valid email address.", 400);
  if (!lead.service) return fail("Please choose a service.", 400);
  if (raw.consent !== "yes") return fail("Please tick the consent box so we can contact you.", 400);

  const text = [
    "New website enquiry",
    `Name: ${lead.name}`,
    `Phone: ${lead.phone}`,
    `Email: ${lead.email || "-"}`,
    `Service: ${lead.service}`,
    `Preferred: ${lead.preferredDate || "no date"} / ${lead.preferredTime}`,
    `Message: ${lead.message || "-"}`,
    `Page: ${lead.page}  UTM: ${lead.utm || "-"}`,
  ].join("\n");

  try {
    const { RESEND_API_KEY, LEAD_FROM_EMAIL, LEAD_TO_EMAIL, LEAD_WEBHOOK_URL } = process.env;
    let delivered = false;

    if (RESEND_API_KEY && LEAD_FROM_EMAIL && LEAD_TO_EMAIL) {
      const r = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify({ from: LEAD_FROM_EMAIL, to: [LEAD_TO_EMAIL], ...(lead.email ? { reply_to: lead.email } : {}), subject: `New enquiry: ${lead.name} (${lead.service})`, text }),
      });
      if (!r.ok) throw new Error(`Resend ${r.status}`);
      delivered = true;
    }

    if (LEAD_WEBHOOK_URL) {
      const r = await fetch(LEAD_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...lead, receivedAt: new Date().toISOString() }),
      });
      if (!r.ok) throw new Error(`Webhook ${r.status}`);
      delivered = true;
    }

    if (!delivered) {
      if (process.env.NODE_ENV === "production") throw new Error("No lead delivery configured");
      console.log("[lead:dev]\n" + text);
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[lead] delivery failed", err);
    return fail("We could not send your enquiry. Please message us on WhatsApp.", 502);
  }
}

export function GET() {
  return fail("Method not allowed", 405);
}
