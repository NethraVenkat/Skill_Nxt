import { cookies } from "next/headers";

export type SessionUser = {
  email: string;
  name: string;
  isAuthenticated: boolean;
};

export const AUTH_COOKIE = "venturecraft_session";

export async function readSession(): Promise<SessionUser | null> {
  const cookieStore = await cookies();
  const raw = cookieStore.get(AUTH_COOKIE)?.value;

  if (!raw) {
    return null;
  }

  try {
    const parsed = JSON.parse(raw) as SessionUser;
    if (!parsed.email || !parsed.name) {
      return null;
    }
    return { ...parsed, isAuthenticated: true };
  } catch {
    return null;
  }
}

export async function writeSession(user: { email: string; name: string }) {
  const cookieStore = await cookies();
  cookieStore.set(AUTH_COOKIE, JSON.stringify({ ...user, isAuthenticated: true }), {
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function clearSession() {
  const cookieStore = await cookies();
  cookieStore.delete(AUTH_COOKIE);
}
