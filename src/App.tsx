import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/components/ThemeProvider";

import Login from "./pages/Login";
import AppLayout from "./components/AppLayout";
import Overview from "./pages/Overview";
import Endpoints from "./pages/Endpoints";
import EndpointDetail from "./pages/EndpointDetail";
import Cosmos from "./pages/Cosmos";
import ModelDetail from "./pages/ModelDetail";
import DeployWizard from "./pages/DeployWizard";
import CreateEndpoint from "./pages/CreateEndpoint";
import EditEndpoint from "./pages/EditEndpoint";
import Observe from "./pages/Observe";
import Recommendations from "./pages/Recommendations";
import Help from "./pages/Help";
import Account from "./pages/Account";
import Playground from "./pages/Playground";
import DeploymentLogs from "./pages/DeploymentLogs";
import AdminConsole from "./pages/AdminConsole";
import GuidedModelSelection from "./pages/GuidedModelSelection";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AuthGate = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) return <Login />;

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/overview" replace />} />
      <Route element={<AppLayout />}>
        <Route path="/overview" element={<Overview />} />
        <Route path="/endpoints" element={<Endpoints />} />
        <Route path="/endpoints/new" element={<CreateEndpoint />} />
        <Route path="/endpoints/:endpointId/edit" element={<EditEndpoint />} />
        <Route path="/endpoints/:endpointId" element={<EndpointDetail />} />
        <Route path="/cosmos" element={<Cosmos />} />
        <Route path="/cosmos/guided" element={<GuidedModelSelection />} />
        <Route path="/cosmos/:modelId" element={<ModelDetail />} />
        <Route path="/deploy" element={<DeployWizard />} />
        <Route path="/observe" element={<Observe />} />
        <Route path="/recommendations" element={<Recommendations />} />
        <Route path="/help" element={<Help />} />
        <Route path="/account" element={<Account />} />
        <Route path="/playground" element={<Playground />} />
        <Route path="/logs" element={<DeploymentLogs />} />
        <Route path="/admin" element={<AdminConsole />} />
        
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <AuthProvider>
            <BrowserRouter>
              <AuthGate />
            </BrowserRouter>
          </AuthProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;