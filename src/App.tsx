import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/components/ThemeProvider";

import Login from "./pages/Login";
import LoginMvp from "./pages/mvp/Login";
import MvpFirstTimeUser from "./pages/mvp/FirstTimeUser";
import MvpOverview from "./pages/mvp/Overview";
import MvpCreateEndpoint from "./pages/mvp/CreateEndpoint";
import MvpCreateEndpointAlt from "./pages/mvp/CreateEndpointAlt";
import MvpCosmos from "./pages/mvp/Cosmos";
import MvpModelDetail from "./pages/mvp/ModelDetail";
import MvpModelDetailAlt from "./pages/mvp/ModelDetailAlt";
import MvpModelDetailAlt2 from "./pages/mvp/ModelDetailAlt2";
import MvpGuidedModelSelection from "./pages/mvp/GuidedModelSelection";
import MvpAppLayout from "./components/mvp/MvpAppLayout";
import MvpAuthFlows from "./pages/flows/MvpAuthFlows";
import PostMvpAuthFlows from "./pages/flows/PostMvpAuthFlows";
import EntryChoice from "./pages/EntryChoice";
import FirstTimeUser from "./pages/FirstTimeUser";
import GetStarted from "./pages/GetStarted";
import ResetPasswordRequest from "./pages/ResetPasswordRequest";
import VerifyEmail from "./pages/VerifyEmail";
import AppLayout from "./components/AppLayout";
import Overview from "./pages/Overview";
import Endpoints from "./pages/Endpoints";
import EndpointDetail from "./pages/EndpointDetail";
import EditEndpoint from "./pages/EditEndpoint";
import Cosmos from "./pages/Cosmos";
import ModelDetail from "./pages/ModelDetail";
import DeployWizard from "./pages/DeployWizard";
import CreateEndpoint from "./pages/CreateEndpoint";
import Observe from "./pages/Observe";
import Metrics from "./pages/Metrics";
import Recommendations from "./pages/Recommendations";
import Help from "./pages/Help";
import Account from "./pages/Account";
import Playground from "./pages/Playground";
import DeploymentLogs from "./pages/DeploymentLogs";
import AdminConsole from "./pages/AdminConsole";
import GuidedModelSelection from "./pages/GuidedModelSelection";
import NotFound from "./pages/NotFound";
import { DesignSystemLabsRoute } from "./routes/DesignSystemLabsRoute";
import {
  ROUTER_BASENAME,
  IS_COMBINED_PROTOTYPE,
  IS_MVP_BUILD,
  IS_POST_MVP_BUILD,
  mvpPath,
  postMvpPath,
  mvpAuthRouteSegment,
  postMvpAuthRouteSegment,
} from "@/config/prototype-shell";

const queryClient = new QueryClient();

