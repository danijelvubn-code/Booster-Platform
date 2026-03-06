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

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isImpersonating: boolean;
  impersonatedTenant: string | null;
  impersonationLogs: ImpersonationLog[];
  login: (email: string, password: string) => void;
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

  const login = (email: string, _password: string) => {
    // Admin users get isAdmin flag (mock: admin@booster.ai is admin)
    const isAdmin = email.toLowerCase().includes("admin");
    setUser({
      email,
      name: isAdmin ? "Admin User" : "Bob Martinez",
      tenant: "The Space Dreams",
      isFirstLogin: !isAdmin,
      isAdmin,
    });
  };

  const logout = () => {
    setUser(null);
    setIsImpersonating(false);
    setImpersonatedTenant(null);
    setOriginalUser(null);
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
