"use client";

import { motion } from "framer-motion";
import { ArrowRight, MessageCircle, Phone } from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { SITE } from "@/lib/data";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function FinalCTA() {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-navy-900 via-purple-600/30 to-navy-900" />
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-500/10 rounded-full blur-[120px] animate-pulse-glow" />
      </div>

      <div className="container-custom relative z-10">
        <ScrollReveal className="text-center max-w-3xl mx-auto">
          <motion.h2
            className="text-3xl md:text-5xl font-bold text-white leading-tight"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            Ready To Secure Your Education Loan?
          </motion.h2>
          <p className="mt-6 text-lg text-grey-300">
            Start with a free eligibility check. Our dedicated consultants are
            available 24/7 to guide you through every step.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <MagneticButton href="/eligibility">
              Check Eligibility
              <ArrowRight className="w-4 h-4" />
            </MagneticButton>
            <MagneticButton
              href={`https://wa.me/${SITE.whatsapp}`}
              variant="outline"
              external
            >
              <Phone className="w-4 h-4" />
              Talk To An Expert
            </MagneticButton>
            <MagneticButton
              href={`https://wa.me/${SITE.whatsapp}`}
              variant="whatsapp"
              external
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp Us
            </MagneticButton>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
