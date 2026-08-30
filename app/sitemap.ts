import type { MetadataRoute } from "next";
import { absUrl } from "@/lib/site";

export const dynamic = "force-static";

const routes = [
  "/",
  "/angebote",
  "/preise",
  "/ueber-uns",
  "/ablauf",
  "/kontakt",
  "/impressum",
  "/datenschutz",
  "/agb",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((r) => ({
    url: absUrl(r === "/" ? "/" : r + "/"),
    changeFrequency: "monthly",
    priority: r === "/" ? 1 : 0.7,
  }));
}
