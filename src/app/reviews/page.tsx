import JsonLd from "@/components/JsonLd";
import Reviews from "@/components/Reviews";
import { breadcrumbSchema } from "@/lib/schema";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMeta({
  title: "Client reviews",
  description: "What Portland homeowners say about working with Oak & Linen.",
  path: "/reviews",
});

export default function ReviewsPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Reviews", path: "/reviews" }])} />
      <section className="page-head">
        <div className="container">
          <h1>Kind words</h1>
          <p className="lead">From Google and Houzz.</p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <Reviews />
          <p className="muted small">Sample reviews. Replace with real ones before launch.</p>
          <a className="btn btn-primary" href={site.googleReviewUrl} target="_blank" rel="noopener noreferrer">Leave a Google review</a>
        </div>
      </section>
    </>
  );
}
