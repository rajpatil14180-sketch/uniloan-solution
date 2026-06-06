"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";

const STEPS = [
  {
    title: "Personal Details",
    fields: ["name", "phone", "email"] as const,
  },
  {
    title: "Education Details",
    fields: ["country", "university", "course"] as const,
  },
  {
    title: "Financial Details",
    fields: ["loanAmount", "familyIncome", "collateral"] as const,
  },
];

const FIELD_LABELS: Record<string, { label: string; type: string; placeholder: string }> = {
  name: { label: "Full Name", type: "text", placeholder: "Enter your full name" },
  phone: { label: "Phone Number", type: "tel", placeholder: "+91 XXXXX XXXXX" },
  email: { label: "Email Address", type: "email", placeholder: "your@email.com" },
  country: { label: "Destination Country", type: "text", placeholder: "e.g. USA, UK, Italy" },
  university: { label: "University", type: "text", placeholder: "Target university name" },
  course: { label: "Course", type: "text", placeholder: "e.g. MS Computer Science" },
  loanAmount: { label: "Loan Amount Required", type: "text", placeholder: "e.g. ₹40 Lakhs" },
  familyIncome: { label: "Family Annual Income", type: "text", placeholder: "e.g. ₹8 Lakhs" },
  collateral: {
    label: "Collateral Availability",
    type: "select",
    placeholder: "Select option",
  },
};

const COLLATERAL_OPTIONS = [
  "Yes — Property available",
  "Yes — Fixed Deposit available",
  "No — Looking for non-collateral loan",
  "Not sure",
];

interface FormData {
  name: string;
  phone: string;
  email: string;
  country: string;
  university: string;
  course: string;
  loanAmount: string;
  familyIncome: string;
  collateral: string;
}

const initialData: FormData = {
  name: "",
  phone: "",
  email: "",
  country: "",
  university: "",
  course: "",
  loanAmount: "",
  familyIncome: "",
  collateral: "",
};

export function EligibilityForm() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<FormData>(initialData);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validateStep = (stepIndex: number): boolean => {
    const fields = STEPS[stepIndex].fields;
    const newErrors: Partial<FormData> = {};

    fields.forEach((field) => {
      if (!data[field]?.trim()) {
        newErrors[field] = "This field is required";
      }
    });

    if (stepIndex === 0) {
      if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        newErrors.email = "Enter a valid email";
      }
      if (data.phone && !/^[+\d\s-]{10,}$/.test(data.phone)) {
        newErrors.phone = "Enter a valid phone number";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep((s) => Math.min(s + 1, STEPS.length - 1));
    }
  };

  const handleBack = () => setStep((s) => Math.max(s - 1, 0));

  const handleSubmit = async () => {
    if (!validateStep(step)) return;
    setSubmitting(true);

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "eligibility", ...data }),
      });
      if (res.ok) setSubmitted(true);
    } catch {
      setErrors({ name: "Submission failed. Please try again." });
    } finally {
      setSubmitting(false);
    }
  };

  const updateField = (field: keyof FormData, value: string) => {
    setData((d) => ({ ...d, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }));
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-16"
      >
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-navy-900 mb-3">
          Eligibility Check Submitted
        </h3>
        <p className="text-grey-500 max-w-md mx-auto">
          Thank you! Our consultant will review your profile and respond within
          1 to 2 hours with your eligibility assessment.
        </p>
      </motion.div>
    );
  }

  const progress = ((step + 1) / STEPS.length) * 100;

  return (
    <div className="max-w-xl mx-auto">
      <div className="mb-8">
        <div className="flex justify-between text-sm text-grey-500 mb-2">
          <span>
            Step {step + 1} of {STEPS.length}
          </span>
          <span>{STEPS[step].title}</span>
        </div>
        <div className="h-2 bg-grey-200 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-purple-600 to-gold-400 rounded-full"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="space-y-5"
        >
          {STEPS[step].fields.map((field) => {
            const config = FIELD_LABELS[field];
            return (
              <div key={field}>
                <label className="block text-sm font-semibold text-navy-900 mb-2">
                  {config.label}
                </label>
                {config.type === "select" ? (
                  <select
                    value={data[field]}
                    onChange={(e) => updateField(field, e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-grey-200 bg-white text-navy-900 focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500 transition-all"
                  >
                    <option value="">{config.placeholder}</option>
                    {COLLATERAL_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={config.type}
                    value={data[field]}
                    onChange={(e) => updateField(field, e.target.value)}
                    placeholder={config.placeholder}
                    className="w-full px-4 py-3 rounded-xl border border-grey-200 bg-white text-navy-900 placeholder:text-grey-400 focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500 transition-all"
                  />
                )}
                {errors[field] && (
                  <p className="mt-1 text-sm text-red-500">{errors[field]}</p>
                )}
              </div>
            );
          })}
        </motion.div>
      </AnimatePresence>

      <div className="flex justify-between mt-8 gap-4">
        {step > 0 ? (
          <MagneticButton variant="secondary" onClick={handleBack}>
            <ArrowLeft className="w-4 h-4" />
            Back
          </MagneticButton>
        ) : (
          <div />
        )}
        {step < STEPS.length - 1 ? (
          <MagneticButton onClick={handleNext}>
            Next
            <ArrowRight className="w-4 h-4" />
          </MagneticButton>
        ) : (
          <MagneticButton onClick={handleSubmit} type="submit">
            {submitting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                Submit
                <CheckCircle2 className="w-4 h-4" />
              </>
            )}
          </MagneticButton>
        )}
      </div>
    </div>
  );
}
