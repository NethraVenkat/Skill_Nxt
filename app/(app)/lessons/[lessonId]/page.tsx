import { notFound } from "next/navigation";

import { LessonPlayer } from "@/components/lesson-player";
import { getLessonById } from "@/content/lessons";

export default async function LessonPage({ params }: { params: Promise<{ lessonId: string }> }) {
  const { lessonId } = await params;
  const lesson = getLessonById(lessonId);

  if (!lesson) {
    notFound();
  }

  return <LessonPlayer lesson={lesson} />;
}
