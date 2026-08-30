import { site } from "@/lib/data";
import { absUrl } from "@/lib/site";

export function DrivingSchoolJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "DrivingSchool",
    name: `${site.name} – ${site.owner}`,
    image: absUrl("/img/logo.png"),
    url: absUrl("/"),
    telephone: site.phone.tel,
    email: site.email,
    founder: { "@type": "Person", name: site.owner },
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      postalCode: site.address.zip,
      addressLocality: site.address.city,
      addressCountry: "CH",
    },
    areaServed: "Zürich",
    knowsLanguage: ["de", "en", "fr", "it", "pt", "es"],
  };
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}
