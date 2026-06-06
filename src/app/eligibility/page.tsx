import { Metadata } from "next";
import { EligibilityForm } from "@/components/forms/EligibilityForm";

export const metadata: Metadata = {
  title: "Free Eligibility Check",
  description:
    "Check your education loan eligibility for free. Response within 1-2 hours from our dedicated consultants.",
};

export default function EligibilityPage() {
  return (
    <section className="pt-32 pb-20 min-h-screen bg-grey-50">
      <div className="container-custom max-w-2xl">
        <div className="text-center mb-12">
          <span className="text-purple-600 font-semibold text-sm uppercase tracking-wider">
            Free Assessment
          </span>
          <h1
            className="mt-3 text-3xl md:text-4xl font-bold text-navy-900"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            Check Your Eligibility
          </h1>
          <p className="mt-4 text-grey-500">
            Complete this quick assessment and receive a professional profile
            review within 1 to 2 hours. Completely free.
          </p>
        </div>
        <div className="glass-card rounded-3xl p-8 md:p-10">
          <EligibilityForm />
        </div>
      </div>
    </section>
  );
}
