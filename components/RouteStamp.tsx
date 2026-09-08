"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { asset } from "@/lib/site";

/**
 * Das echte Gimenez-Logo, gross und leicht gekippt wie ein frisch aufgedrückter
 * Stempel — mit gestricheltem Stempelring (ohne Mikrotext, das war bei diesem
 * Massstab unleserlich/verpixelt). Bewusst nur EINMAL verwendet
 * (Startseiten-Hero), damit es besonders bleibt.
 */
export default function RouteStamp({
  size = 320,
  tilt = -3,
}: {
  size?: number;
  tilt?: number;
}) {
  return (
    <motion.div
      className="relative mx-auto"
      style={{ width: size, height: size, rotate: tilt }}
      initial={{ scale: 1.04, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Gestrichelter Stempelring */}
      <svg
        viewBox="0 0 200 200"
        className="absolute inset-[-6%] h-[112%] w-[112%] text-signal"
        aria-hidden="true"
      >
        <circle cx="100" cy="100" r="94" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray="3 9" opacity="0.75" />
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
