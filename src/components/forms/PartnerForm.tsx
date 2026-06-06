"use client";

import { useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";

const ORG_TYPES = [
  "Study Abroad Consultant",
  "Education Counsellor",
  "Education Agency",
  "School",
  "University",
  "Other",
];

export function PartnerForm() {
  const [form, setForm] = useState({
    organizationName: "",
    contactName: "",
    phone: "",
    email: "",
    organizationType: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "partner", ...form }),
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
        <h3 className="text-xl font-bold text-navy-900">Partnership Inquiry Received</h3>
        <p className="text-grey-500 mt-2">Our partnerships team will reach out within 24 hours.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <input
          required
          placeholder="Organization Name"
          value={form.organizationName}
          onChange={(e) => setForm({ ...form, organizationName: e.target.value })}
          className="w-full px-4 py-3 rounded-xl border border-grey-200 focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500"
        />
        <input
          required
          placeholder="Contact Person Name"
          value={form.contactName}
          onChange={(e) => setForm({ ...form, contactName: e.target.value })}
          className="w-full px-4 py-3 rounded-xl border border-grey-200 focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500"
        />
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <input
          required
          type="tel"
          placeholder="Phone Number"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          className="w-full px-4 py-3 rounded-xl border border-grey-200 focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500"
        />
        <input
          required
          type="email"
          placeholder="Email Address"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full px-4 py-3 rounded-xl border border-grey-200 focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500"
        />
      </div>
      <select
        required
        value={form.organizationType}
        onChange={(e) => setForm({ ...form, organizationType: e.target.value })}
        className="w-full px-4 py-3 rounded-xl border border-grey-200 focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500"
      >
        <option value="">Organization Type</option>
        {ORG_TYPES.map((t) => (
          <option key={t} value={t}>{t}</option>
        ))}
      </select>
      <textarea
        placeholder="Tell us about your organization and partnership goals"
        rows={4}
        value={form.message}
        onChange={(e) => setForm({ ...form, message: e.target.value })}
        className="w-full px-4 py-3 rounded-xl border border-grey-200 focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500 resize-none"
      />
      <MagneticButton type="submit" className="w-full">
        {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Submit Partnership Inquiry"}
      </MagneticButton>
    </form>
  );
}
