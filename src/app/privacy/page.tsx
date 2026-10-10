import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = { ...pageMeta({ title: "Privacy policy", description: "How Oak & Linen handles the details you send through our enquiry form.", path: "/privacy" }), robots: { index: false, follow: true } };

export default function PrivacyPage() {
  return (
    <section className="page-head">
      <div className="container narrow">
        <h1>Privacy policy</h1>
        <p>We collect your name, phone number, email address and project details only to reply to your enquiry and deliver the service you ask for.</p>
        <p>We do not sell your data. Enquiries are sent to our team by email and stored in our contact system. You can ask us to delete your details at any time by emailing <a href={`mailto:${site.email}`}>{site.email}</a>.</p>
        <p className="muted small">Placeholder text. Have a professional review it for your jurisdiction (GDPR, CCPA and similar) before launch.</p>
      </div>
    </section>
  );
}
