"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { PROCESS_STEPS } from "@/lib/data";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function ProcessTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "end 0.5"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="section-padding bg-navy-900 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-[100px]" />
      </div>

      <div className="container-custom relative z-10">
        <ScrollReveal className="text-center mb-16">
          <span className="text-gold-400 font-semibold text-sm uppercase tracking-wider">
            Our Process
          </span>
          <h2
            className="mt-3 text-3xl md:text-4xl font-bold text-white"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            A Structured Path To Your Education Loan
          </h2>
          <p className="mt-4 text-grey-400 text-lg max-w-2xl mx-auto">
            From initial profile evaluation to visa fund show assistance — we
            guide you through every step.
          </p>
        </ScrollReveal>

        <div ref={containerRef} className="relative max-w-3xl mx-auto">
          <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-white/10">
            <motion.div
              className="w-full bg-gradient-to-b from-purple-500 via-gold-400 to-purple-500 origin-top"
              style={{ height: lineHeight }}
            />
          </div>

          <div className="space-y-8">
            {PROCESS_STEPS.map((step, index) => (
              <ScrollReveal key={step.step} delay={index * 0.05}>
                <div className="relative flex gap-6 md:gap-8 pl-16 md:pl-20">
                  <div className="absolute left-0 md:left-2 w-12 h-12 md:w-14 md:h-14 rounded-full bg-navy-800 border-2 border-purple-500 flex items-center justify-center z-10 shadow-lg shadow-purple-500/20">
                    <span className="text-sm md:text-base font-bold text-gold-400">
                      {step.step}
                    </span>
                  </div>
                  <div className="glass rounded-2xl p-6 md:p-8 flex-1 transition-all duration-500 hover:bg-white/10 hover:border-purple-500/30">
                    <h3 className="text-lg md:text-xl font-bold text-white mb-2">
                      {step.title}
                    </h3>
                    <p className="text-grey-400 text-sm md:text-base leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
