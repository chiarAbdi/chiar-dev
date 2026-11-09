import { AcademyFoundationLesson } from "@/components/academy/foundation";

export const instant = false;

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return <AcademyFoundationLesson key={slug} course="zero" slug={slug} />;
}
