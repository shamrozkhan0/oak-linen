import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import Room from "@/components/Room";
import { breadcrumbSchema } from "@/lib/schema";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMeta({
  title: "About the studio",
  description: "Oak & Linen is a small Portland interior design studio founded in 2016. Meet the team and see how we work.",
  path: "/about",
});

const values = [
  { t: "Price first", d: "You approve an itemised quote before we order anything." },
  { t: "One designer", d: "The person you meet runs your project to install day." },
  { t: "Keep what works", d: "We build around the pieces you already love." },
];

const team = [
  { initials: "LH", name: "Lena Hartwell", role: "Founder, lead designer" },
  { initials: "SO", name: "Sam Ortiz", role: "Project manager" },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "About", path: "/about" }])} />
      <section className="hero">
        <div className="container hero-grid about-hero">
          <div>
            <h1>A small studio that stays involved.</h1>
            <p className="lead">Designing Portland homes and offices since {site.founded}.</p>
            <Link className="btn btn-primary" href="/contact#book">Book a consult</Link>
          </div>
          <div className="frame arch about-art"><Room variant="nook" tone="deep" label="Reading nook in warm beige" /></div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2>How we work</h2>
          <ul className="values">
            {values.map((v) => (
              <li key={v.t}><h3>{v.t}</h3><p className="muted">{v.d}</p></li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section-linen">
        <div className="container">
          <h2>The team</h2>
          <ul className="team">
            {team.map((m) => (
              <li key={m.name}>
                <span className="avatar" aria-hidden="true">{m.initials}</span>
                <div><strong>{m.name}</strong><br /><span className="muted">{m.role}</span></div>
              </li>
            ))}
          </ul>
          <h2 className="spaced">Where we work</h2>
          <ul className="chips">
            {site.areaServed.map((a) => <li key={a}>{a}</li>)}
          </ul>
        </div>
      </section>
    </>
  );
}
