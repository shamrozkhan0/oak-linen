import { site, services, faqs } from "./site";

const abs = (path: string) => new URL(path, site.url).toString();

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "ProfessionalService"],
    "@id": abs("/#business"),
    name: site.name,
    legalName: site.legalName,
    url: site.url,
    description: site.description,
    telephone: site.phone,
    email: site.email,
    foundingDate: String(site.founded),
    image: abs("/opengraph-image"),
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      postalCode: site.address.postal,
      addressCountry: site.address.country,
    },
    geo: { "@type": "GeoCoordinates", latitude: site.geo.lat, longitude: site.geo.lng },
    areaServed: site.areaServed.map((name) => ({ "@type": "City", name })),
    openingHoursSpecification: site.hours.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.days,
      opens: h.opens,
      closes: h.closes,
    })),
    sameAs: site.social,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Interior design services",
      itemListElement: services.map((s) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: s.title, description: s.summary },
      })),
    },
    // NOTE: aggregateRating is intentionally omitted. Google does not allow
    // self-served review markup for a business's own site. Collect reviews on
    // Google Business Profile instead.
  };
}

export function faqSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: abs(it.path),
    })),
  };
}
