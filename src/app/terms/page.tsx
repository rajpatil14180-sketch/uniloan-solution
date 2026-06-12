import { Metadata } from "next";
import { SITE } from "@/lib/data";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of Service for Uniloan Solution — please read before using our website or services.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <section className="pt-32 pb-20 min-h-screen bg-grey-50">
      <div className="container-custom max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-bold text-navy-900 mb-2" style={{ fontFamily: "var(--font-dm-sans)" }}>
          Terms of Service
        </h1>
        <p className="text-grey-400 text-sm mb-10">Last updated: June 2026</p>

        <div className="space-y-8 text-grey-600 leading-relaxed">

          <div>
            <h2 className="text-xl font-bold text-navy-900 mb-3">1. Acceptance of Terms</h2>
            <p>
              By accessing or using the Uniloan Solution website and services, you agree to be bound by these Terms of Service. If you do not agree, please do not use our website or submit any forms.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-navy-900 mb-3">2. Nature of Services</h2>
            <p>
              Uniloan Solution provides education loan consultancy services. We act as an intermediary between students and lending institutions (banks and NBFCs). We do not directly lend money. Loan approval, interest rates, and terms are solely determined by the respective lending institution.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-navy-900 mb-3">3. No Guarantee of Loan Approval</h2>
            <p>
              Submitting an eligibility check or enquiry form does not guarantee loan approval. Approval is subject to the lending institution&apos;s criteria and policies. Uniloan Solution makes no representations or warranties regarding loan approval, interest rates, or terms offered by lenders.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-navy-900 mb-3">4. Service Fees</h2>
            <p>
              Our consultancy fee is 1% of the sanctioned loan amount, payable only after your loan is sanctioned. There are no upfront fees. This fee is separate from any processing fees or charges levied directly by the lending institution. The exact fee will be communicated to you before you agree to proceed.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-navy-900 mb-3">5. Accuracy of Information</h2>
            <p>
              You agree to provide accurate, complete, and truthful information when using our services. Providing false or misleading information may result in rejection by lenders and termination of our services to you. We are not liable for outcomes arising from inaccurate information you provide.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-navy-900 mb-3">6. Referral Programme</h2>
            <p>
              Our referral programme allows you to refer students for a potential reward. Referral rewards are subject to the referred student successfully obtaining a sanctioned loan. Uniloan Solution reserves the right to modify or discontinue the referral programme at any time.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-navy-900 mb-3">7. Intellectual Property</h2>
            <p>
              All content on this website — including text, graphics, logos, and images — is the property of Uniloan Solution and protected under applicable intellectual property laws. You may not reproduce, distribute, or use our content without prior written permission.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-navy-900 mb-3">8. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, Uniloan Solution shall not be liable for any indirect, incidental, or consequential damages arising from your use of our website or services, including but not limited to loan rejection, delays, or financial loss resulting from a lender&apos;s decision.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-navy-900 mb-3">9. Governing Law</h2>
            <p>
              These Terms are governed by the laws of India. Any disputes arising out of these Terms shall be subject to the exclusive jurisdiction of the courts in India.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-navy-900 mb-3">10. Changes to Terms</h2>
            <p>
              We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting. Continued use of our website after changes constitutes your acceptance of the new Terms.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-navy-900 mb-3">11. Contact</h2>
            <p>
              For any questions regarding these Terms, contact us at:<br />
              Email: {SITE.email}<br />
              Phone: {SITE.phone}
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
