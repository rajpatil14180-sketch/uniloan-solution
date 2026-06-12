import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you are looking for does not exist.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-grey-50 px-4">
      <div className="text-center max-w-md mx-auto">
        <p className="text-7xl font-bold text-purple-600 mb-4" style={{ fontFamily: "var(--font-dm-sans)" }}>
          404
        </p>
        <h1
          className="text-2xl md:text-3xl font-bold text-navy-900 mb-4"
          style={{ fontFamily: "var(--font-dm-sans)" }}
        >
          Page Not Found
        </h1>
        <p className="text-grey-500 mb-8 leading-relaxed">
          The page you are looking for does not exist or has been moved. Let us
          help you get back on track.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-purple-500 text-white font-semibold text-sm shadow-lg shadow-purple-600/25 hover:shadow-purple-600/40 hover:from-purple-500 hover:to-purple-400 transition-all duration-300"
          >
            Go to Home
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-6 py-3 rounded-xl border-2 border-purple-200 text-purple-600 font-semibold text-sm hover:bg-purple-50 transition-all duration-300"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}
