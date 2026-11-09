import type { Metadata } from "next";
import { ExtraLessonPage } from "@/components/academy/extra-lessons";
export const metadata: Metadata = { title: "Equivalences | LearnBlog Academy" };
export default function Page() {
  return <ExtraLessonPage slug="equivalences" />;
}
