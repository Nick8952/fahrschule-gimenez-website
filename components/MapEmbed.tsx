import { site } from "@/lib/data";

export default function MapEmbed() {
  return (
    <div className="overflow-hidden rounded-lg border border-ink/15">
      <iframe
        title={`Karte: ${site.address.street}, ${site.address.zip} ${site.address.city}`}
        loading="lazy"
        referrerPolicy="no-referrer"
        src="https://www.openstreetmap.org/export/embed.html?bbox=8.508%2C47.367%2C8.529%2C47.377&layer=mapnik&marker=47.372%2C8.518"
        className="h-[280px] w-full border-0"
      />
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-ink/15 bg-white px-4 py-3.5 text-[0.9rem]">
        <strong className="font-display font-bold text-ink">
          {site.address.street}, {site.address.zip} {site.address.city}
        </strong>
        <a
          href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(site.mapQuery)}`}
          target="_blank"
          rel="noopener"
          className="font-mono text-[0.8rem] uppercase tracking-[0.06em] text-signal hover:text-signal-600"
        >
          Route öffnen →
        </a>
      </div>
    </div>
  );
}
