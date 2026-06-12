"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, MessageCircle } from "lucide-react";
import { NAV_LINKS, SITE } from "@/lib/data";
import { MagneticButton } from "@/components/ui/MagneticButton";

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(!isHome);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(!isHome || window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <header
  className="fixed top-0 left-0 right-0 z-50 bg-navy-900/90 backdrop-blur-md shadow-lg"
>
      <div
  className={`container-custom flex items-center justify-between gap-4 h-16 md:h-[4.25rem] ${
    scrolled ? "" : ""
  }`}
>
        <nav className="hidden xl:flex items-center gap-0.5">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="whitespace-nowrap px-2.5 py-2 text-xs font-medium text-white/80 hover:text-white transition-colors rounded-lg hover:bg-white/5"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
          <MagneticButton
            href={`https://wa.me/${SITE.whatsapp}`}
            variant="whatsapp"
            external
            className="!px-4 !py-2.5 !text-sm"
          >
            <MessageCircle className="w-4 h-4" />
            WhatsApp
          </MagneticButton>
          <MagneticButton href="/eligibility" className="!px-5 !py-2.5 !text-sm">
            Check Eligibility
          </MagneticButton>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="xl:hidden p-2 text-white cursor-pointer flex-shrink-0"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="xl:hidden glass bg-navy-900/95 border-t border-white/10"
          >
            <nav className="container-custom py-6 flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-3 text-white/90 hover:text-white hover:bg-white/5 rounded-xl transition-colors font-medium"
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-white/10">
                <MagneticButton href="/eligibility" className="w-full">
                  Check Eligibility
                </MagneticButton>
                <MagneticButton
                  href={`https://wa.me/${SITE.whatsapp}`}
                  variant="whatsapp"
                  external
                  className="w-full"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp
                </MagneticButton>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
