"use client";

import { useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";

interface ServiceLeadFormProps {
  service: string;
}

const PHONE_RE = /^[+\d\s\-()]{7,20}$/;

export function ServiceLeadForm({ service }: ServiceLeadFormProps) {
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [honeypot, setHoneypot] = useState("");

  const validate = (): boolean => {
    const next: Record<string, string> = {};
    if (!form.name.trim()) next.name = "Required";
    if (!form.phone.trim()) next.phone = "Required";
    else if (!PHONE_RE.test(form.phone)) next.phone = "Enter a valid phone number";
    if (!form.email.trim()) next.email = "Required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = "Enter a valid email";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

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
        body: JSON.stringify({ type: "service", service, ...form }),
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

  const update = (field: string, value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((e) => {
      const next = { ...e };
      delete next[field];
      return next;
    });
  };

  if (submitted) {
    return (
      <div className="text-center py-12">
        <CheckCircle2 className="w-12 h-12 text-green-600 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-navy-900">Inquiry Submitted</h3>
        <p className="text-grey-500 mt-2">We will contact you shortly.</p>
      </div>
    );
  }

  const fieldClass =
    "w-full px-4 py-3 rounded-xl border border-grey-200 focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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

      <div>
        <input
          type="text"
          placeholder="Full Name"
          value={form.name}
          onChange={(e) => update("name", e.target.value)}
          className={fieldClass}
        />
        {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
      </div>
      <div>
        <input
          type="tel"
          placeholder="Phone Number"
          value={form.phone}
          onChange={(e) => update("phone", e.target.value)}
          className={fieldClass}
        />
        {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
      </div>
      <div>
        <input
          type="email"
          placeholder="Email Address"
          value={form.email}
          onChange={(e) => update("email", e.target.value)}
          className={fieldClass}
        />
        {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
      </div>
      <textarea
        placeholder="Your message (optional)"
        rows={3}
        value={form.message}
        onChange={(e) => update("message", e.target.value)}
        className={`${fieldClass} resize-none`}
      />
      {submitError && <p className="text-sm text-red-500 text-center">{submitError}</p>}
      <MagneticButton type="submit" className="w-full" disabled={submitting}>
        {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Get Free Consultation"}
      </MagneticButton>
    </form>
  );
}