const AuthGate = () => {
  const { isAuthenticated, track } = useAuth();

  if (!isAuthenticated) {
    return (
      <Routes>
        <Route index element={<EntryChoice />} />
        <Route path="flows/mvp" element={<MvpAuthFlows />} />
        <Route path="flows/post-mvp" element={<PostMvpAuthFlows />} />
        <Route path={mvpAuthRouteSegment("/login")} element={<LoginMvp />} />
        <Route path={mvpAuthRouteSegment("/first-time-user")} element={<MvpFirstTimeUser />} />
        <Route path={mvpAuthRouteSegment("/get-started")} element={<GetStarted />} />
        <Route path={postMvpAuthRouteSegment("/first-time-user")} element={<FirstTimeUser />} />
        <Route path={postMvpAuthRouteSegment("/login")} element={<Login />} />
        <Route path={postMvpAuthRouteSegment("/get-started")} element={<GetStarted />} />
        <Route path={postMvpAuthRouteSegment("/reset-password")} element={<ResetPasswordRequest />} />
        <Route path={postMvpAuthRouteSegment("/verify-email")} element={<VerifyEmail />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    );
  }

  const mvpAppOutletRoutes = (
    <>
      <Route path="overview" element={<MvpOverview />} />
      <Route path="endpoints/new" element={<MvpCreateEndpoint />} />
      <Route path="endpoints/:endpointId/edit" element={<EditEndpoint />} />
      <Route path="endpoints/:endpointId" element={<EndpointDetail />} />
      <Route path="cosmos/:modelId/alt2/endpoints/new" element={<MvpCreateEndpointAlt />} />
      <Route path="cosmos" element={<MvpCosmos />} />
      <Route path="cosmos/guided" element={<MvpGuidedModelSelection />} />
      {/* More specific cosmos detail routes first so `:modelId` never shadows `/alt` or `/alt2`. */}
      <Route path="cosmos/:modelId/alt2" element={<MvpModelDetailAlt2 />} />
      <Route path="cosmos/:modelId/alt" element={<MvpModelDetailAlt />} />
      <Route path="cosmos/:modelId" element={<MvpModelDetail />} />
    </>
  );

  if (track === "mvp") {
    return (
      <Routes>
        <Route index element={<Navigate to={mvpPath("/overview")} replace />} />
        <Route path={mvpAuthRouteSegment("/login")} element={<Navigate to={mvpPath("/overview")} replace />} />
        <Route path={mvpAuthRouteSegment("/get-started")} element={<Navigate to={mvpPath("/overview")} replace />} />
        <Route path={postMvpAuthRouteSegment("/login")} element={<Navigate to={mvpPath("/overview")} replace />} />
        <Route path={postMvpAuthRouteSegment("/verify-email")} element={<Navigate to={mvpPath("/overview")} replace />} />
        {IS_MVP_BUILD ? (
          <Route element={<MvpAppLayout />}>{mvpAppOutletRoutes}</Route>
        ) : (
          <Route path="mvp" element={<MvpAppLayout />}>
            {mvpAppOutletRoutes}
          </Route>
        )}
        <Route path="*" element={<Navigate to={mvpPath("/overview")} replace />} />
      </Routes>
    );
  }

  const postMvpAppOutletRoutes = (
    <>
      <Route path="overview" element={<Overview />} />
      <Route path="endpoints" element={<Endpoints />} />
      <Route path="endpoints/new" element={<CreateEndpoint />} />
      <Route path="endpoints/:endpointId/edit" element={<EditEndpoint />} />
      <Route path="endpoints/:endpointId" element={<EndpointDetail />} />
      <Route path="cosmos" element={<Cosmos />} />
      <Route path="cosmos/guided" element={<GuidedModelSelection />} />
      <Route path="cosmos/:modelId" element={<ModelDetail />} />
      <Route path="deploy" element={<DeployWizard />} />
      <Route path="observe" element={<Observe />} />
      <Route path="metrics" element={<Metrics />} />
      <Route path="recommendations" element={<Recommendations />} />
      <Route path="help" element={<Help />} />
      <Route path="account" element={<Account />} />
      <Route path="playground" element={<Playground />} />
      <Route path="logs" element={<DeploymentLogs />} />
      <Route path="admin" element={<AdminConsole />} />
      <Route path="*" element={<NotFound />} />
    </>
  );

  return (
    <Routes>
      <Route index element={<Navigate to={postMvpPath("/overview")} replace />} />
      <Route path={postMvpAuthRouteSegment("/login")} element={<Navigate to={postMvpPath("/overview")} replace />} />
      <Route path={postMvpAuthRouteSegment("/get-started")} element={<Navigate to={postMvpPath("/overview")} replace />} />
      <Route path={postMvpAuthRouteSegment("/reset-password")} element={<Navigate to={postMvpPath("/overview")} replace />} />
      <Route path={postMvpAuthRouteSegment("/verify-email")} element={<Navigate to={postMvpPath("/overview")} replace />} />
      <Route path="mvp/*" element={<Navigate to={postMvpPath("/overview")} replace />} />
      {IS_COMBINED_PROTOTYPE ? <DesignSystemLabsRoute /> : null}
      {IS_POST_MVP_BUILD ? (
        <Route element={<AppLayout />}>{postMvpAppOutletRoutes}</Route>
      ) : (
        <Route path="post-mvp" element={<AppLayout />}>
          {postMvpAppOutletRoutes}
        </Route>
      )}
    </Routes>
  );
};

const App = () => {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <div className="flex min-h-0 flex-1 flex-col">
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            {/* Two toast hosts: Radix (product default) + Sonner. See docs/Toast-and-Sonner.md */}
            <Toaster />
            <Sonner />
            <AuthProvider>
              <BrowserRouter basename={ROUTER_BASENAME}>
                {/* Flex shell so AppLayout receives a real height from #root → flex-1 chain */}
                <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
                  <AuthGate />
                </div>
              </BrowserRouter>
            </AuthProvider>
          </TooltipProvider>
        </QueryClientProvider>
      </div>
    </ThemeProvider>
  );
};

export default App;