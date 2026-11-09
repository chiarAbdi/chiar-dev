import type { Metadata } from "next";
import { courseCatalog } from "@/lib/course-catalog";
import { CoursePage } from "@/components/academy/academy-pages";
export const metadata: Metadata = {
  title: "Discrete Mathematics | LearnBlog Academy",
};
export default function Page() {
  return (
    <CoursePage
      guidedLessonCount={
        courseCatalog.find((course) => course.id === "discrete")!.lessonIds
          .length
      }
    />
  );
}
