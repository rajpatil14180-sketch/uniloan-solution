import { Metadata } from "next";
import { ServicePageTemplate } from "@/components/pages/ServicePageTemplate";
import { LOAN_SERVICES } from "@/lib/data";

export const metadata: Metadata = {
  title: "Study In India Education Loans",
  description:
    "Education loans for premier Indian institutions with competitive rates through public and private sector lenders.",
};

export default function StudyInIndiaLoansPage() {
  return <ServicePageTemplate service={LOAN_SERVICES["study-india"]} />;
}
