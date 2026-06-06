import { Metadata } from "next";
import { ServicePageTemplate } from "@/components/pages/ServicePageTemplate";
import { LOAN_SERVICES } from "@/lib/data";

export const metadata: Metadata = {
  title: "Study Abroad Education Loans",
  description:
    "Comprehensive education loan solutions for students pursuing higher education at universities worldwide.",
};

export default function StudyAbroadLoansPage() {
  return <ServicePageTemplate service={LOAN_SERVICES["study-abroad"]} />;
}
