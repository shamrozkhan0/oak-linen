import type { Metadata } from "next";
import { site } from "./site";

export function pageMeta(opts: { title: string; description: string; path: string }): Metadata {
  const { title, description, path } = opts;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title, description, url: path, siteName: site.name, type: "website", locale: "en_US" },
    twitter: { card: "summary_large_image", title, description },
  };
}
