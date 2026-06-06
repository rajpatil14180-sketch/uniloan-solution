"use client";

import { Handshake, TrendingUp, Users, Globe } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { PartnerForm } from "@/components/forms/PartnerForm";

const BENEFITS = [
  {
    icon: Handshake,
    title: "Dedicated Partnership Support",
    description:
      "A dedicated relationship manager for your organization with priority response times.",
  },
  {
    icon: TrendingUp,
    title: "Revenue Growth",
    description:
      "Expand your service offerings with education loan facilitation and earn referral benefits.",
  },
  {
    icon: Users,
    title: "Student Success",
    description:
      "Offer your students access to 20+ lenders with expertise in difficult profiles.",
  },
  {
    icon: Globe,
    title: "Pan-India Coverage",
    description:
      "Support students across India with our comprehensive lender network.",
  },
];

const TARGETS = [
  "Study Abroad Consultants",
  "Education Counsellors",
  "Education Agencies",
  "Schools",
  "Universities",
];

export default function PartnersPage() {
  return (
    <>
      <section className="pt-32 pb-20 bg-navy-900">
        <div className="container-custom">
          <ScrollReveal>
            <span className="text-gold-400 font-semibold text-sm uppercase tracking-wider">
              Partnerships
            </span>
            <h1
              className="mt-4 text-4xl md:text-5xl font-bold text-white max-w-3xl leading-tight"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              Partner With Uniloan Solution
            </h1>
            <p className="mt-6 text-lg text-grey-300 max-w-2xl">
              Join our network of education partners and offer your students
              premium education loan consultancy backed by 20+ lending partners.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <ScrollReveal className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-navy-900">
              Who We Partner With
            </h2>
          </ScrollReveal>
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {TARGETS.map((target) => (
              <span
                key={target}
                className="px-5 py-2.5 rounded-full bg-purple-50 text-purple-700 font-medium text-sm border border-purple-100"
              >
                {target}
              </span>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {BENEFITS.map((benefit) => (
              <ScrollReveal key={benefit.title}>
                <div className="text-center p-6">
                  <div className="w-14 h-14 rounded-2xl bg-gold-400/20 flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="w-7 h-7 text-gold-500" />
                  </div>
                  <h3 className="font-bold text-navy-900 mb-2">{benefit.title}</h3>
                  <p className="text-grey-500 text-sm">{benefit.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal>
            <div className="max-w-2xl mx-auto glass-card rounded-3xl p-8 md:p-10">
              <h2 className="text-2xl font-bold text-navy-900 text-center mb-8">
                Partnership Inquiry
              </h2>
              <PartnerForm />
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
