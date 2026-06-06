"use client";

import { Percent, Shield, ClipboardCheck, Headphones } from "lucide-react";
import { WHY_CHOOSE } from "@/lib/data";
import { StaggerContainer, StaggerItem, ScrollReveal } from "@/components/ui/ScrollReveal";

const iconMap = {
  percent: Percent,
  shield: Shield,
  clipboard: ClipboardCheck,
  headphones: Headphones,
};

export function WhyChoose() {
  return (
    <section className="section-padding bg-grey-50">
      <div className="container-custom">
        <ScrollReveal className="text-center mb-16">
          <span className="text-purple-600 font-semibold text-sm uppercase tracking-wider">
            Why Choose Us
          </span>
          <h2
            className="mt-3 text-3xl md:text-4xl font-bold text-navy-900"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            Why Students Choose Uniloan Solution
          </h2>
        </ScrollReveal>

        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {WHY_CHOOSE.map((item) => {
            const Icon = iconMap[item.icon as keyof typeof iconMap];
            return (
              <StaggerItem key={item.title}>
                <div className="group glass-card rounded-2xl p-8 h-full transition-all duration-500 hover:shadow-xl hover:-translate-y-2 hover:border-purple-200">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-600 to-purple-500 flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-purple-500/25">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-navy-900 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-grey-500 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
