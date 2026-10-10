import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes: [string, number][] = [["/", 1], ["/services", 0.9], ["/contact", 0.9], ["/about", 0.7], ["/reviews", 0.7]];
  return routes.map(([path, priority]) => ({
    url: new URL(path, site.url).toString(),
    lastModified: now,
    changeFrequency: "monthly",
    priority,
  }));
}
