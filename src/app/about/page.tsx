"use client";

import { Shield, Users, Target, Award } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Stats } from "@/components/home/Stats";
import { FinalCTA } from "@/components/home/FinalCTA";
const VALUES = [
  {
    icon: Shield,
    title: "Transparency",
    description:
      "No hidden charges, no misleading commitments. Our process is transparent from start to finish.",
  },
  {
    icon: Users,
    title: "Personal Attention",
    description:
      "Every student receives a dedicated consultant — not an automated system or call center.",
  },
  {
    icon: Target,
    title: "Specialized Expertise",
    description:
      "We specialize in difficult profiles, rejection cases, and low CIBIL score solutions.",
  },
  {
    icon: Award,
    title: "Results-Driven",
    description:
      "We stay with you from initial application through sanction, disbursement, and visa support.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="pt-32 pb-20 bg-navy-900">
        <div className="container-custom">
          <ScrollReveal>
            <span className="text-gold-400 font-semibold text-sm uppercase tracking-wider">
              About Us
            </span>
            <h1
              className="mt-4 text-4xl md:text-5xl font-bold text-white max-w-3xl leading-tight"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              Expert Education Loan Consultancy You Can Trust
            </h1>
            <p className="mt-6 text-lg text-grey-300 max-w-2xl leading-relaxed">
              Uniloan Solution is a specialized education loan consultancy helping
              Indian students secure financing for higher education. We work with a
              network of 20+ leading banks and NBFCs, including cases previously
              rejected or considered difficult.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <Stats />

      <section className="section-padding bg-white">
        <div className="container-custom">
          <ScrollReveal className="max-w-3xl mx-auto text-center mb-16">
            <h2
              className="text-3xl font-bold text-navy-900"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              Our Mission
            </h2>
            <p className="mt-6 text-grey-500 text-lg leading-relaxed">
              To ensure every deserving student — regardless of profile complexity —
              has access to the right education loan through expert guidance,
              lender negotiation, and end-to-end support. We believe financial
              constraints should never stand between a student and their education
              goals.
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {VALUES.map((value) => (
              <ScrollReveal key={value.title}>
                <div className="text-center p-6">
                  <div className="w-14 h-14 rounded-2xl bg-purple-100 flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-7 h-7 text-purple-600" />
                  </div>
                  <h3 className="font-bold text-navy-900 mb-2">{value.title}</h3>
                  <p className="text-grey-500 text-sm leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-grey-50">
        <div className="container-custom max-w-3xl">
          <ScrollReveal>
            <h2
              className="text-3xl font-bold text-navy-900 text-center mb-8"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              Our Service Charge
            </h2>
            <div className="glass-card rounded-3xl p-8 md:p-10">
              <p className="text-grey-600 leading-relaxed mb-4">
                We charge 1% of the sanctioned loan amount as our professional
                service fee. This is payable only after your loan is sanctioned —
                there is no upfront fee at any stage.
              </p>
              <p className="text-grey-600 leading-relaxed mb-4">
                This covers profile evaluation, lender matching, interest rate
                negotiation, processing fee negotiation, documentation support,
                application follow-up, rejection handling, visa guidance, and
                post-sanction disbursement support.
              </p>
              <p className="text-grey-500 text-sm">
                Our 1% service charge is separate from the bank or NBFC processing
                fee levied directly by the lender.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
