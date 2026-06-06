"use client";

import { useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";

interface ServiceLeadFormProps {
  service: string;
}

export function ServiceLeadForm({ service }: ServiceLeadFormProps) {
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "service", service, ...form }),
      });
      if (res.ok) setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
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

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {(["name", "phone", "email"] as const).map((field) => (
        <input
          key={field}
          required
          type={field === "email" ? "email" : field === "phone" ? "tel" : "text"}
          placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
          value={form[field]}
          onChange={(e) => setForm({ ...form, [field]: e.target.value })}
          className="w-full px-4 py-3 rounded-xl border border-grey-200 focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500"
        />
      ))}
      <textarea
        placeholder="Your message (optional)"
        rows={3}
        value={form.message}
        onChange={(e) => setForm({ ...form, message: e.target.value })}
        className="w-full px-4 py-3 rounded-xl border border-grey-200 focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500 resize-none"
      />
      <MagneticButton type="submit" className="w-full">
        {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Get Free Consultation"}
      </MagneticButton>
    </form>
  );
}
