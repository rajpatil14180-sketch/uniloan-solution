import type { NextConfig } from "next";

const securityHeaders = [
  // Prevent the site from being embedded in an iframe (clickjacking)
  { key: "X-Frame-Options", value: "DENY" },
  // Prevent MIME-type sniffing
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Control referrer information sent with requests
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Disable unnecessary browser features
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=()",
  },
  // Force HTTPS for 1 year (only effective once HTTPS is confirmed on Hostinger)
  {
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains",
  },
  // Content Security Policy — permissive enough for Next.js + Google Fonts + Framer Motion
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      // Next.js requires unsafe-inline for hydration scripts; unsafe-eval for some polyfills
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      // Inline styles used by Framer Motion + Tailwind; Google Fonts stylesheet
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      // Google Fonts files
      "font-src 'self' https://fonts.gstatic.com",
      // Images: self + data URIs (used by Next.js image placeholders)
      "img-src 'self' data: blob:",
      // API calls: self only
      "connect-src 'self'",
      // No plugins or object embeds
      "object-src 'none'",
      // No frames
      "frame-ancestors 'none'",
      // Base URI locked to self
      "base-uri 'self'",
      // Form actions only to self
      "form-action 'self'",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        // Apply security headers to all routes
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
