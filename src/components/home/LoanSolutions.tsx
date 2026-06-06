"use client";

import Link from "next/link";
import { Globe, GraduationCap, FileCheck, ArrowRight } from "lucide-react";
import { LOAN_SERVICES } from "@/lib/data";
import { StaggerContainer, StaggerItem, ScrollReveal } from "@/components/ui/ScrollReveal";

const services = [
  {
    key: "study-abroad" as const,
    icon: Globe,
    gradient: "from-purple-600 to-purple-500",
  },
  {
    key: "study-india" as const,
    icon: GraduationCap,
    gradient: "from-navy-700 to-navy-600",
  },
  {
    key: "visa-fund" as const,
    icon: FileCheck,
    gradient: "from-gold-500 to-gold-400",
  },
];

export function LoanSolutions() {
  return (
    <section className="section-padding bg-grey-50">
      <div className="container-custom">
        <ScrollReveal className="text-center mb-16">
          <span className="text-purple-600 font-semibold text-sm uppercase tracking-wider">
            Our Services
          </span>
          <h2
            className="mt-3 text-3xl md:text-4xl font-bold text-navy-900"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            Loan Solutions
          </h2>
        </ScrollReveal>

        <StaggerContainer className="grid md:grid-cols-3 gap-8">
          {services.map(({ key, icon: Icon, gradient }) => {
            const service = LOAN_SERVICES[key];
            return (
              <StaggerItem key={key}>
                <Link
                  href={`/${service.slug}`}
                  className="group block glass-card rounded-3xl p-8 h-full transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
                >
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110`}
                  >
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-navy-900 mb-3 group-hover:text-purple-600 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-grey-500 text-sm leading-relaxed mb-6">
                    {service.description.slice(0, 120)}...
                  </p>
                  <span className="inline-flex items-center gap-2 text-purple-600 font-semibold text-sm group-hover:gap-3 transition-all">
                    Learn More <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
