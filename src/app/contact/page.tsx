import JsonLd from "@/components/JsonLd";
import LeadForm from "@/components/LeadForm";
import { breadcrumbSchema } from "@/lib/schema";
import { pageMeta } from "@/lib/seo";
import { services, site, whatsappLink } from "@/lib/site";

export const metadata = pageMeta({
  title: "Book a free consultation",
  description: "Book a free 20-minute design consultation with Oak & Linen in Portland by WhatsApp, phone or form.",
  path: "/contact",
});

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ service?: string }> }) {
  const { service } = await searchParams;
  const valid = services.find((s) => s.title === service)?.title ?? "";
  const a = site.address;

  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }])} />
      <section className="page-head">
        <div className="container">
          <h1>Book a free consult</h1>
          <p className="lead">We reply within two working hours.</p>
        </div>
      </section>
      <section className="section">
        <div className="container split">
          <div className="contact-list">
            <a className="btn btn-wa wide" href={whatsappLink()} target="_blank" rel="noopener noreferrer">Chat on WhatsApp</a>
            <p><span className="muted">Call</span><br /><a href={`tel:${site.phone.replace(/\s/g, "")}`}>{site.phone}</a></p>
            <p><span className="muted">Email</span><br /><a href={`mailto:${site.email}`}>{site.email}</a></p>
            <p><span className="muted">Studio</span><br />{a.street}, {a.city}, {a.region} {a.postal}<br /><a href={site.mapsUrl} target="_blank" rel="noopener noreferrer">Directions</a></p>
            <p><span className="muted">Hours</span><br />{site.hours.map((h) => h.label).join(" · ")}</p>
          </div>
          <div id="book">
            <LeadForm id="contact-form" defaultService={valid} />
          </div>
        </div>
      </section>
    </>
  );
}
