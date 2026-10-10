import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import Faq from "@/components/Faq";
import Room from "@/components/Room";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";
import { pageMeta } from "@/lib/seo";
import { services } from "@/lib/site";

export const metadata = pageMeta({
  title: "Interior design services in Portland, OR",
  description: "Full-home design, room refreshes, styling and design consultations in Portland. Starting prices and typical timelines.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Services", path: "/services" }])} />
      <JsonLd data={faqSchema()} />
      <section className="page-head">
        <div className="container">
          <h1>Services</h1>
          <p className="lead">Design fees and furniture are always quoted separately.</p>
        </div>
      </section>

      {services.map((s, i) => (
        <section key={s.slug} id={s.slug} className={i % 2 === 0 ? "section" : "section section-linen"}>
          <div className={i % 2 === 0 ? "container svc-row" : "container svc-row reverse"}>
            <div className="frame arch svc-art"><Room variant={s.variant} tone={s.tone} label={s.title} /></div>
            <div>
              <h2>{s.title}</h2>
              <p>{s.summary}</p>
              <p className="facts"><strong>{s.from}</strong><span>{s.timeline}</span></p>
              <ul className="chips">
                {s.includes.map((x) => <li key={x}>{x}</li>)}
              </ul>
              <Link className="btn btn-primary" href={`/contact?service=${encodeURIComponent(s.title)}#book`}>Enquire</Link>
            </div>
          </div>
        </section>
      ))}

      <section className="section">
        <div className="container narrow">
          <h2>Questions</h2>
          <Faq />
        </div>
      </section>
    </>
  );
}
