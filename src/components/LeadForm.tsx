"use client";

import { useState } from "react";
import { services, whatsappLink } from "@/lib/site";

type Status = "idle" | "sending" | "done" | "error";

export default function LeadForm({ defaultService = "", id = "lead-form", compact = false }: { defaultService?: string; id?: string; compact?: boolean }) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [name, setName] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError("");
    const fd = new FormData(e.currentTarget);
    const body: Record<string, FormDataEntryValue> = Object.fromEntries(fd.entries());
    body.page = window.location.pathname;
    body.utm = window.location.search.slice(0, 300);
    setName(String(body.name ?? ""));

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error ?? "Something went wrong. Please try WhatsApp instead.");
      setStatus("done");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try WhatsApp instead.");
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="form-done" role="status">
        <h3>Thanks{name ? `, ${name.split(" ")[0]}` : ""}. We have your request.</h3>
        <p>We reply within two working hours. Want a faster answer? Message us on WhatsApp now.</p>
        <a className="btn btn-wa" href={whatsappLink("Hi Oak & Linen, I just sent an enquiry on your website.")} target="_blank" rel="noopener noreferrer">
          Continue on WhatsApp
        </a>
      </div>
    );
  }

  return (
    <form id={id} className={compact ? "lead-form compact" : "lead-form"} onSubmit={onSubmit} noValidate={false}>
      <div className="field">
        <label htmlFor={`${id}-name`}>Your name</label>
        <input id={`${id}-name`} name="name" type="text" autoComplete="name" required maxLength={80} />
      </div>
      <div className={compact ? "field" : "field-row"}>
        <div className="field">
          <label htmlFor={`${id}-phone`}>Phone or WhatsApp</label>
          <input id={`${id}-phone`} name="phone" type="tel" autoComplete="tel" required minLength={7} maxLength={20} placeholder="+1 503 555 0100" />
        </div>
        {!compact && (
          <div className="field">
            <label htmlFor={`${id}-email`}>Email</label>
            <input id={`${id}-email`} name="email" type="email" autoComplete="email" required maxLength={120} />
          </div>
        )}
      </div>
      <div className="field">
        <label htmlFor={`${id}-service`}>What do you need?</label>
        <select id={`${id}-service`} name="service" defaultValue={defaultService} required>
          <option value="" disabled>Choose a service</option>
          {services.map((s) => (
            <option key={s.slug} value={s.title}>{s.title}</option>
          ))}
          <option value="Not sure yet">Not sure yet</option>
        </select>
      </div>
      {!compact && (<>
      <div className="field-row">
        <div className="field">
          <label htmlFor={`${id}-date`}>Preferred consult day (optional)</label>
          <input id={`${id}-date`} name="preferredDate" type="date" />
        </div>
        <div className="field">
          <label htmlFor={`${id}-time`}>Best time</label>
          <select id={`${id}-time`} name="preferredTime" defaultValue="Any time">
            <option>Any time</option>
            <option>Morning</option>
            <option>Afternoon</option>
            <option>Evening</option>
          </select>
        </div>
      </div>
      <div className="field">
        <label htmlFor={`${id}-message`}>Tell us about the space (optional)</label>
        <textarea id={`${id}-message`} name="message" rows={4} maxLength={1200} />
      </div>
      </>)}

      {/* Honeypot: hidden from people, bots fill it in */}
      <div className="hp" aria-hidden="true">
        <label htmlFor={`${id}-company`}>Company</label>
        <input id={`${id}-company`} name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <label className="consent">
        <input type="checkbox" name="consent" value="yes" required />
        <span>I agree to be contacted about my enquiry. See our <a href="/privacy">privacy policy</a>.</span>
      </label>

      {status === "error" && <p className="form-error" role="alert">{error}</p>}

      <button type="submit" className="btn btn-primary" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Request my free consultation"}
      </button>
    </form>
  );
}
