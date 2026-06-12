"use client";

import { useRef, ReactNode, MouseEvent } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

interface MagneticButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline" | "whatsapp";
  className?: string;
  type?: "button" | "submit";
  external?: boolean;
  disabled?: boolean;
}

const variants = {
  primary:
    "bg-gradient-to-r from-purple-600 to-purple-500 text-white shadow-lg shadow-purple-600/25 hover:shadow-purple-600/40 hover:from-purple-500 hover:to-purple-400",
  secondary:
    "bg-navy-800 text-white hover:bg-navy-700 shadow-lg shadow-navy-900/20",
  outline:
    "border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm",
  whatsapp:
    "bg-[#25D366] text-white hover:bg-[#20BD5A] shadow-lg shadow-[#25D366]/25",
};

export function MagneticButton({
  children,
  href,
  onClick,
  variant = "primary",
  className = "",
  type = "button",
  external = false,
  disabled = false,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent) => {
    if (disabled) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
  };

  const handleMouseLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "translate(0, 0)";
  };

  const baseClass = `inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${variants[variant]} ${disabled ? "opacity-60 cursor-not-allowed" : ""} ${className}`;

  const content = (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileTap={disabled ? {} : { scale: 0.97 }}
      className={baseClass}
    >
      {children}
    </motion.div>
  );

  if (href && !disabled) {
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer">
          {content}
        </a>
      );
    }
    return <Link href={href}>{content}</Link>;
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="border-0 bg-transparent p-0 cursor-pointer disabled:cursor-not-allowed"
    >
      {content}
    </button>
  );
}
