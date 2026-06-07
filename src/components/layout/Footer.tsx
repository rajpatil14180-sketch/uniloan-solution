import Link from "next/link";
import { Phone, Mail, Clock, MessageCircle } from "lucide-react";
import { BrandLogo } from "./BrandLogo";
import { NAV_LINKS, SITE } from "@/lib/data";

export function Footer() {
  const loanLinks = NAV_LINKS.filter((l) => l.href.includes("loans"));

  return (
    <footer className="bg-navy-950 text-white">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="lg:col-span-1 flex flex-col items-center text-center">
            <BrandLogo size="footer" className="mx-auto mb-5" />
            <p className="text-grey-400 text-sm leading-relaxed mb-6 max-w-xs mx-auto">
              Expert education loan consultancy with 20+ lending partners,
              dedicated consultant support, and specialization in difficult
              profiles.
            </p>
            
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Loan Solutions</h4>
            <ul className="space-y-3">
              {loanLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-grey-400 hover:text-gold-400 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/eligibility"
                  className="text-grey-400 hover:text-gold-400 transition-colors text-sm"
                >
                  Free Eligibility Check
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-3">
              {NAV_LINKS.filter((l) => !l.href.includes("loans") && l.href !== "/").map(
                (link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-grey-400 hover:text-gold-400 transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-gold-400 mt-1 flex-shrink-0" />
                <div className="text-sm text-grey-400">
                  <a href={`tel:${SITE.phone.replace(/\s/g, "")}`} className="hover:text-white transition-colors block">
                    {SITE.phone}
                  </a>
                  <a href={`tel:${SITE.phone2.replace(/\s/g, "")}`} className="hover:text-white transition-colors block">
                    {SITE.phone2}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-gold-400 mt-1 flex-shrink-0" />
                <a
                  href={`mailto:${SITE.email}`}
                  className="text-sm text-grey-400 hover:text-white transition-colors"
                >
                  {SITE.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-gold-400 mt-1 flex-shrink-0" />
                <span className="text-sm text-grey-400">{SITE.hours}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-grey-500 text-sm">
            © {new Date().getFullYear()} Uniloan Solution. All rights reserved.
          </p>
          <p className="text-grey-500 text-xs text-center md:text-right max-w-lg">
            Disclaimer: Uniloan Solution is an independent education loan consultancy and application facilitation platform. We are not a bank, Non-Banking Financial Company (NBFC), or direct lending institution. All product names, logos, and brands displayed on this website are the property of their respective owners. Their inclusion here is solely to indicate the financial institutions whose lending criteria we assist students in navigating.

Uniloan Solution does not directly issue credit or guarantee loan approvals. By submitting your details on this website, you expressly authorize Uniloan Solution and its verified backend distribution ecosystem partners to process, evaluate, and route your profile information to secure optimal loan offers from these supported institutions.Interest rates and terms are indicative. Final approval is determined by respective banks and NBFCs.
          </p>
        </div>
      </div>
    </footer>
  );
}
