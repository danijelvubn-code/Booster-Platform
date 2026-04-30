import React, { createContext, useContext, useState, ReactNode } from "react";

interface User {
  email: string;
  name: string;
  tenant: string;
  isFirstLogin: boolean;
  isAdmin?: boolean;
}

interface ImpersonationLog {
  action: string;
  tenant: string;
  timestamp: string;
  admin: string;
}

/**
 * Which post-login app shell the user lands in. Set by the screen that calls `login()`.
 * - `"mvp"` → leaner MVP routes (`/mvp/overview`, …)
 * - `"post-mvp"` (default) → current full product routes (`/overview`, …)
 */
export type AppTrack = "mvp" | "post-mvp";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isImpersonating: boolean;
  impersonatedTenant: string | null;
  impersonationLogs: ImpersonationLog[];
  track: AppTrack;
  /** Switch between MVP and post-MVP shells while staying signed in. */
  setAppTrack: (next: AppTrack) => void;
  login: (email: string, password: string, track?: AppTrack) => void;
  logout: () => void;
  dismissOnboarding: () => void;
  startImpersonation: (tenant: string, ownerName: string, ownerEmail: string) => void;
  stopImpersonation: () => void;
  logImpersonationAction: (action: string) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isImpersonating, setIsImpersonating] = useState(false);
  const [impersonatedTenant, setImpersonatedTenant] = useState<string | null>(null);
  const [originalUser, setOriginalUser] = useState<User | null>(null);
  const [impersonationLogs, setImpersonationLogs] = useState<ImpersonationLog[]>([]);
  const [track, setTrack] = useState<AppTrack>("post-mvp");

  const setAppTrack = (next: AppTrack) => {
    setTrack(next);
  };

  const login = (email: string, _password: string, nextTrack: AppTrack = "post-mvp") => {
    const isAdmin = email.toLowerCase().includes("admin");
    setUser({
      email,
      name: isAdmin ? "Admin User" : "Bob Martinez",
      tenant: "The Space Dreams",
      isFirstLogin: !isAdmin,
      isAdmin,
    });
    setTrack(nextTrack);
  };

  const logout = () => {
    setUser(null);
    setIsImpersonating(false);
    setImpersonatedTenant(null);
    setOriginalUser(null);
    setTrack("post-mvp");
  };

  const dismissOnboarding = () => {
    if (user) setUser({ ...user, isFirstLogin: false });
  };

  const startImpersonation = (tenant: string, ownerName: string, ownerEmail: string) => {
    if (!user) return;
    setOriginalUser(user);
    setIsImpersonating(true);
    setImpersonatedTenant(tenant);
    setUser({
      email: ownerEmail,
      name: ownerName,
      tenant,
      isFirstLogin: false,
      isAdmin: false,
    });
    logAction("Session started", tenant);
  };

  const stopImpersonation = () => {
    if (originalUser) {
      logAction("Session ended", impersonatedTenant || "");
      setUser(originalUser);
      setOriginalUser(null);
    }
    setIsImpersonating(false);
    setImpersonatedTenant(null);
  };

  const logAction = (action: string, tenant: string) => {
    setImpersonationLogs((prev) => [
      ...prev,
      { action, tenant, timestamp: new Date().toISOString(), admin: originalUser?.email || user?.email || "" },
    ]);
  };

  const logImpersonationAction = (action: string) => {
    if (isImpersonating && impersonatedTenant) {
      logAction(action, impersonatedTenant);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isImpersonating,
        impersonatedTenant,
        impersonationLogs,
        track,
        setAppTrack,
        login,
        logout,
        dismissOnboarding,
        startImpersonation,
        stopImpersonation,
        logImpersonationAction,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
