import type { Metadata } from "next";
import { LearnBlogContent } from "@/components/learning/learnblog-content";
import { courseCatalog } from "@/lib/course-catalog";
export const metadata: Metadata = {
  title: "LearnBlog",
  description:
    "Interactive explanations, visual lessons and learning paths for mathematics, computer science and IT.",
};
export default function BlogPage() {
  return <LearnBlogContent courses={courseCatalog} />;
}
