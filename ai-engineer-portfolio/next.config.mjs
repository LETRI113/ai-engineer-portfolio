/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // The project thumbnails ship as generated SVG gradients. Dropping a real
    // .png/.jpg screenshot into /public/thumbnails and updating `thumbnail` in
    // src/data/portfolio.ts works with no other change.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
