import type { Metadata } from "next";
import { AboutContent } from "@/components/about/about-content";
export const metadata: Metadata = {
  title: "About Chiar Abdi",
  description:
    "Chiar Abdi: building web applications, creating visual learning resources and exploring computer science.",
};
export default function AboutPage() {
  return <AboutContent />;
}
