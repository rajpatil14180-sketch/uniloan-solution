"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[app-error]", error);
  }, [error]);

  return (
    <section className="min-h-screen flex items-center justify-center bg-grey-50 px-4">
      <div className="text-center max-w-md mx-auto">
        <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-8 h-8 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
            />
          </svg>
        </div>
        <h1
          className="text-2xl md:text-3xl font-bold text-navy-900 mb-4"
          style={{ fontFamily: "var(--font-dm-sans)" }}
        >
          Something Went Wrong
        </h1>
        <p className="text-grey-500 mb-8 leading-relaxed">
          An unexpected error occurred. Please try again, or contact us if the
          problem persists.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-purple-500 text-white font-semibold text-sm shadow-lg shadow-purple-600/25 hover:shadow-purple-600/40 hover:from-purple-500 hover:to-purple-400 transition-all duration-300 cursor-pointer"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 rounded-xl border-2 border-purple-200 text-purple-600 font-semibold text-sm hover:bg-purple-50 transition-all duration-300"
          >
            Go to Home
          </Link>
        </div>
      </div>
    </section>
  );
}
