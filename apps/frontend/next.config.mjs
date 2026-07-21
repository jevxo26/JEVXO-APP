import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  output: 'standalone',
  outputFileTracingRoot: path.join(__dirname, '../../'),
  experimental: {},
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'example.com' },
      { protocol: 'https', hostname: 'i.ibb.co' },
      { protocol: 'https', hostname: 'squadlog-cdn.up.railway.app' },
    ],
  },
  async redirects() {
    return [
      { source: "/pages/about", destination: "/about", permanent: true },
      {
        source: "/pages/case-studies",
        destination: "/case-studies",
        permanent: true,
      },
      { source: "/pages/contact", destination: "/contact", permanent: true },
      { source: "/pages/services", destination: "/services", permanent: true },
      {
        source: "/pages/policy",
        destination: "/privacy-policy",
        permanent: true,
      },

      {
        source: "/pages/terms",
        destination: "/terms-and-conditions",
        permanent: true,
      },
      {
        source: "/terms",
        destination: "/terms-and-conditions",
        permanent: true,
      },
      { source: "/policy", destination: "/privacy-policy", permanent: true },
      { source: "/privacy", destination: "/privacy-policy", permanent: true },
      {
        source: "/squadcart",
        destination: "/products/squadcart",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      // Proxy for Console App
      {
        source: "/console",
        destination: "https://console-production-60bc.up.railway.app/console",
      },
      {
        source: "/console/:path*",
        destination: "https://console-production-60bc.up.railway.app/console/:path*",
      },
      // Proxy for Backend API
      {
        source: "/api",
        destination: "https://api-production-a672.up.railway.app",
      },
      {
        source: "/api/:path*",
        destination: "https://api-production-a672.up.railway.app/:path*",
      },
      { source: "/", destination: "/main" },
      { source: "/about", destination: "/main/about" },
      { source: "/case-studies", destination: "/main/case-studies" },
      { source: "/contact", destination: "/main/contact" },
      { source: "/services", destination: "/main/services" },
      { source: "/products", destination: "/main/products" },
      {
        source: "/terms-and-conditions",
        destination: "/main/terms-and-conditions",
      },
      { source: "/privacy-policy", destination: "/main/privacy-policy" },
      { source: "/refund-policy", destination: "/main/refund-policy" },
      { source: "/faq", destination: "/main/faq" },
    ];
  },
  reactCompiler: false,
};
// hhhhh
export default nextConfig;
