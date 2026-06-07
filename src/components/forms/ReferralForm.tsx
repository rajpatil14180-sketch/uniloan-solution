"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Loader2, Plus, X, Shield } from "lucide-react";
import type { ReferralEntry } from "@/lib/types";

const DESTINATIONS = [
  "Don't Know",
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
  "Don't Know",
  "Below ₹10 Lakhs",
  "₹10 – ₹25 Lakhs",
  "₹25 – ₹50 Lakhs",
  "₹50 – ₹70 Lakhs",
  "Above ₹70 Lakhs",
];

const emptyReferral = (): ReferralEntry => ({
  name: "",
  phone: "",
  country: "",
  loanAmount: "",
});

interface FormState {
  name: string;
  phone: string;
  email: string;
  referral1: ReferralEntry;
  referral2: ReferralEntry;
}

type ErrorMap = Partial<{
  name: string;
  phone: string;
  email: string;
  referral1_name: string;
  referral1_phone: string;
  referral2_name: string;
  referral2_phone: string;
}>;

const inputClass =
  "w-full px-4 py-3 rounded-xl border border-grey-200 bg-white text-navy-900 text-sm placeholder:text-grey-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all";

const selectClass =
  "w-full px-4 py-3 rounded-xl border border-grey-200 bg-white text-navy-900 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all appearance-none cursor-pointer";

export function ReferralForm() {
  const [form, setForm] = useState<FormState>({
    name: "",
    phone: "",
    email: "",
    referral1: emptyReferral(),
    referral2: emptyReferral(),
  });
  const [showReferral2, setShowReferral2] = useState(false);
  const [errors, setErrors] = useState<ErrorMap>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const clearError = (key: keyof ErrorMap) =>
    setErrors((e) => ({ ...e, [key]: undefined }));

  const updateReferral = (
    which: "referral1" | "referral2",
    field: keyof ReferralEntry,
    value: string
  ) => {
    setForm((f) => ({ ...f, [which]: { ...f[which], [field]: value } }));
    const errKey = `${which}_${field}` as keyof ErrorMap;
    clearError(errKey);
  };

  const validate = (): boolean => {
    const next: ErrorMap = {};
    if (!form.name.trim()) next.name = "Required";
    if (!form.phone.trim()) next.phone = "Required";
    else if (!/^[+\d\s-]{10,}$/.test(form.phone)) next.phone = "Invalid phone number";
    if (!form.email.trim()) next.email = "Required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = "Invalid email";
    if (!form.referral1.name.trim()) next.referral1_name = "Required";
    if (!form.referral1.phone.trim()) next.referral1_phone = "Required";
    else if (!/^[+\d\s-]{10,}$/.test(form.referral1.phone))
      next.referral1_phone = "Invalid phone number";
    if (showReferral2) {
      if (!form.referral2.name.trim()) next.referral2_name = "Required";
      if (!form.referral2.phone.trim()) next.referral2_phone = "Required";
      else if (!/^[+\d\s-]{10,}$/.test(form.referral2.phone))
        next.referral2_phone = "Invalid phone number";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      const referrals: ReferralEntry[] = [form.referral1];
      if (showReferral2) referrals.push(form.referral2);
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "referral",
          name: form.name,
          phone: form.phone,
          email: form.email,
          referrals,
        }),
      });
      if (res.ok) setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-14 px-6"
      >
        <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-5">
          <CheckCircle2 className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-navy-900" style={{ fontFamily: "var(--font-dm-sans)" }}>
          Referral Submitted!
        </h3>
        <p className="text-grey-500 mt-3 max-w-sm mx-auto leading-relaxed">
          Thank you for referring. Our team will reach out to your referral(s)
          shortly and keep you updated on the progress.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Your Information */}
      <div>
        <SectionHeading label="Your Information" step="01" />
        <div className="mt-4 space-y-4">
          <Field label="Full Name" error={errors.name}>
            <input
              type="text"
              placeholder="Enter your full name"
              value={form.name}
              onChange={(e) => {
                setForm((f) => ({ ...f, name: e.target.value }));
                clearError("name");
              }}
              className={inputClass}
            />
          </Field>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Contact Number" error={errors.phone}>
              <input
                type="tel"
                placeholder="+91 XXXXX XXXXX"
                value={form.phone}
                onChange={(e) => {
                  setForm((f) => ({ ...f, phone: e.target.value }));
                  clearError("phone");
                }}
                className={inputClass}
              />
            </Field>
            <Field label="Email Address" error={errors.email}>
              <input
                type="email"
                placeholder="your@email.com"
                value={form.email}
                onChange={(e) => {
                  setForm((f) => ({ ...f, email: e.target.value }));
                  clearError("email");
                }}
                className={inputClass}
              />
            </Field>
          </div>
        </div>
      </div>

      {/* Referral 1 */}
      <div>
        <SectionHeading label="Referral 1" step="02" />
        <ReferralCard
          data={form.referral1}
          errors={{ name: errors.referral1_name, phone: errors.referral1_phone }}
          onChange={(field, val) => updateReferral("referral1", field, val)}
        />
      </div>

      {/* Referral 2 toggle */}
      <AnimatePresence>
        {showReferral2 ? (
          <motion.div
            key="referral2"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >
            <div className="flex items-center justify-between mb-0">
              <SectionHeading label="Referral 2" step="03" />
              <button
                type="button"
                onClick={() => {
                  setShowReferral2(false);
                  setForm((f) => ({ ...f, referral2: emptyReferral() }));
                  setErrors((e) => ({ ...e, referral2_name: undefined, referral2_phone: undefined }));
                }}
                className="flex items-center gap-1.5 text-xs text-grey-500 hover:text-red-500 transition-colors cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
                Remove
              </button>
            </div>
            <ReferralCard
              data={form.referral2}
              errors={{ name: errors.referral2_name, phone: errors.referral2_phone }}
              onChange={(field, val) => updateReferral("referral2", field, val)}
            />
          </motion.div>
        ) : (
          <motion.button
            key="add-btn"
            type="button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowReferral2(true)}
            className="w-full flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl border-2 border-dashed border-grey-200 text-grey-500 hover:border-purple-400 hover:text-purple-600 transition-all duration-200 text-sm font-medium cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Add Second Referral
          </motion.button>
        )}
      </AnimatePresence>

      {/* Submit */}
      <div className="pt-2 space-y-3">
        <button
          type="submit"
          disabled={submitting}
          className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-purple-500 text-white font-semibold text-sm shadow-lg shadow-purple-600/25 hover:shadow-purple-600/40 hover:from-purple-500 hover:to-purple-400 transition-all duration-300 disabled:opacity-70 cursor-pointer"
        >
          {submitting ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <>
              <CheckCircle2 className="w-4 h-4" />
              Submit Referral
            </>
          )}
        </button>
        <div className="flex items-center justify-center gap-2">
          <Shield className="w-3.5 h-3.5 text-grey-400" />
          <span className="text-xs text-grey-400">
            Your information is secure and never shared
          </span>
        </div>
      </div>
    </form>
  );
}

