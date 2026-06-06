"use client";

import { Check } from "lucide-react";
import { COMPARISON } from "@/lib/data";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function Comparison() {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <ScrollReveal className="text-center mb-16">
          <span className="text-purple-600 font-semibold text-sm uppercase tracking-wider">
            The Difference
          </span>
          <h2
            className="mt-3 text-3xl md:text-4xl font-bold text-navy-900"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            Why Students Prefer Uniloan Solution
          </h2>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <ScrollReveal direction="left">
            <div className="rounded-3xl bg-gradient-to-br from-navy-900 to-navy-800 p-8 md:p-10 h-full border border-purple-500/20 shadow-xl shadow-navy-900/20">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-3 h-3 rounded-full bg-gold-400" />
                <h3 className="text-xl font-bold text-white">Uniloan Solution</h3>
              </div>
              <ul className="space-y-4">
                {COMPARISON.us.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-gold-400/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-gold-400" />
                    </div>
                    <span className="text-white/90 text-sm md:text-base">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right">
            <div className="rounded-3xl bg-grey-50 p-8 md:p-10 h-full border border-grey-200">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-3 h-3 rounded-full bg-grey-400" />
                <h3 className="text-xl font-bold text-navy-900">
                  Typical Large Consultancies
                </h3>
              </div>
              <ul className="space-y-4">
                {COMPARISON.them.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-grey-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-grey-400" />
                    </div>
                    <span className="text-grey-500 text-sm md:text-base">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
