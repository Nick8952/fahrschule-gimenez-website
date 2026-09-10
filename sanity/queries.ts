import { groq } from "next-sanity";

/* Die Abfragen liefern bewusst exakt die Form, die data/*.json und die
   Frontmatter der Markdown-Dateien schon hatten. Dadurch mussten die
   Komponenten beim Umstieg auf Sanity nicht angefasst werden — und der
   Rückfall auf die lokalen Dateien (siehe sanity/fetch.ts) hat dieselbe Form. */

export const siteQuery = groq`*[_type == "siteSettings"][0]{
  demo, name, legalName, owner, tagline, blurb,
  address{street, zip, city},
  phone{display, tel},
  email,
  "languages": coalesce(languages, []),
  vehicles{"models": coalesce(models, []), gearNote},
  mapQuery, themeColor, web3formsKey
}`;

export const navQuery = groq`*[_type == "navigation"][0]{
  "primary": coalesce(primary[]{label, href}, []),
  "footerColumns": coalesce(footerColumns[]{
    title,
    "links": coalesce(links[]{label, href}, [])
  }, [])
}`;

export const coursesQuery = groq`{
  "items": *[_type == "course"] | order(order asc){
    "key": key.current, title, tag, icon, description
  }
}`;

export const pricesQuery = groq`*[_type == "pricing"][0]{
  notice, disclaimer,
  "items": coalesce(items[]{
    name, description, note, price, unit,
    "inquiryOnly": coalesce(inquiryOnly, false),
    "courseKey": course->key.current
  }, [])
}`;

export const stepsQuery = groq`*[_type == "steps"][0]{
  "items": coalesce(items[]{n, title, body}, [])
}`;

export const faqQuery = groq`*[_type == "faq"][0]{
  "items": coalesce(items[]{q, a}, [])
}`;

export const reasonsQuery = groq`*[_type == "reasons"][0]{
  "items": coalesce(items, [])
}`;

export const pageQuery = groq`*[_type == "page" && slug == $slug][0]{
  seoTitle, seoDescription,
  hero{eyebrow, title, lead},
  body
}`;

export const legalQuery = groq`*[_type == "legalPage" && slug == $slug][0]{
  title, subtitle, seoTitle, seoDescription, body
}`;
