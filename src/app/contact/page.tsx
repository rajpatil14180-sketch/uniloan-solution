import { Metadata } from "next";
import { ContactForm } from "@/components/forms/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Uniloan Solution. Our education loan experts respond within 1–2 hours. Call, email, or fill in the form.",
};

export default function ContactPage() {
  return <ContactForm />;
}
