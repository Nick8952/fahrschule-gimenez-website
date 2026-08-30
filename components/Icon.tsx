/* Einfarbiges Icon-Set (stroke=currentColor) — keine Emojis, ein Satz für die ganze Seite. */

export type IconKey =
  | "car"
  | "taxi"
  | "moto"
  | "medical"
  | "book"
  | "theory"
  | "badge"
  | "pin"
  | "mail"
  | "globe"
  | "phone"
  | "invoice"
  | "twint"
  | "cash"
  | "check"
  | "info"
  | "arrow";

const paths: Record<IconKey, React.ReactNode> = {
  car: (
    <>
      <path d="M14 16H9m10 0h3v-3.15a1 1 0 0 0-.84-.99L16 11l-2.7-3.6a1 1 0 0 0-.8-.4H5.24a2 2 0 0 0-1.8 1.1l-.8 1.63A6 6 0 0 0 2 12.42V16h2" />
      <circle cx="6.5" cy="16.5" r="2.5" />
      <circle cx="16.5" cy="16.5" r="2.5" />
    </>
  ),
  taxi: (
    <>
      <rect x="9.5" y="2" width="5" height="3" rx="1" />
      <path d="M14 16H9m10 0h3v-3.15a1 1 0 0 0-.84-.99L16 11l-2.7-3.6a1 1 0 0 0-.8-.4H5.24a2 2 0 0 0-1.8 1.1l-.8 1.63A6 6 0 0 0 2 12.42V16h2" />
      <circle cx="6.5" cy="16.5" r="2.5" />
      <circle cx="16.5" cy="16.5" r="2.5" />
    </>
  ),
  moto: (
    <>
      <circle cx="5.5" cy="17.5" r="2.5" />
      <circle cx="18.5" cy="17.5" r="2.5" />
      <path d="M5.5 17.5 9 11h4l2 3h3.5" />
      <path d="M9 11 7.5 8h-2" />
      <path d="M13 11l1.5-3h2.5" />
    </>
  ),
  medical: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 8v8M8 12h8" />
    </>
  ),
  book: (
    <>
      <rect x="8" y="2" width="8" height="18" rx="3" />
      <circle cx="12" cy="6.5" r="1.4" fill="currentColor" stroke="none" />
      <circle cx="12" cy="11" r="1.4" fill="currentColor" stroke="none" />
      <circle cx="12" cy="15.5" r="1.4" fill="currentColor" stroke="none" />
      <path d="M9 22h6" />
    </>
  ),
  theory: (
    <>
      <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H11v18H6.5A2.5 2.5 0 0 1 4 18.5v-13Z" />
      <path d="M20 5.5A2.5 2.5 0 0 0 17.5 3H13v18h4.5a2.5 2.5 0 0 0 2.5-2.5v-13Z" />
    </>
  ),
  badge: (
    <>
      <path d="M2 9 12 4l10 5-10 5L2 9Z" />
      <path d="M6 11v4.5c0 1 2.7 2.5 6 2.5s6-1.5 6-2.5V11" />
      <path d="M22 9v6" />
    </>
  ),
  pin: (
    <>
      <path d="M12 22s7-7.4 7-12a7 7 0 1 0-14 0c0 4.6 7 12 7 12Z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.6 3.8 5.7 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.7-3.8-9s1.3-6.4 3.8-9Z" />
    </>
  ),
  phone: (
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  ),
  invoice: (
    <>
      <rect x="5" y="3" width="14" height="18" rx="2" />
      <path d="M8 8h8M8 12h8M8 16h5" />
    </>
  ),
  twint: (
    <>
      <rect x="7" y="2" width="10" height="20" rx="2.5" />
      <path d="M10.5 18h3" />
    </>
  ),
  cash: (
    <>
      <rect x="2" y="6" width="20" height="12" rx="2" />
      <circle cx="12" cy="12" r="3" />
      <path d="M6 9v.01M18 15v.01" />
    </>
  ),
  check: <path d="M20 6 9 17l-5-5" />,
  info: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 8v.01M11 11h1v5h1" />
    </>
  ),
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
};

export default function Icon({
  name,
  className = "h-5 w-5",
}: {
  name: IconKey;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}
