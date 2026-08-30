"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { asset } from "@/lib/site";

/**
 * Das echte Gimenez-Logo, gross und leicht gekippt wie ein frisch aufgedrückter
 * Gummistempel — inklusive gestricheltem Stempelring mit Mikrotext.
 * Bewusst nur EINMAL verwendet (Startseiten-Hero), damit es besonders bleibt.
 */
export default function RouteStamp({
  size = 320,
  tilt = -7,
}: {
  size?: number;
  tilt?: number;
}) {
  const ringId = "stamp-ring-path";

  return (
    <motion.div
      className="relative mx-auto"
      style={{ width: size, height: size, rotate: tilt }}
      initial={{ scale: 1.18, rotate: tilt + 6, opacity: 0 }}
      whileInView={{ scale: 1, rotate: tilt, opacity: 1 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Gestrichelter Stempelring mit umlaufendem Mikrotext */}
      <svg
        viewBox="0 0 200 200"
        className="absolute inset-[-9%] h-[118%] w-[118%] text-signal"
        aria-hidden="true"
      >
        <defs>
          <path id={ringId} d="M 100,100 m -88,0 a 88,88 0 1,1 176,0 a 88,88 0 1,1 -176,0" />
        </defs>
        <circle cx="100" cy="100" r="88" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray="2 7" opacity="0.8" />
        <text className="fill-signal font-mono" fontSize="8.4" letterSpacing="3">
          <textPath href={`#${ringId}`} startOffset="0%">
            FAHRSCHULE GIMENEZ &#8226; ZÜRICH &#8226; FAHRSCHULE GIMENEZ &#8226; ZÜRICH &#8226;
          </textPath>
        </text>
      </svg>

      {/* Logo */}
      <div className="absolute inset-[10%] overflow-hidden rounded-full bg-white shadow-l">
        <Image
          src={asset("/img/logo.png")}
          alt="Fahrschule Autoescola Roberto Gimenez"
          width={600}
          height={600}
          priority
          unoptimized
          className="h-full w-full object-contain p-3"
        />
      </div>
    </motion.div>
  );
}
