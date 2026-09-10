import { getSite } from "@/lib/data";
import { absUrl } from "@/lib/site";
import type { ReactNode } from "react";

export const inputClass =
  "w-full rounded border border-ink/25 bg-white px-3.5 py-3 text-step-0 text-ink outline-none transition focus:border-signal focus:ring-2 focus:ring-signal/20";

/**
 * Feldbeschriftung in Mono-Versalien wie eine Formularnummerierung.
 *
 * Label und Hinweis stehen bewusst in vollem bzw. gedaempftem Ink statt in
 * abgestuften Deckkraeften: die frueheren /80 und /60 lagen bei 4.6:1 und
 * 2.9:1 Kontrast — der Hinweistext war auf hellen Bildschirmen praktisch
 * unsichtbar.
 */
export function Field({
  label,
  children,
  hint,
}: {
  label: string;
  children: ReactNode;
  hint?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block font-mono text-[0.68rem] uppercase tracking-[0.14em] text-ink">
        {label}
      </span>
      {children}
      {hint && <span className="mt-1.5 block text-[0.82rem] text-ink-soft">{hint}</span>}
    </label>
  );
}

export async function Web3FormsHidden({ subject }: { subject: string }) {
  const site = await getSite();

  return (
    <>
      <input type="hidden" name="access_key" value={site.web3formsKey} />
      <input type="hidden" name="subject" value={subject} />
      <input type="hidden" name="from_name" value={`${site.name} Website`} />
      <input type="hidden" name="redirect" value={absUrl("/danke/")} />
      <input
        type="checkbox"
        name="botcheck"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ position: "absolute", left: "-9999px" }}
      />
    </>
  );
}
