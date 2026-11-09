import type { Metadata } from "next";
import { LogicLessonPage } from "@/components/academy/academy-pages";
export const metadata: Metadata = {
  title: "Propositional Logic | LearnBlog Academy",
};
export default function Page() {
  return <LogicLessonPage />;
}
