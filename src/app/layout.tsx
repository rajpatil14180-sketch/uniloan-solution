import type { Metadata } from "next";
import { Inter, DM_Sans } from "next/font/google";
import "./globals.css";
import { SiteLayout } from "@/components/layout/SiteLayout";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://uniloansolution.com"),
  title: {
    default: "Uniloan Solution | Education Loan Consultancy",
    template: "%s | Uniloan Solution",
  },
  description:
    "Premium education loan consultancy with 20+ lending partners. Interest rates from 8.25%, non-collateral loans up to ₹70 lakhs. Free eligibility check.",
  keywords: [
    "education loan",
    "study abroad loan",
    "education loan consultancy",
    "non collateral education loan",
    "visa fund show loan",
  ],
  openGraph: {
    title: "Uniloan Solution | Your Gateway To Study Abroad",
    description:
      "Expert education loan consultancy for difficult profiles. 20+ banks & NBFCs. Free eligibility check.",
    type: "website",
    url: "https://uniloansolution.com",
    siteName: "Uniloan Solution",
    images: [{ url: "/logo-official.png", alt: "Uniloan Solution" }],
  },
  icons: {
    icon: "/logo-official.png",
  },
  verification: {
    google: "-m9Jyh5XvZ9satCNBI5pa3_juBM1z04bGfz1ciX7Sl0",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${dmSans.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased">
        <SiteLayout>{children}</SiteLayout>
      </body>
    </html>
  );
}
