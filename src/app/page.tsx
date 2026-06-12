import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { PartnerMarquee } from "@/components/home/PartnerMarquee";
import { Stats } from "@/components/home/Stats";
import { WhyChoose } from "@/components/home/WhyChoose";
import { ProcessTimeline } from "@/components/home/ProcessTimeline";
import { LoanSolutions } from "@/components/home/LoanSolutions";
import { Comparison } from "@/components/home/Comparison";
import { FAQ } from "@/components/home/FAQ";
import { FinalCTA } from "@/components/home/FinalCTA";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <PartnerMarquee />
      <Stats />
      <WhyChoose />
      <ProcessTimeline />
      <LoanSolutions />
      <Comparison />
      <FAQ />
      <FinalCTA />
    </>
  );
}