function SectionHeading({ label, step }: { label: string; step: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="w-7 h-7 rounded-full bg-purple-100 text-purple-600 text-xs font-bold flex items-center justify-center flex-shrink-0">
        {step}
      </span>
      <h3 className="text-sm font-bold text-navy-800 uppercase tracking-wider">
        {label}
      </h3>
      <div className="flex-1 h-px bg-grey-100" />
    </div>
  );
}

function ReferralCard({
  data,
  errors,
  onChange,
}: {
  data: ReferralEntry;
  errors: { name?: string; phone?: string };
  onChange: (field: keyof ReferralEntry, value: string) => void;
}) {
  return (
    <div className="mt-4 p-5 rounded-2xl bg-grey-50 border border-grey-100 space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Referral Name" error={errors.name}>
          <input
            type="text"
            placeholder="Student's full name"
            value={data.name}
            onChange={(e) => onChange("name", e.target.value)}
            className={inputClass}
          />
        </Field>
        <Field label="Contact Number" error={errors.phone}>
          <input
            type="tel"
            placeholder="+91 XXXXX XXXXX"
            value={data.phone}
            onChange={(e) => onChange("phone", e.target.value)}
            className={inputClass}
          />
        </Field>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Country Planning to Study">
          <div className="relative">
            <select
              value={data.country}
              onChange={(e) => onChange("country", e.target.value)}
              className={`${selectClass} ${!data.country ? "text-grey-400" : ""}`}
            >
              <option value="">Select country</option>
              {DESTINATIONS.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
            <Chevron />
          </div>
        </Field>
        <Field label="Loan Amount Required">
          <div className="relative">
            <select
              value={data.loanAmount}
              onChange={(e) => onChange("loanAmount", e.target.value)}
              className={`${selectClass} ${!data.loanAmount ? "text-grey-400" : ""}`}
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
    </div>
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
