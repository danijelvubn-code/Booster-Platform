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
import Cosmos from "./pages/Cosmos";
import ModelDetail from "./pages/ModelDetail";
import DeployWizard from "./pages/DeployWizard";
import CreateEndpoint from "./pages/CreateEndpoint";
import EditEndpoint from "./pages/EditEndpoint";
import Observe from "./pages/Observe";
import Metrics from "./pages/Metrics";
import Recommendations from "./pages/Recommendations";
import Help from "./pages/Help";
import Account from "./pages/Account";
import Playground from "./pages/Playground";
import DeploymentLogs from "./pages/DeploymentLogs";
import AdminConsole from "./pages/AdminConsole";
import GuidedModelSelection from "./pages/GuidedModelSelection";
import ComponentButtonsLab from "./pages/ComponentButtonsLab";
import ComponentAlertDialogLab from "./pages/ComponentAlertDialogLab";
import ComponentAlertsLab from "./pages/ComponentAlertsLab";
import ComponentAccordionLab from "./pages/ComponentAccordionLab";
import ComponentAspectRatioLab from "./pages/ComponentAspectRatioLab";
import ComponentAvatarsLab from "./pages/ComponentAvatarsLab";
import ComponentBadgesLab from "./pages/ComponentBadgesLab";
import ComponentBreadcrumbsLab from "./pages/ComponentBreadcrumbsLab";
import ComponentCalendarLab from "./pages/ComponentCalendarLab";
import ComponentCardsLab from "./pages/ComponentCardsLab";
import ComponentCarouselLab from "./pages/ComponentCarouselLab";
import ComponentCheckboxLab from "./pages/ComponentCheckboxLab";
import ComponentCollapsibleLab from "./pages/ComponentCollapsibleLab";
import ComponentCommandLab from "./pages/ComponentCommandLab";
import ComponentContextMenuLab from "./pages/ComponentContextMenuLab";
import ComponentDialogLab from "./pages/ComponentDialogLab";
import ComponentDropdownMenuLab from "./pages/ComponentDropdownMenuLab";
import ComponentDrawerLab from "./pages/ComponentDrawerLab";
import ComponentHoverCardLab from "./pages/ComponentHoverCardLab";
import ComponentInputLab from "./pages/ComponentInputLab";
import ComponentInputOtpLab from "./pages/ComponentInputOtpLab";
import ComponentLineChartLab from "./pages/ComponentLineChartLab";
import ComponentMenubarLab from "./pages/ComponentMenubarLab";
import ComponentPaginationLab from "./pages/ComponentPaginationLab";
import ComponentPopoverLab from "./pages/ComponentPopoverLab";
import ComponentProgressLab from "./pages/ComponentProgressLab";
import ComponentRadioGroupLab from "./pages/ComponentRadioGroupLab";
import ComponentResizableLab from "./pages/ComponentResizableLab";
import ComponentScrollAreaLab from "./pages/ComponentScrollAreaLab";
import ComponentSelectLab from "./pages/ComponentSelectLab";
import ComponentSeparatorLab from "./pages/ComponentSeparatorLab";
import ComponentSheetLab from "./pages/ComponentSheetLab";
import ComponentSidebarLab from "./pages/ComponentSidebarLab";
import ComponentSkeletonLab from "./pages/ComponentSkeletonLab";
import ComponentSliderLab from "./pages/ComponentSliderLab";
import ComponentSonnerLab from "./pages/ComponentSonnerLab";
import ComponentSwitchLab from "./pages/ComponentSwitchLab";
import ComponentTableLab from "./pages/ComponentTableLab";
import ComponentTabsLab from "./pages/ComponentTabsLab";
import ComponentTextareaLab from "./pages/ComponentTextareaLab";
import ComponentTooltipLab from "./pages/ComponentTooltipLab";
import ComponentToggleLab from "./pages/ComponentToggleLab";
import ComponentToggleGroupLab from "./pages/ComponentToggleGroupLab";
import ComponentToastLab from "./pages/ComponentToastLab";
import ComponentToasterLab from "./pages/ComponentToasterLab";
import ComponentMetricsLab from "./pages/ComponentMetricsLab";
import ComponentModelCardLab from "./pages/ComponentModelCardLab";
import ComponentEndpointCardLab from "./pages/ComponentEndpointCardLab";
import ComponentEnergyScoreLab from "./pages/ComponentEnergyScoreLab";
import ComponentAppHeaderLab from "./pages/ComponentAppHeaderLab";
import ComponentShadowsLab from "./pages/ComponentShadowsLab";
import ComponentStepperLab from "./pages/ComponentStepperLab";
import NotFound from "./pages/NotFound";
import ComponentLabsLayout from "./components/ComponentLabsLayout";
import { COMPONENT_LABS_DEFAULT_PATH, SECTION_LABS_DEFAULT_PATH } from "./lib/component-labs";

