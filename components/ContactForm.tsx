import Link from "next/link";
import { Field, Web3FormsHidden, inputClass } from "./FormBits";
import { courses } from "@/lib/data";

export default function ContactForm() {
  return (
    <form action="https://api.web3forms.com/submit" method="POST" className="card !p-6 sm:!p-8">
      <Web3FormsHidden subject="Neue Anfrage über die Website (Fahrschule Gimenez)" />

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Name">
          <input name="Name" required className={inputClass} autoComplete="name" />
        </Field>
        <Field label="Telefon">
          <input name="Telefon" type="tel" required className={inputClass} autoComplete="tel" />
        </Field>
      </div>

      <div className="mt-4">
        <Field label="E-Mail">
          <input name="E-Mail" type="email" required className={inputClass} autoComplete="email" />
        </Field>
      </div>

      <div className="mt-4">
        <Field label="Interesse">
          <select name="Interesse" className={inputClass} defaultValue={courses.items[3]?.title}>
            {courses.items.map((c) => (
              <option key={c.key}>{c.title}</option>
            ))}
          </select>
        </Field>
      </div>

      <div className="mt-4">
        <Field label="Nachricht" hint="Optional">
          <textarea
            name="Nachricht"
            rows={4}
            className={inputClass}
            placeholder="Wie können wir dir helfen? Wunschtermin, Getriebe, Fragen …"
          />
        </Field>
      </div>

      <label className="mt-5 flex items-start gap-2.5 text-[0.9rem] text-ink-soft">
        <input type="checkbox" required className="mt-0.5 h-5 w-5 accent-signal" />
        <span>
          Ich habe die{" "}
          <Link href="/datenschutz" className="text-signal underline">
            Datenschutzerklärung
          </Link>{" "}
          gelesen und akzeptiere sie.
        </span>
      </label>

      <button type="submit" className="btn btn-signal mt-6 w-full sm:w-auto">
        Anfrage senden
      </button>
    </form>
  );
}
