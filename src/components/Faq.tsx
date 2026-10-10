import { faqs } from "@/lib/site";

export default function Faq() {
  return (
    <div className="faq">
      {faqs.map((f) => (
        <details key={f.q}>
          <summary>{f.q}</summary>
          <p>{f.a}</p>
        </details>
      ))}
    </div>
  );
}
