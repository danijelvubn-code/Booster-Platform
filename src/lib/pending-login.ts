const STORAGE_KEY = "booster.pendingLogin";

export type PendingLogin = {
  email: string;
  password: string;
};

export function setPendingLogin(email: string, password: string): void {
  const payload: PendingLogin = { email, password };
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
}

export function getPendingLogin(): PendingLogin | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as PendingLogin;
    if (typeof parsed?.email === "string" && typeof parsed?.password === "string") {
      return parsed;
    }
    return null;
  } catch {
    return null;
  }
}

export function clearPendingLogin(): void {
  sessionStorage.removeItem(STORAGE_KEY);
}
