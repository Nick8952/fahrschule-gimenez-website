import type { Metadata } from "next";
import LegalPage, { legalMetadata } from "@/components/LegalPage";

export function generateMetadata(): Promise<Metadata> {
  return legalMetadata("datenschutz");
}

export default function Page() {
  return <LegalPage slug="datenschutz" />;
}
