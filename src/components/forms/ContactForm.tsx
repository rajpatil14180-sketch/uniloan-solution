"use client";

import { useState } from "react";
import { Phone, Mail, Clock, MessageCircle, CheckCircle2, Loader2 } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { SITE } from "@/lib/data";

export function ContactForm() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "contact", ...form }),
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        const data = await res.json();
        setError(data.error ?? "Submission failed. Please try again.");
      }
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="pt-32 pb-20 min-h-screen bg-grey-50">
      <div className="container-custom">
        <ScrollReveal className="text-center mb-16">
          <span className="text-purple-600 font-semibold text-sm uppercase tracking-wider">
            Contact
          </span>
          <h1
            className="mt-3 text-3xl md:text-4xl font-bold text-navy-900"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            Get In Touch
          </h1>
          <p className="mt-4 text-grey-500 max-w-xl mx-auto">
            Reach out for a free consultation. We respond promptly and all
            initial assessments are free of charge.
          </p>
        </ScrollReveal>

        <div className="grid lg:grid-cols-5 gap-12 max-w-5xl mx-auto">
          <ScrollReveal className="lg:col-span-2 space-y-6">
            {[
              { icon: Phone, label: "Phone", value: `${SITE.phone}\n${SITE.phone2}` },
              { icon: Mail, label: "Email", value: SITE.email },
              { icon: Clock, label: "Working Hours", value: SITE.hours },
            ].map((item) => (
              <div key={item.label} className="flex items-start gap-4 glass-card rounded-2xl p-6">
                <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center shrink-0">
                  <item.icon className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-navy-900">{item.label}</h3>
                  <p className="text-grey-500 text-sm mt-1 whitespace-pre-line">{item.value}</p>
                </div>
              </div>
            ))}
            <MagneticButton
              href={`https://wa.me/${SITE.whatsapp}`}
              variant="whatsapp"
              external
              className="w-full"
            >
              <MessageCircle className="w-4 h-4" />
              Chat on WhatsApp
            </MagneticButton>
          </ScrollReveal>

          <ScrollReveal className="lg:col-span-3" delay={0.1}>
            <div className="glass-card rounded-3xl p-8">
              {submitted ? (
                <div className="text-center py-12">
                  <CheckCircle2 className="w-12 h-12 text-green-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-navy-900">Message Sent</h3>
                  <p className="text-grey-500 mt-2">We will get back to you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    required
                    placeholder="Full Name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-grey-200 focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500"
                  />
                  <div className="grid md:grid-cols-2 gap-4">
                    <input
                      required
                      type="tel"
                      placeholder="Phone"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-grey-200 focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500"
                    />
                    <input
                      required
                      type="email"
                      placeholder="Email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-grey-200 focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500"
                    />
                  </div>
                  <textarea
                    required
                    placeholder="Your message"
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-grey-200 focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500 resize-none"
                  />
                  {error && <p className="text-red-500 text-sm">{error}</p>}
                  <MagneticButton type="submit" className="w-full">
                    {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Send Message"}
                  </MagneticButton>
                </form>
              )}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
