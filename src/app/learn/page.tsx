import type { Metadata } from "next";
import { LearningDashboard } from "@/components/learning/learning-dashboard";
import { courseCatalog } from "@/lib/course-catalog";
export const metadata: Metadata = {
  title: "Learning dashboard",
  description: "Your courses, exercises and locally saved learning progress.",
};
export default function LearnPage() {
  return <LearningDashboard courses={courseCatalog} />;
}
