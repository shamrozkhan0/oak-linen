import Link from "next/link";
import type { Metadata } from "next";
import LeadForm from "@/components/LeadForm";
import Room from "@/components/Room";
import { projectSteps, projects, reviews, services, site, whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: `${site.name} | Interior design studio in Portland, OR` },
  description:
    "Modern interior design for Portland homes and small offices. Fixed-price projects from $950 and a free 20-minute consultation by WhatsApp, phone or form.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  const quote = reviews[0];
  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <h1>Modern rooms that feel like home.</h1>
            <p className="lead">Interior design in Portland. Fixed prices, free first call.</p>
            <div className="cta-row">
              <a className="btn btn-wa" href={whatsappLink()} target="_blank" rel="noopener noreferrer">Chat on WhatsApp</a>
              <Link className="btn btn-ghost" href="/contact#book">Book a consult</Link>
            </div>
          </div>
          <div className="hero-art">
            <div className="frame arch hero-main"><Room variant="living" tone="light" label="Bright living room with arched window and oat sofa" /></div>
            <div className="frame hero-circle"><Room variant="nook" tone="warm" label="Reading nook with armchair and arched niche" /></div>
            <p className="badge">Free 20-minute consult</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <h2>Recent rooms</h2>
            <Link href="/contact#book" className="text-link">Start yours</Link>
          </div>
          <div className="bento">
            {projects.map((p, i) => (
              <figure key={p.title} className={`tile t${i + 1}`}>
                <Room variant={p.variant} tone={p.tone} label={`${p.title}, ${p.place}`} photo={p.photo} />
                <figcaption><strong>{p.title}</strong> <span>{p.place}</span></figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-linen">
        <div className="container">
          <div className="section-head">
            <h2>Ways to work together</h2>
            <Link href="/services" className="text-link">All services</Link>
          </div>
          <ul className="svc-grid">
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={`/services#${s.slug}`} className="svc-link">
                  <div className="frame arch svc-img"><Room variant={s.variant} tone={s.tone} label={s.title} /></div>
                  <h3>{s.title}</h3>
                  <p className="muted">{s.short}</p>
                  <span className="price">{s.from}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2>How it works</h2>
          <ol className="steps">
            {projectSteps.map((s, i) => (
              <li key={s.title}>
                <span className="step-n" aria-hidden="true">{i + 1}</span>
                <h3>{s.title}</h3>
                <p className="muted">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section section-linen">
        <div className="container quote-split">
          <div className="frame arch quote-img"><Room variant="bedroom" tone="light" label="Calm bedroom with linen bedding" /></div>
          <figure className="big-quote">
            <blockquote><p>{quote.quote}</p></blockquote>
            <figcaption><strong>{quote.name}</strong> <span className="muted">{quote.detail}</span></figcaption>
            <Link href="/reviews" className="text-link">More reviews</Link>
          </figure>
        </div>
      </section>

      <section className="section">
        <div className="container cta-band">
          <div>
            <h2>Let&rsquo;s plan your space.</h2>
            <p className="lead">We reply within two working hours.</p>
            <a className="btn btn-wa" href={whatsappLink()} target="_blank" rel="noopener noreferrer">Chat on WhatsApp</a>
          </div>
          <LeadForm id="home-form" compact />
        </div>
      </section>
    </>
  );
}
