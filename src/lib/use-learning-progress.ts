"use client";

import { useState } from "react";
import { useLocalStorage } from "./use-local-storage";

export const learningProgressKey = "academy-learning-progress-v1";

export function readCompletedLessons(raw: string | null): string[] {
  try {
    const value = JSON.parse(raw ?? "{}");
    return Array.isArray(value?.completed)
      ? [
          ...new Set<string>(
            value.completed.filter(
              (id: unknown): id is string =>
                typeof id === "string" &&
                /^(zero|discrete):[a-z0-9-]+$/.test(id),
            ),
          ),
        ]
      : [];
  } catch {
    return [];
  }
}

export function readIctProgress(raw: string | null, count: number) {
  try {
    const value = JSON.parse(raw ?? "{}");
    return Array.isArray(value?.done)
      ? [
          ...new Set<number>(
            value.done.filter(
              (index: unknown): index is number =>
                typeof index === "number" &&
                Number.isInteger(index) &&
                index >= 0 &&
                index < count,
            ),
          ),
        ]
      : [];
  } catch {
    return [];
  }
}

export function useLearningProgress() {
  const [raw, save] = useLocalStorage(learningProgressKey);
  const [session, setSession] = useState<string[] | null>(null);
  const completed = session ?? readCompletedLessons(raw);
  function completeLesson(id: string) {
    const next = [...new Set([...completed, id])];
    setSession(next);
    save(JSON.stringify({ completed: next }));
  }
  return { completed, completeLesson };
}
