"use client";

import { LENDING_PARTNERS } from "@/lib/data";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

function PartnerLogo({
  name,
  abbr,
  color,
  logo,
}: {
  name: string;
  abbr: string;
  color: string;
  logo?: string;
}) {
  return (
    <div className="flex-shrink-0 px-3">
      <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white border border-grey-200 w-[210px]">
        {logo ? (
          <div className="h-12 w-[5.5rem] shrink-0 rounded-md bg-white flex items-center justify-center overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={logo}
              alt={`${name} logo`}
              width={88}
              height={48}
              className="block h-full w-full object-contain object-center pointer-events-none select-none"
              loading="eager"
              decoding="async"
              draggable={false}
            />
          </div>
        ) : (
          <div
            className="h-12 w-[5.5rem] shrink-0 rounded-md flex items-center justify-center text-white text-xs font-bold"
            style={{ backgroundColor: color }}
          >
            {abbr.slice(0, 3)}
          </div>
        )}
        <span className="min-w-0 flex-1 text-sm font-semibold text-navy-800 leading-tight line-clamp-2">
          {name}
        </span>
      </div>
    </div>
  );
}

export function PartnerMarquee() {
  const partners = [...LENDING_PARTNERS, ...LENDING_PARTNERS];

  return (
    <section className="section-padding bg-white overflow-hidden">
      <div className="container-custom mb-12">
        <ScrollReveal className="text-center">
          <h2
            className="text-3xl md:text-4xl font-bold text-navy-900"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            Supported Financial Institutions
          </h2>
          <p className="mt-4 text-grey-500 text-lg max-w-2xl mx-auto">
            Access to Multiple Banks & NBFCs through a single consultation.
          </p>
        </ScrollReveal>
      </div>

      <div className="relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <div className="flex animate-marquee w-max will-change-transform">
          {partners.map((partner, i) => (
            <PartnerLogo key={`${partner.name}-${i}`} {...partner} />
          ))}
        </div>
      </div>
    </section>
  );
}
