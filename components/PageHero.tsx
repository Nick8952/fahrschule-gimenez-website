import Link from "next/link";
import Image from "next/image";
import { asset } from "@/lib/site";
import Reveal from "./Reveal";

export default function PageHero({
  eyebrow,
  title,
  lead,
  crumb,
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  crumb?: string;
}) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <Image
          src={asset("/img/hero-car.jpg")}
          alt=""
          fill
          priority
          unoptimized
          className="hero-photo object-cover object-[60%_15%]"
        />
        <div className="hero-scrim absolute inset-0" />
      </div>
      <div className="wrap pb-14 pt-14 sm:pb-20 sm:pt-20">
        <Reveal>
          <nav className="mb-5 flex flex-wrap gap-2 font-mono text-[0.72rem] uppercase tracking-[0.1em] text-white/60">
            <Link href="/" className="hover:text-gold">
              Start
            </Link>
            <span aria-hidden>/</span>
            <span className="text-white">{crumb ?? title}</span>
          </nav>
          {eyebrow && <p className="eyebrow eyebrow-on-dark mb-4">{eyebrow}</p>}
          <h1 className="max-w-[18ch] text-step-4 font-extrabold text-white">{title}</h1>
          {lead && <p className="mt-5 max-w-[56ch] text-step-1 text-white/80">{lead}</p>}
        </Reveal>
      </div>
    </section>
  );
}
