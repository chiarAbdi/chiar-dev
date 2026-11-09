"use client";

import { useSyncExternalStore } from "react";

const changeEvent = "academy-storage-change";

function subscribe(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener(changeEvent, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(changeEvent, onChange);
  };
}

export function useLocalStorage(key: string) {
  const value = useSyncExternalStore(
    subscribe,
    () => {
      try {
        return window.localStorage.getItem(key);
      } catch {
        return null;
      }
    },
    () => null,
  );

  function save(next: string) {
    try {
      window.localStorage.setItem(key, next);
      window.dispatchEvent(new Event(changeEvent));
    } catch {
      // Callers keep their current-session state when storage is unavailable.
    }
  }

  return [value, save] as const;
}
