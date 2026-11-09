import type { Metadata } from "next";
import { CoursePage } from "@/components/academy/academy-pages";
export const metadata: Metadata = {
  title: "Discrete Mathematics | LearnBlog Academy",
};
export default function Page() {
  return <CoursePage />;
}
