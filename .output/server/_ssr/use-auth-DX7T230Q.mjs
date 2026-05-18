import { u as useQueryClient, a as useQuery } from "../_libs/tanstack__react-query.mjs";
import { g as fetchAPI } from "./router-D2WQTUn2.mjs";
const queryKeys = {
  auth: {
    me: ["auth", "me"]
  }
};
const authService = {
  /**
   * Gets current user information
   */
  getMe: () => fetchAPI("/api/me"),
  /**
   * Logs out (redirects to backend)
   */
  logout: () => {
    window.location.href = `${"http://localhost:8080"}/auth/logout`;
  }
};
function useAuth() {
  const queryClient = useQueryClient();
  const {
    data: user,
    isLoading,
    error,
    isError
  } = useQuery({
    queryKey: queryKeys.auth.me,
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 100));
      return {
        id: "mock-user-123",
        email: "user@example.com",
        name: "Bob Martinez",
        plan: "Pay Per Use",
        accountStartDate: "2026-02-12",
        tokenUsage: {
          inputTokens: 536e4,
          outputTokens: 178e4
        }
      };
    },
    retry: false,
    staleTime: 5 * 60 * 1e3
  });
  const logout = () => {
    queryClient.invalidateQueries({ queryKey: queryKeys.auth.me });
    authService.logout();
  };
  return {
    user,
    isAuthenticated: !!user,
    isLoading,
    isError,
    error,
    logout
  };
}
export {
  useAuth as u
};
