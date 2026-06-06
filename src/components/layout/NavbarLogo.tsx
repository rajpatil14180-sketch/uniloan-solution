"use client";

import Link from "next/link";
import { BrandLogo } from "./BrandLogo";

interface NavbarLogoProps {
  className?: string;
}

export function NavbarLogo({ className = "" }: NavbarLogoProps) {
  return (
    <Link
      href="/"
      aria-label="Uniloan Solution — Home"
      className={`inline-flex items-center flex-shrink-0 transition-opacity duration-200 hover:opacity-90 ${className}`}
    >
      <BrandLogo size="header" />
    </Link>
  );
}
