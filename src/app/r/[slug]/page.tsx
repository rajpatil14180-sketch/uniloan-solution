import { notFound } from "next/navigation";
import { getCreator, CREATORS } from "@/lib/creators";
import { HeroEligibilityForm } from "@/components/forms/HeroEligibilityForm";
import Link from "next/link";
import type { Metadata } from "next";
import { Star, Shield, CheckCircle2 } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return CREATORS.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const creator = getCreator(slug);
  if (!creator) return {};
  return {
    title: `Education Loans — Exclusive via ${creator.name}`,
    description: `Get a free education loan eligibility check through ${creator.name}'s exclusive link. 20+ lending partners, rates starting from 8.25%.`,
    alternates: { canonical: `/r/${slug}` },
    robots: { index: false, follow: false },
  };
}

const TRUST_POINTS = [
  "Free eligibility check — no fees",
  "20+ lending partners",
  "Rates starting from 8.25%",
  "Non-collateral loans up to ₹70 lakhs",
];

function PlatformBadge({ platform }: { platform: string }) {
  if (platform === "youtube") {
    return (
      <span className="inline-flex items-center gap-1.5 text-sm text-white/50">
        {/* YouTube icon */}
        <svg className="w-4 h-4 text-red-500 fill-current" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
        YouTube Creator
      </span>
    );
  }
  if (platform === "instagram") {
    return (
      <span className="inline-flex items-center gap-1.5 text-sm text-white/50">
        {/* Instagram icon */}
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" style={{ color: "#e1306c" }}>
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
        Instagram Creator
      </span>
    );
  }
  return <span className="text-sm text-white/50">Content Creator</span>;
}

export default async function CreatorPage({ params }: Props) {
  const { slug } = await params;
  const creator = getCreator(slug);
  if (!creator) notFound();

  const initials = creator.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="min-h-screen bg-navy-900">
      {/* Minimal header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-navy-900/90 backdrop-blur-md border-b border-white/5">
        <div className="container-custom h-14 flex items-center justify-between">
          <Link href="/">
            <img
              src="/logo.png"
              alt="Uniloan Solution"
              className="h-7 w-auto object-contain"
              style={{ filter: "brightness(0) invert(1)" }}
            />
          </Link>
          <Link
            href="/contact"
            className="text-xs text-white/60 hover:text-white transition-colors"
          >
            Need help? Contact us
          </Link>
        </div>
      </header>

      <div className="pt-14">
        {/* Background glow */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-0 w-125 h-125 bg-purple-600/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-100 h-100 bg-gold-500/5 rounded-full blur-[100px]" />
        </div>

        <div className="relative container-custom px-4 py-10 max-w-2xl mx-auto">

          {/* Creator card */}
          <div className="mb-8 text-center">
            {/* Exclusive badge */}
            <div className="inline-flex items-center gap-1.5 bg-gold-400/10 border border-gold-400/30 text-gold-400 text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
              <Star className="w-3 h-3 fill-gold-400" />
              Exclusive Offer
            </div>

            {/* Creator photo / initials fallback */}
            <div className="flex justify-center mb-4">
              {creator.photo ? (
                <img
                  src={`/creators/${creator.photo}`}
                  alt={creator.name}
                  className="w-20 h-20 rounded-full object-cover ring-2 ring-white/10 shadow-2xl"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-linear-to-br from-purple-600 to-purple-400 flex items-center justify-center ring-2 ring-white/10 shadow-2xl">
                  <span className="text-white text-2xl font-bold">{initials}</span>
                </div>
              )}
            </div>

            {/* Name + handle + platform */}
            <h1 className="text-xl font-bold text-white mb-1">{creator.name}</h1>
            <div className="flex items-center justify-center gap-2">
              <PlatformBadge platform={creator.platform} />
              {creator.subscribers && (
                <span className="text-sm text-white/30">· {creator.subscribers}</span>
              )}
            </div>
            <p className="text-sm text-white/40 mt-0.5">{creator.handle}</p>

            {/* Creator message */}
            <div className="mt-5 bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-left">
              <p className="text-sm text-white/80 leading-relaxed italic">
                &ldquo;{creator.message}&rdquo;
              </p>
            </div>
          </div>

          {/* Trust points */}
          <div className="grid grid-cols-2 gap-2 mb-8">
            {TRUST_POINTS.map((point) => (
              <div key={point} className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-gold-400 shrink-0" />
                <span className="text-xs text-white/60">{point}</span>
              </div>
            ))}
          </div>

          {/* Eligibility form */}
          <HeroEligibilityForm source={`creator-${slug}`} />

          {/* Footer trust */}
          <div className="mt-6 flex items-center justify-center gap-2 text-white/30 text-xs">
            <Shield className="w-3.5 h-3.5" />
            <span>Your information is secure and never shared</span>
          </div>

          <p className="text-center text-white/20 text-xs mt-4">
            &copy; {new Date().getFullYear()} Uniloan Solution &middot;{" "}
            <Link href="/privacy-policy" className="hover:text-white/40 transition-colors">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
