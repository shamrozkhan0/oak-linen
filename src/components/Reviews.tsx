import { reviews } from "@/lib/site";

export default function Reviews({ limit }: { limit?: number }) {
  const list = limit ? reviews.slice(0, limit) : reviews;
  return (
    <div className="reviews">
      {list.map((r) => (
        <figure key={r.name} className="review">
          <blockquote><p>{r.quote}</p></blockquote>
          <figcaption>
            <strong>{r.name}</strong>
            <span className="muted">{r.detail} · {r.source}</span>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