const queryClient = new QueryClient();

const AuthGate = () => {
  const { isAuthenticated, track } = useAuth();

  if (!isAuthenticated) {
    return (
      <Routes>
        <Route path="/" element={<EntryChoice />} />
        <Route path="/flows/mvp" element={<MvpAuthFlows />} />
        <Route path="/flows/post-mvp" element={<PostMvpAuthFlows />} />
        <Route path="/mvp/login" element={<LoginMvp />} />
        <Route path="/mvp/first-time-user" element={<MvpFirstTimeUser />} />
        <Route path="/mvp/get-started" element={<GetStarted />} />
        <Route path="/first-time-user" element={<FirstTimeUser />} />
        <Route path="/login" element={<Login />} />
        <Route path="/get-started" element={<GetStarted />} />
        <Route path="/reset-password" element={<ResetPasswordRequest />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    );
  }

  if (track === "mvp") {
    return (
      <Routes>
        <Route path="/" element={<Navigate to="/mvp/overview" replace />} />
        <Route path="/mvp/login" element={<Navigate to="/mvp/overview" replace />} />
        <Route path="/mvp/get-started" element={<Navigate to="/mvp/overview" replace />} />
        <Route path="/login" element={<Navigate to="/mvp/overview" replace />} />
        <Route path="/verify-email" element={<Navigate to="/mvp/overview" replace />} />
        <Route element={<MvpAppLayout />}>
          <Route path="/mvp/overview" element={<MvpOverview />} />
          <Route path="/mvp/endpoints/new" element={<MvpCreateEndpoint />} />
          <Route path="/mvp/cosmos/:modelId/alt2/endpoints/new" element={<MvpCreateEndpointAlt />} />
          <Route path="/mvp/cosmos" element={<MvpCosmos />} />
          <Route path="/mvp/cosmos/guided" element={<MvpGuidedModelSelection />} />
          {/* More specific cosmos detail routes first so `:modelId` never shadows `/alt` or `/alt2`. */}
          <Route path="/mvp/cosmos/:modelId/alt2" element={<MvpModelDetailAlt2 />} />
          <Route path="/mvp/cosmos/:modelId/alt" element={<MvpModelDetailAlt />} />
          <Route path="/mvp/cosmos/:modelId" element={<MvpModelDetail />} />
        </Route>
        <Route path="*" element={<Navigate to="/mvp/overview" replace />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/overview" replace />} />
      <Route path="/login" element={<Navigate to="/overview" replace />} />
      <Route path="/get-started" element={<Navigate to="/overview" replace />} />
      <Route path="/reset-password" element={<Navigate to="/overview" replace />} />
      <Route path="/verify-email" element={<Navigate to="/overview" replace />} />
      <Route path="/mvp/*" element={<Navigate to="/overview" replace />} />
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
        <Route path="/metrics" element={<Metrics />} />
        <Route path="/recommendations" element={<Recommendations />} />
        <Route path="/help" element={<Help />} />
        <Route path="/account" element={<Account />} />
        <Route path="/playground" element={<Playground />} />
        <Route path="/logs" element={<DeploymentLogs />} />
        <Route path="/admin" element={<AdminConsole />} />
        <Route path="/dev/components" element={<ComponentLabsLayout />}>
          <Route index element={<Navigate to={COMPONENT_LABS_DEFAULT_PATH} replace />} />
          <Route path="sections" element={<Navigate to={SECTION_LABS_DEFAULT_PATH} replace />} />
          <Route path="sections/app-header" element={<ComponentAppHeaderLab />} />
          <Route path="sections/metrics" element={<ComponentMetricsLab />} />
          <Route path="sections/energy-score" element={<ComponentEnergyScoreLab />} />
          <Route path="sections/endpoint-card" element={<ComponentEndpointCardLab />} />
          <Route path="sections/model-card" element={<ComponentModelCardLab />} />
          <Route path="sections/shadows" element={<ComponentShadowsLab />} />
          <Route path="sections/stepper" element={<ComponentStepperLab />} />
          <Route path="buttons" element={<ComponentButtonsLab />} />
          <Route path="alert-dialog" element={<ComponentAlertDialogLab />} />
          <Route path="alerts" element={<ComponentAlertsLab />} />
          <Route path="accordion" element={<ComponentAccordionLab />} />
          <Route path="aspect-ratio" element={<ComponentAspectRatioLab />} />
          <Route path="avatars" element={<ComponentAvatarsLab />} />
          <Route path="badges" element={<ComponentBadgesLab />} />
          <Route path="breadcrumbs" element={<ComponentBreadcrumbsLab />} />
          <Route path="calendar" element={<ComponentCalendarLab />} />
          <Route path="cards" element={<ComponentCardsLab />} />
          <Route path="carousel" element={<ComponentCarouselLab />} />
          <Route path="checkbox" element={<ComponentCheckboxLab />} />
          <Route path="collapsible" element={<ComponentCollapsibleLab />} />
          <Route path="command" element={<ComponentCommandLab />} />
          <Route path="context-menu" element={<ComponentContextMenuLab />} />
          <Route path="dialog" element={<ComponentDialogLab />} />
          <Route path="dropdown-menu" element={<ComponentDropdownMenuLab />} />
          <Route path="drawer" element={<ComponentDrawerLab />} />
          <Route path="hover-card" element={<ComponentHoverCardLab />} />
          <Route path="input" element={<ComponentInputLab />} />
          <Route path="input-otp" element={<ComponentInputOtpLab />} />
          <Route path="line-chart" element={<ComponentLineChartLab />} />
          <Route path="menubar" element={<ComponentMenubarLab />} />
          <Route path="pagination" element={<ComponentPaginationLab />} />
          <Route path="popover" element={<ComponentPopoverLab />} />
          <Route path="progress" element={<ComponentProgressLab />} />
          <Route path="radio-group" element={<ComponentRadioGroupLab />} />
          <Route path="resizable" element={<ComponentResizableLab />} />
          <Route path="scroll-area" element={<ComponentScrollAreaLab />} />
          <Route path="select" element={<ComponentSelectLab />} />
          <Route path="separator" element={<ComponentSeparatorLab />} />
          <Route path="sheet" element={<ComponentSheetLab />} />
          <Route path="sidebar" element={<ComponentSidebarLab />} />
          <Route path="skeleton" element={<ComponentSkeletonLab />} />
          <Route path="slider" element={<ComponentSliderLab />} />
          <Route path="sonner" element={<ComponentSonnerLab />} />
          <Route path="switch" element={<ComponentSwitchLab />} />
          <Route path="table" element={<ComponentTableLab />} />
          <Route path="tabs" element={<ComponentTabsLab />} />
          <Route path="textarea" element={<ComponentTextareaLab />} />
          <Route path="tooltip" element={<ComponentTooltipLab />} />
          <Route path="toggle" element={<ComponentToggleLab />} />
          <Route path="toggle-group" element={<ComponentToggleGroupLab />} />
          <Route path="toast" element={<ComponentToastLab />} />
          <Route path="toaster" element={<ComponentToasterLab />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
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
              <BrowserRouter>
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