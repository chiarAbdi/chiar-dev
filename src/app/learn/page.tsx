import type { Metadata } from "next";
import { CatalogPage } from "@/components/academy/academy-pages";
export const metadata: Metadata = { title: "Courses | LearnBlog Academy" };
export default function Page() {
  return <CatalogPage />;
}
