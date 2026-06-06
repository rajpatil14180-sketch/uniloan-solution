import { Metadata } from "next";
import { ServicePageTemplate } from "@/components/pages/ServicePageTemplate";
import { LOAN_SERVICES } from "@/lib/data";

export const metadata: Metadata = {
  title: "Visa Fund Show Loans",
  description:
    "Specialized loan solutions to fulfill embassy financial capacity requirements for student visa applications.",
};

export default function VisaFundShowLoansPage() {
  return <ServicePageTemplate service={LOAN_SERVICES["visa-fund"]} />;
}
