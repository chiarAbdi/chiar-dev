import type { Metadata } from "next";
import { ContactContent } from "@/components/pages/contact-content";
export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Chiar Abdi about software, IT and technical learning.",
};
export default function ContactPage() {
  return <ContactContent />;
}
