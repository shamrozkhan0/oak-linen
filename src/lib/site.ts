// ─────────────────────────────────────────────────────────────
// Single source of truth. Edit this file to rebrand the site.
// Keep name / address / phone identical everywhere you are listed
// (Google Business Profile, directories, social) — it helps local SEO.
// ─────────────────────────────────────────────────────────────
import type { Tone, Variant } from "@/components/Room";

export type Service = {
  slug: string;
  title: string;
  short: string;
  summary: string;
  from: string;
  timeline: string;
  includes: string[];
  variant: Variant;
  tone: Tone;
};

export type Review = { name: string; detail: string; quote: string; source: string };

export type Project = { title: string; place: string; variant: Variant; tone: Tone; photo?: string };

export const site = {
  name: "Oak & Linen",
  legalName: "Oak & Linen Interiors LLC",
  tagline: "Interior design studio in Portland",
  description:
    "Oak & Linen is a Portland interior design studio for homes and small offices. Book a free 20-minute consultation by WhatsApp, phone or form.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.oakandlinen.example",
  phone: "+1 503 555 0142",
  whatsapp: "15035550142", // digits only, with country code
  email: "hello@oakandlinen.example",
  address: { street: "128 Maple Street, Suite 4", city: "Portland", region: "OR", postal: "97205", country: "US" },
  geo: { lat: 45.5152, lng: -122.6784 },
  areaServed: ["Portland", "Beaverton", "Lake Oswego", "Vancouver WA", "Hillsboro"],
  hours: [
    { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "09:00", closes: "18:00", label: "Mon–Fri, 9am–6pm" },
    { days: ["Saturday"], opens: "10:00", closes: "14:00", label: "Sat, 10am–2pm" },
  ],
  mapsUrl: "https://maps.google.com/?q=128+Maple+Street+Portland+OR+97205",
  googleReviewUrl: "https://g.page/r/your-place-id/review",
  social: ["https://www.instagram.com/oakandlinen", "https://www.facebook.com/oakandlinen"],
  founded: 2016,
} as const;

export const services: Service[] = [
  {
    slug: "full-home-design",
    title: "Full-home design",
    short: "Every room, planned together.",
    summary: "Layout, materials, lighting and furniture planned as one, then managed through install.",
    from: "From $4,800",
    timeline: "6–12 weeks",
    includes: ["Measured plans", "Concept board", "Furniture schedule", "Trade coordination", "Styling day"],
    variant: "living",
    tone: "light",
  },
  {
    slug: "room-refresh",
    title: "Room refresh",
    short: "One room, done properly.",
    summary: "A living room, bedroom or office that finally works, with a clear plan and shopping list.",
    from: "From $1,400",
    timeline: "3–5 weeks",
    includes: ["Layout options", "Colour palette", "Shopping list", "Install guidance"],
    variant: "bedroom",
    tone: "warm",
  },
  {
    slug: "styling-and-furnishing",
    title: "Styling & furnishing",
    short: "Keep the walls, change the feel.",
    summary: "We source and place furniture, rugs, art and soft furnishings in the space you already have.",
    from: "From $950",
    timeline: "2–4 weeks",
    includes: ["Walkthrough", "Sourced pieces", "Delivery scheduling", "Placement"],
    variant: "dining",
    tone: "light",
  },
  {
    slug: "design-consultation",
    title: "Design consultation",
    short: "Two hours to get unstuck.",
    summary: "A focused session on layout, colour and budget before you spend, credited to a full project.",
    from: "$180",
    timeline: "Same or next week",
    includes: ["In-home or video", "Written next steps", "Credit toward project"],
    variant: "nook",
    tone: "deep",
  },
];

export const projects: Project[] = [
  { title: "Oak Hill living room", place: "Portland", variant: "living", tone: "warm" },
  { title: "Garden-view bedroom", place: "Lake Oswego", variant: "bedroom", tone: "light" },
  { title: "Home studio", place: "Beaverton", variant: "office", tone: "deep" },
  { title: "Open dining room", place: "Vancouver WA", variant: "dining", tone: "warm" },
];

export const reviews: Review[] = [
  // SAMPLE CONTENT — replace with real, verifiable reviews before launch.
  { name: "Amira K.", detail: "Living room, Portland", quote: "Six years of a room that felt wrong. Now it finally feels like ours.", source: "Google" },
  { name: "Daniel R.", detail: "Home office, Beaverton", quote: "Messaged on a Sunday night. Call booked Monday. Design in two weeks.", source: "Google" },
  { name: "Priya & Tom S.", detail: "Full home, Lake Oswego", quote: "One person coordinating every trade saved us months of chasing.", source: "Houzz" },
  { name: "Marcus L.", detail: "Bedroom, Vancouver WA", quote: "Fixed price, no surprises, ready on the day they promised.", source: "Google" },
];

export const faqs = [
  { q: "How much does interior design cost in Portland?", a: "Projects start at $950 for styling, $1,400 for a single room and $4,800 for a full home. Design fees and furniture are quoted separately." },
  { q: "How long does a project take?", a: "A single room takes 3–5 weeks. A full home takes 6–12 weeks, depending on furniture lead times." },
  { q: "How do I book a consultation?", a: "Message us on WhatsApp, call, or use the form. We reply within two working hours and the first 20-minute call is free." },
  { q: "Which areas do you serve?", a: "Portland, Beaverton, Lake Oswego, Hillsboro and Vancouver WA, plus video consultations further out." },
  { q: "Can you use furniture I already own?", a: "Yes. We review what you have on the first visit and build the plan around the pieces worth keeping." },
];

export const projectSteps = [
  { title: "Free call", text: "20 minutes on WhatsApp or phone." },
  { title: "Visit and brief", text: "We measure and agree the brief." },
  { title: "Concept and price", text: "Layout, palette and an itemised quote." },
  { title: "Install and style", text: "We manage orders, trades and styling." },
];

export function whatsappLink(message = "Hi Oak & Linen, I'd like to book a free consultation.") {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const nav = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/reviews", label: "Reviews" },
  { href: "/contact", label: "Contact" },
];
