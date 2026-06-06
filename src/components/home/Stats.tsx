"use client";

import { STATS } from "@/lib/data";
import { Counter } from "@/components/ui/Counter";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function Stats() {
  return (
    <section className="py-16 bg-navy-800 border-y border-white/5">
      <div className="container-custom">
        <ScrollReveal>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {STATS.map((stat) => (
              <Counter key={stat.label} {...stat} />
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
