"use client";

import { useSyncExternalStore } from "react";

import { createDefaultGuestProgress, getGuestProgressStorageKey, readGuestProgress, type GuestProgress } from "@/lib/guest-progress";

/*
  Reads the learner's saved progress (stored on this device) and re-renders
  whenever it changes. The server always sees the default progress; the browser
  switches to the real saved progress right after the page loads.
*/

let cachedRaw: string | null | undefined;
let cachedValue: GuestProgress | null = null;
// Must match what the server rendered, so it is always the default progress.
const serverValue = createDefaultGuestProgress();

function readRaw(): string | null {
  try {
    return window.localStorage.getItem(getGuestProgressStorageKey());
  } catch {
    return null;
  }
}

function getSnapshot(): GuestProgress {
  const raw = readRaw();
  if (raw !== cachedRaw || !cachedValue) {
    cachedRaw = raw;
    cachedValue = readGuestProgress();
  }
  return cachedValue;
}

function getServerSnapshot(): GuestProgress {
  return serverValue;
}

function subscribe(onChange: () => void) {
  const handler = () => {
    cachedRaw = undefined;
    onChange();
  };
  window.addEventListener("venturecraft:progress-updated", handler);
  window.addEventListener("storage", handler);
  return () => {
    window.removeEventListener("venturecraft:progress-updated", handler);
    window.removeEventListener("storage", handler);
  };
}

export function useGuestProgress(): GuestProgress {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/** true once we are running in the browser (after hydration). */
export function useIsClient(): boolean {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

/** true if this device already has saved VentureCraft progress. */
export function useHasSavedProgress(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => readRaw() !== null,
    () => false,
  );
}
