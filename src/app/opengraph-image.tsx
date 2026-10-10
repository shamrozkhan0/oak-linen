import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, background: "#F6F0E6", color: "#3B2F26" }}>
        <div style={{ display: "flex", gap: 12 }}>
          {["#E8DCC8", "#CBB08A", "#F2ECDF", "#DCCDB3"].map((c) => (
            <div key={c} style={{ width: 64, height: 64, background: c, border: "2px solid #3B2F26" }} />
          ))}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 96, fontWeight: 700 }}>{site.name}</div>
          <div style={{ fontSize: 40, marginTop: 12 }}>{site.tagline}</div>
        </div>
      </div>
    ),
    size,
  );
}
