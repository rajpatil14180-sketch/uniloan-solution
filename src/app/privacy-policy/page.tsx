import { Metadata } from "next";
import { SITE } from "@/lib/data";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for Uniloan Solution — how we collect, use, and protect your personal data.",
};

export default function PrivacyPolicyPage() {
  return (
    <section className="pt-32 pb-20 min-h-screen bg-grey-50">
      <div className="container-custom max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-bold text-navy-900 mb-2" style={{ fontFamily: "var(--font-dm-sans)" }}>
          Privacy Policy
        </h1>
        <p className="text-grey-400 text-sm mb-10">Last updated: June 2026</p>

        <div className="prose prose-grey max-w-none space-y-8 text-grey-600 leading-relaxed">

          <div>
            <h2 className="text-xl font-bold text-navy-900 mb-3">1. Who We Are</h2>
            <p>
              Uniloan Solution (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;) is an independent education loan consultancy based in India. We guide students through the process of identifying, applying for, and securing education loans from banks and financial institutions. We are not a bank, NBFC, or direct lending institution. Our contact details: {SITE.email} | {SITE.phone}.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-navy-900 mb-3">2. Information We Collect</h2>
            <p>When you use our website or submit a form, we may collect:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Full name, phone number, and email address</li>
              <li>Academic details (university, course, country of study)</li>
              <li>Financial details (loan amount required, family income, collateral)</li>
              <li>Message content submitted via contact forms</li>
              <li>Referral details you provide about third parties</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-navy-900 mb-3">3. How We Use Your Information</h2>
            <p>We use the information to:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Assess your education loan eligibility and advise on suitable options</li>
              <li>Guide you through the loan application process</li>
              <li>Respond to your enquiries and provide consultancy services</li>
              <li>Send service updates relevant to your application</li>
              <li>Improve our website and services</li>
            </ul>
            <p className="mt-3">We do not sell, rent, or trade your personal data to third parties for marketing purposes.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-navy-900 mb-3">4. Data Sharing</h2>
            <p>We may share your information with:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li><strong>Financial institutions</strong> — banks and NBFCs you choose to apply to, only with your explicit consent and solely for the purpose of processing your loan application</li>
              <li><strong>Service providers</strong> — such as Google (for data storage via Google Sheets) under their respective privacy agreements</li>
              <li><strong>Legal authorities</strong> — if required by applicable law</li>
            </ul>
            <p className="mt-3">We do not have formal tie-ups or referral agreements with any bank or NBFC. Any sharing of your information with a financial institution is done at your direction and with your consent.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-navy-900 mb-3">5. Data Retention</h2>
            <p>
              We retain your data for as long as necessary to provide our services and comply with legal obligations. You may request deletion of your data at any time by contacting us at {SITE.email}.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-navy-900 mb-3">6. Your Rights</h2>
            <p>You have the right to:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Access the personal data we hold about you</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Withdraw consent at any time</li>
            </ul>
            <p className="mt-3">To exercise these rights, contact us at {SITE.email}.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-navy-900 mb-3">7. Cookies</h2>
            <p>
              Our website may use essential cookies to ensure proper functioning. We do not use tracking or advertising cookies. You can disable cookies in your browser settings; however, some features of the site may not function correctly as a result.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-navy-900 mb-3">8. Security</h2>
            <p>
              We implement appropriate technical and organisational measures to protect your personal data against unauthorised access, disclosure, or loss. However, no internet transmission is completely secure and we cannot guarantee absolute security.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-navy-900 mb-3">9. Third-Party Links</h2>
            <p>
              Our website may contain links to third-party websites. We are not responsible for the privacy practices of those sites and encourage you to review their privacy policies.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-navy-900 mb-3">10. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated date. Continued use of our website constitutes acceptance of the updated policy.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-navy-900 mb-3">11. Contact Us</h2>
            <p>
              For any privacy-related queries, contact us at:<br />
              Email: {SITE.email}<br />
              Phone: {SITE.phone}
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
