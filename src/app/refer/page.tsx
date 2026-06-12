import { Metadata } from "next";
import { Gift, Users, BadgeCheck, ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { ReferralForm } from "@/components/forms/ReferralForm";

export const metadata: Metadata = {
  title: "Refer & Earn | Uniloan Solution",
  description:
    "Refer a student to Uniloan Solution and earn rewards. Submit their details and we'll handle the rest.",
  alternates: { canonical: "/refer" },
};

const HOW_IT_WORKS = [
  {
    icon: Users,
    title: "Submit a Referral",
    description: "Fill in your details and the student's basic info. Takes under 2 minutes.",
  },
  {
    icon: BadgeCheck,
    title: "We Reach Out",
    description:
      "Our consultants contact the referred student and guide them through the loan process.",
  },
  {
    icon: Gift,
    title: "You Earn ₹5,000",
    description:
      "Receive ₹5,000 for every successful referral.",
  },
];

export default function ReferPage() {
  return (
    <section className="pt-32 pb-20 min-h-screen bg-grey-50">
      <div className="container-custom">
        <ScrollReveal className="text-center mb-14">
          <span className="text-purple-600 font-semibold text-sm uppercase tracking-wider">
            Refer &amp; Earn
          </span>
          <h1
            className="mt-3 text-3xl md:text-4xl font-bold text-navy-900"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            Refer a Student, Earn Rewards
          </h1>
          <p className="mt-4 text-grey-500 max-w-xl mx-auto">
            Know someone planning to study abroad or in India? Refer them to
            Uniloan Solution and earn rewards when their loan gets sanctioned.
          </p>
        </ScrollReveal>

        <div className="grid lg:grid-cols-5 gap-12 max-w-5xl mx-auto">
          {/* Left — How it works */}
          <ScrollReveal className="lg:col-span-2 space-y-5">
            {/* Reward highlight card */}
            <div className="rounded-2xl bg-gradient-to-br from-purple-600 to-purple-500 p-5 text-white shadow-lg shadow-purple-600/20">
              <p className="text-xs font-semibold uppercase tracking-wider text-purple-200 mb-1">
                Referral Reward
              </p>
              <p className="text-3xl font-bold" style={{ fontFamily: "var(--font-dm-sans)" }}>
                ₹5,000
              </p>
              <p className="text-sm text-purple-100 mt-1">per successful referral</p>
              <p className="text-[11px] text-purple-300 mt-3 leading-relaxed">
                Reward is payable after sanction commission is received by Uniloan Solution.
              </p>
            </div>

            <h2
              className="text-lg font-bold text-navy-900"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              How It Works
            </h2>

            {HOW_IT_WORKS.map((step, i) => (
              <div key={step.title} className="flex items-start gap-4 glass-card rounded-2xl p-5">
                <div className="w-11 h-11 rounded-xl bg-purple-100 flex items-center justify-center flex-shrink-0">
                  <step.icon className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">
                      Step {i + 1}
                    </span>
                  </div>
                  <h3 className="font-semibold text-navy-900 text-sm">{step.title}</h3>
                  <p className="text-grey-500 text-sm mt-1 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}

            <div className="glass-card rounded-2xl p-5 border-l-4 border-purple-500">
              <p className="text-sm font-semibold text-navy-900 mb-1">
                You can refer up to 2 students at a time
              </p>
              <p className="text-xs text-grey-500 leading-relaxed">
                Fill Referral 1 (required) and optionally add a second referral
                in the same submission. Country and loan amount are optional if
                you&apos;re unsure.
              </p>
              <a
                href="/contact"
                className="inline-flex items-center gap-1.5 mt-3 text-xs font-semibold text-purple-600 hover:text-purple-500 transition-colors"
              >
                Have questions? Contact us
                <ArrowRight className="w-3 h-3" />
              </a>
            </div>
          </ScrollReveal>

          {/* Right — Form */}
          <ScrollReveal className="lg:col-span-3" delay={0.1}>
            <div className="glass-card rounded-3xl p-8">
              <div className="mb-7 pb-5 border-b border-grey-100">
                <h2
                  className="text-lg font-bold text-navy-900"
                  style={{ fontFamily: "var(--font-dm-sans)" }}
                >
                  Submit Your Referral
                </h2>
                <p className="text-grey-500 text-sm mt-1">
                  Fields marked as required must be filled. Country and loan
                  amount can be set to &quot;Don&apos;t Know&quot; if unsure.
                </p>
              </div>
              <ReferralForm />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
