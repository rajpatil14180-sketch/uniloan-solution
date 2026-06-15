"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle2, Loader2, Shield } from "lucide-react";

const COURSES = ["Bachelors", "Masters", "PhD", "MBBS"];

const DESTINATIONS = [
  "United States",
  "United Kingdom",
  "Canada",
  "Australia",
  "Germany",
  "Italy",
  "France",
  "Ireland",
  "New Zealand",
  "Georgia",
  "Russia",
  "Austria",
  "India",
  "Other",
];

const LOAN_AMOUNTS = [
  "Below ₹10 Lakhs",
  "₹10 – ₹25 Lakhs",
  "₹25 – ₹50 Lakhs",
  "₹50 – ₹70 Lakhs",
  "Above ₹70 Lakhs",
];

interface FormState {
  name: string;
  email: string;
  phone: string;
  course: string;
  destination: string;
  otherCountry: string;
  loanAmount: string;
}

const initial: FormState = {
  name: "",
  email: "",
  phone: "",
  course: "",
  destination: "",
  otherCountry: "",
  loanAmount: "",
};

const inputClass =
  "w-full px-4 py-3 rounded-xl border border-grey-200 bg-white text-navy-900 text-sm placeholder:text-grey-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all";

const selectClass =
  "w-full px-4 py-3 rounded-xl border border-grey-200 bg-white text-navy-900 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all appearance-none cursor-pointer";

export function HeroEligibilityForm({ source = "hero" }: { source?: string }) {
  const [form, setForm] = useState<FormState>(initial);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [honeypot, setHoneypot] = useState("");

  const update = (field: keyof FormState, value: string) => {
    setForm((f) => {
      const next = { ...f, [field]: value };
      if (field === "destination" && value !== "Other") {
        next.otherCountry = "";
      }
      return next;
    });
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }));
  };

  const validate = (): boolean => {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!form.name.trim()) next.name = "Required";
    if (!form.email.trim()) next.email = "Required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      next.email = "Invalid email";
    if (!form.phone.trim()) next.phone = "Required";
    else if (!/^[+\d\s\-()]{7,20}$/.test(form.phone)) next.phone = "Invalid phone";
    if (!form.course) next.course = "Required";
    if (!form.destination) next.destination = "Required";
    if (form.destination === "Other" && !form.otherCountry.trim())
      next.otherCountry = "Please enter country name";
    if (!form.loanAmount) next.loanAmount = "Required";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const resolvedCountry =
    form.destination === "Other" ? form.otherCountry.trim() : form.destination;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    if (honeypot) return;
    setSubmitting(true);
    setSubmitError("");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "eligibility",
          name: form.name,
          email: form.email,
          phone: form.phone,
          course: form.course,
          country: resolvedCountry,
          university: "",
          loanAmount: form.loanAmount,
          familyIncome: "",
          collateral: "",
          source,
        }),
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        const json = await res.json().catch(() => ({}));
        setSubmitError((json as { error?: string }).error ?? "Submission failed. Please try again.");
      }
    } catch {
      setSubmitError("Network error. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-10 px-6"
      >
        <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-7 h-7 text-green-600" />
        </div>
        <h3 className="text-xl font-bold text-navy-900">You&apos;re All Set</h3>
        <p className="text-grey-500 text-sm mt-2 leading-relaxed">
          Our consultant will review your profile and respond with a quick
          eligibility assessment.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.25 }}
      className="w-full"
    >
      <div className="bg-white rounded-2xl shadow-2xl shadow-navy-950/20 border border-white/80 overflow-hidden">
        <div className="px-6 pt-6 pb-4 border-b border-grey-100">
          <h2
            className="text-lg font-bold text-navy-900"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            Check Your Eligibility
          </h2>
          <p className="text-grey-500 text-sm mt-1">
            Free assessment · Quick Response
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Honeypot — invisible to real users, filled only by bots */}
          <input
            type="text"
            name="_hp"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            style={{ position: "absolute", left: "-9999px", width: "1px", height: "1px", overflow: "hidden" }}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Full Name" error={errors.name}>
              <input
                type="text"
                placeholder="Enter your full name"
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                className={inputClass}
              />
            </Field>
            <Field label="Email Address" error={errors.email}>
              <input
                type="email"
                placeholder="your@email.com"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                className={inputClass}
              />
            </Field>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Phone Number" error={errors.phone}>
              <input
                type="tel"
                placeholder="+91 XXXXX XXXXX"
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
                className={inputClass}
              />
            </Field>
            <Field label="Course" error={errors.course}>
              <div className="relative">
                <select
                  value={form.course}
                  onChange={(e) => update("course", e.target.value)}
                  className={`${selectClass} ${!form.course ? "text-grey-400" : ""}`}
                >
                  <option value="">Select course</option>
                  {COURSES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                <Chevron />
              </div>
            </Field>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-4">
              <Field label="Study Destination" error={errors.destination}>
                <div className="relative">
                  <select
                    value={form.destination}
                    onChange={(e) => update("destination", e.target.value)}
                    className={`${selectClass} ${!form.destination ? "text-grey-400" : ""}`}
                  >
                    <option value="">Select destination</option>
                    {DESTINATIONS.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                  <Chevron />
                </div>
              </Field>
              <AnimatePresence>
                {form.destination === "Other" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Field label="Country Name" error={errors.otherCountry}>
                      <input
                        type="text"
                        placeholder="Enter country name"
                        value={form.otherCountry}
                        onChange={(e) => update("otherCountry", e.target.value)}
                        className={inputClass}
                      />
                    </Field>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <Field label="Loan Amount Required" error={errors.loanAmount}>
              <div className="relative">
                <select
                  value={form.loanAmount}
                  onChange={(e) => update("loanAmount", e.target.value)}
                  className={`${selectClass} ${!form.loanAmount ? "text-grey-400" : ""}`}
                >
                  <option value="">Select amount</option>
                  {LOAN_AMOUNTS.map((a) => (
                    <option key={a} value={a}>
                      {a}
                    </option>
                  ))}
                </select>
                <Chevron />
              </div>
            </Field>
          </div>

          {submitError && (
            <p className="text-sm text-red-500 text-center">{submitError}</p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full mt-2 flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-purple-500 text-white font-semibold text-sm shadow-lg shadow-purple-600/25 hover:shadow-purple-600/40 hover:from-purple-500 hover:to-purple-400 transition-all duration-300 disabled:opacity-70 cursor-pointer"
          >
            {submitting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                Check Eligibility Free
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          <div className="flex items-center justify-center gap-2 pt-1">
            <Shield className="w-3.5 h-3.5 text-grey-400" />
            <span className="text-xs text-grey-400">
              Your information is secure and never shared
            </span>
          </div>
        </form>
      </div>
    </motion.div>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-xs font-semibold text-navy-800 mb-1.5 tracking-wide">
        {label}
      </label>
      {children}
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}

function Chevron() {
  return (
    <svg
      className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-grey-400 pointer-events-none"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}
