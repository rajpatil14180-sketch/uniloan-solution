"use client";

import { LENDING_PARTNERS } from "@/lib/data";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

function PartnerLogo({
  name,
  abbr,
  color,
}: {
  name: string;
  abbr: string;
  color: string;
}) {
  return (
    <div className="group flex-shrink-0 mx-6 md:mx-10">
      <div className="flex items-center gap-3 px-6 py-4 rounded-xl bg-white border border-grey-200 transition-all duration-500 grayscale group-hover:grayscale-0 group-hover:shadow-lg group-hover:border-grey-300 group-hover:-translate-y-1 min-w-[200px]">
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center text-white text-xs font-bold flex-shrink-0 transition-transform duration-500 group-hover:scale-110"
          style={{ backgroundColor: color }}
        >
          {abbr.slice(0, 3)}
        </div>
        <span className="text-sm font-semibold text-navy-800 whitespace-nowrap">
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
            Trusted Lending Network
          </h2>
          <p className="mt-4 text-grey-500 text-lg max-w-2xl mx-auto">
            Access to 20+ Banks & NBFCs through a single consultation.
          </p>
        </ScrollReveal>
      </div>

      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <div className="flex animate-marquee w-max">
          {partners.map((partner, i) => (
            <PartnerLogo key={`${partner.name}-${i}`} {...partner} />
          ))}
        </div>
      </div>
    </section>
  );
}
