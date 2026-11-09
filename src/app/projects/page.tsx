import type { Metadata } from "next";
import { ProjectsPageContent } from "@/components/pages/projects-content";
export const metadata: Metadata = {
  title: "Projects",
  description:
    "Applications, learning tools and technical experiments by Chiar Abdi.",
};
export default function ProjectsPage() {
  return <ProjectsPageContent />;
}
