export const instant = false;

import { AcademyFoundationLesson } from "@/components/academy/foundation";
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <AcademyFoundationLesson key={slug} course="discrete" slug={slug} />;
}
