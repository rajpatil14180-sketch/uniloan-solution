"use client";

import { Check } from "lucide-react";
import { Accordion } from "@/components/ui/Accordion";
import { ServiceLeadForm } from "@/components/forms/ServiceLeadForm";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { FinalCTA } from "@/components/home/FinalCTA";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SITE } from "@/lib/data";

interface ServiceData {
  title: string;
  headline: string;
  description: string;
  benefits: string[];
  eligibility: string[];
  faqs: { question: string; answer: string }[];
}

export function ServicePageTemplate({ service }: { service: ServiceData & { slug: string } }) {
  return (
    <>
      <section className="relative pt-32 pb-20 bg-navy-900 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-[100px]" />
        </div>
        <div className="container-custom relative z-10">
          <ScrollReveal>
            <span className="text-gold-400 font-semibold text-sm uppercase tracking-wider">
              {service.title}
            </span>
            <h1
              className="mt-4 text-4xl md:text-5xl font-bold text-white max-w-3xl leading-tight"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              {service.headline}
            </h1>
            <p className="mt-6 text-lg text-grey-300 max-w-2xl leading-relaxed">
              {service.description}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <MagneticButton href="/eligibility">Check Eligibility Free</MagneticButton>
              <MagneticButton
                href={`https://wa.me/${SITE.whatsapp}`}
                variant="outline"
                external
              >
                Talk To An Expert
              </MagneticButton>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom grid lg:grid-cols-2 gap-16">
          <ScrollReveal>
            <h2 className="text-2xl md:text-3xl font-bold text-navy-900 mb-8">Benefits</h2>
            <ul className="space-y-4">
              {service.benefits.map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 text-purple-600" />
                  </div>
                  <span className="text-grey-600">{b}</span>
                </li>
              ))}
            </ul>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <h2 className="text-2xl md:text-3xl font-bold text-navy-900 mb-8">Eligibility</h2>
            <ul className="space-y-4">
              {service.eligibility.map((e) => (
                <li key={e} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-gold-400/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 text-gold-500" />
                  </div>
                  <span className="text-grey-600">{e}</span>
                </li>
              ))}
            </ul>
          </ScrollReveal>
        </div>
      </section>

      <section className="section-padding bg-grey-50">
        <div className="container-custom max-w-3xl">
          <ScrollReveal className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-navy-900">
              Frequently Asked Questions
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <Accordion items={service.faqs} />
          </ScrollReveal>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom max-w-lg">
          <ScrollReveal className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-navy-900">
              Get A Free Consultation
            </h2>
            <p className="mt-3 text-grey-500">
              Fill in your details and our consultant will reach out within 1-2 hours.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <div className="glass-card rounded-3xl p-8">
              <ServiceLeadForm service={service.title} />
            </div>
          </ScrollReveal>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
