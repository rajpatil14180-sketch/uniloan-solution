"use client";

import { FAQS } from "@/lib/data";
import { Accordion } from "@/components/ui/Accordion";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function FAQ() {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="grid lg:grid-cols-5 gap-12">
          <ScrollReveal className="lg:col-span-2">
            <span className="text-purple-600 font-semibold text-sm uppercase tracking-wider">
              FAQ
            </span>
            <h2
              className="mt-3 text-3xl md:text-4xl font-bold text-navy-900"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              Frequently Asked Questions
            </h2>
            <p className="mt-4 text-grey-500 leading-relaxed">
              Common questions about education loans, eligibility, and our
              process. For personalized answers, book a free consultation.
            </p>
          </ScrollReveal>
          <ScrollReveal className="lg:col-span-3" delay={0.2}>
            <Accordion items={FAQS} />
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
