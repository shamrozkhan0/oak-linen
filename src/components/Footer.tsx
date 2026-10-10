import Link from "next/link";
import { nav, site, whatsappLink } from "@/lib/site";

export default function Footer() {
  const a = site.address;
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <p className="brand">{site.name}</p>
          <p className="muted">{site.tagline}</p>
        </div>
        <ul className="plain footer-links">
          {nav.map((n) => (
            <li key={n.href}><Link href={n.href}>{n.label}</Link></li>
          ))}
          <li><Link href="/privacy">Privacy</Link></li>
        </ul>
        <div>
          <p><a href={`tel:${site.phone.replace(/\s/g, "")}`}>{site.phone}</a></p>
          <p><a href={whatsappLink()} target="_blank" rel="noopener noreferrer">WhatsApp</a></p>
          <address className="muted">{a.street}, {a.city}, {a.region} {a.postal}</address>
        </div>
      </div>
      <div className="container footer-base">
        <p>© {new Date().getFullYear()} {site.legalName}</p>
      </div>
    </footer>
  );
}
