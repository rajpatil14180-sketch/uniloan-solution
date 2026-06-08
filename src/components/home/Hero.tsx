"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Phone } from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { HeroEligibilityForm } from "@/components/forms/HeroEligibilityForm";
import { SITE } from "@/lib/data";

const TRUST_BADGES = [
  "Interest Rates Starting From 8.25%",
  "Non-Collateral Loans Up To ₹60 Lakhs",
  "Free Eligibility Check",
  "20+ Lending Partners",
];

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center bg-navy-900 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px] animate-pulse-glow" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gold-500/5 rounded-full blur-[100px] animate-float" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="container-custom relative z-10 pt-24 pb-16 md:pt-28 md:pb-20">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 xl:gap-16 items-center">
          <div>
            <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="flex justify-center lg:justify-start mb-10"
  >
    <img
      src="/logo.png"
      alt="Uniloan Solution"
      className="w-[220px] sm:w-[260px] md:w-auto md:h-36 lg:h-44 h-auto object-contain"
    />
  </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold text-white leading-[1.12] tracking-tight"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              Education Loans For{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 via-gold-500 to-purple-400">
                Profiles Others Ignore
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-5 md:mt-6 text-base md:text-lg text-grey-300 leading-relaxed max-w-xl"
            >
              From straightforward approvals to difficult cases, Uniloan Solution
              helps students find the right lender, negotiate better terms, and
              secure funding for higher education.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-6 md:mt-8 grid sm:grid-cols-2 gap-2.5 md:gap-3"
            >
              {TRUST_BADGES.map((badge, i) => (
                <div key={i} className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-gold-400 flex-shrink-0" />
                  <span className="text-xs md:text-sm text-white/90 font-medium">
                    {badge}
                  </span>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-8 hidden lg:flex"
            >
              <MagneticButton
                href="/contact"
                variant="outline"
              >
                <Phone className="w-4 h-4" />
                Talk To An Expert
              </MagneticButton>
            </motion.div>
          </div>

          <HeroEligibilityForm />
        </div>
      </div>
    </section>
  );
}
