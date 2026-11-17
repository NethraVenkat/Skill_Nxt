import { createStartingCompanyState, type StartingCompanyState } from "@/lib/company-state";

const STORAGE_KEY = "venturecraft:v1";
const STORAGE_VERSION = 1;

export type GuestProgress = {
  version: number;
  learner: {
    name: string;
    ventureIdea: string;
    onboardingAnswers: Record<string, string | number | boolean>;
  };
  lessonProgress: Record<string, number>;
  simulatorState: Record<string, unknown>;
  labResults: Record<string, unknown>;
  reflections: Record<string, string>;
  missionDrafts: Record<string, string>;
  badges: string[];
  streak: number;
  company: StartingCompanyState;
};

const memoryProgress = createDefaultProgress();

function createDefaultProgress(): GuestProgress {
  return {
    version: STORAGE_VERSION,
    learner: {
      name: "Founder",
      ventureIdea: "A faster way for students to find affordable local services.",
      onboardingAnswers: {},
    },
    lessonProgress: {},
    simulatorState: {},
    labResults: {},
    reflections: {},
    missionDrafts: {},
    badges: [],
    streak: 0,
    company: createStartingCompanyState(),
  };
}

function serialize(value: unknown) {
  return JSON.stringify(value, (_key, nestedValue) =>
    typeof nestedValue === "bigint" ? `${nestedValue}n` : nestedValue,
  );
}

function deserialize<T>(value: string): T | null {
  try {
    return JSON.parse(value, (_key, nestedValue) => {
      if (typeof nestedValue === "string" && /^-?\d+n$/.test(nestedValue)) {
        return BigInt(nestedValue.slice(0, -1));
      }
      return nestedValue;
    }) as T;
  } catch {
    return null;
  }
}

function cloneProgress(progress: GuestProgress): GuestProgress {
  return deserialize<GuestProgress>(serialize(progress)) ?? createDefaultProgress();
}

export function readGuestProgress(): GuestProgress {
  if (typeof window === "undefined") {
    return cloneProgress(memoryProgress);
  }

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    const parsed = stored ? deserialize<GuestProgress>(stored) : null;
    if (parsed?.version === STORAGE_VERSION) {
      Object.assign(memoryProgress, parsed);
      return cloneProgress(parsed);
    }
  } catch {
    return cloneProgress(memoryProgress);
  }

  return cloneProgress(memoryProgress);
}

export function writeGuestProgress(progress: GuestProgress): GuestProgress {
  const next = cloneProgress({ ...progress, version: STORAGE_VERSION });
  Object.assign(memoryProgress, next);

  if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem(STORAGE_KEY, serialize(next));
      window.dispatchEvent(new CustomEvent("venturecraft:progress-updated"));
    } catch {
      return cloneProgress(memoryProgress);
    }
  }

  return cloneProgress(next);
}

export function updateGuestProgress(
  updater: (progress: GuestProgress) => GuestProgress,
): GuestProgress {
  return writeGuestProgress(updater(readGuestProgress()));
}

export function resetGuestProgress(): GuestProgress {
  return writeGuestProgress(createDefaultProgress());
}

export function createDefaultGuestProgress(): GuestProgress {
  return createDefaultProgress();
}

export function getGuestProgressStorageKey() {
  return STORAGE_KEY;
}

export function importGuestProgress(value: unknown): GuestProgress | null {
  if (!value || typeof value !== "object") {
    return null;
  }

  const candidate = value as Partial<GuestProgress>;
  if (candidate.version !== STORAGE_VERSION || !candidate.learner) {
    return null;
  }

  return writeGuestProgress({
    ...createDefaultProgress(),
    ...candidate,
    learner: {
      ...createDefaultProgress().learner,
      ...candidate.learner,
    },
  });
}
