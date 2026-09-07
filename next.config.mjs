/** @type {import('next').NextConfig} */

// Deploy-Ziel: Vercel (kein Pfadpräfix, Projekt läuft auf der eigenen Domain
// <projekt>.vercel.app). SITE_ORIGIN nach dem ersten Vercel-Deploy auf die
// tatsächlich zugewiesene URL anpassen (Vercel hängt ggf. einen Suffix an,
// falls der Name schon vergeben ist). Bei eigener Domain (gimenez.ch)
// ebenfalls hier anpassen.
const BASE_PATH = "";
const SITE_ORIGIN = "https://fahrschule-gimenez-website.vercel.app";

const nextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: BASE_PATH || undefined,
  assetPrefix: BASE_PATH || undefined,
  images: { unoptimized: true },
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_BASE_PATH: BASE_PATH,
    NEXT_PUBLIC_SITE_URL: SITE_ORIGIN + BASE_PATH,
  },
};

export default nextConfig;
