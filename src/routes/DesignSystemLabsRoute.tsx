import { Navigate, Route } from "react-router-dom";

import ComponentLabsLayout from "@/components/ComponentLabsLayout";
import { COMPONENT_LABS_DEFAULT_PATH, SECTION_LABS_DEFAULT_PATH } from "@/lib/component-labs";
import ComponentButtonsLab from "@/pages/ComponentButtonsLab";
import ComponentAlertDialogLab from "@/pages/ComponentAlertDialogLab";
import ComponentAlertsLab from "@/pages/ComponentAlertsLab";
import ComponentAccordionLab from "@/pages/ComponentAccordionLab";
import ComponentAspectRatioLab from "@/pages/ComponentAspectRatioLab";
import ComponentAvatarsLab from "@/pages/ComponentAvatarsLab";
import ComponentBadgesLab from "@/pages/ComponentBadgesLab";
import ComponentBreadcrumbsLab from "@/pages/ComponentBreadcrumbsLab";
import ComponentCalendarLab from "@/pages/ComponentCalendarLab";
import ComponentCardsLab from "@/pages/ComponentCardsLab";
import ComponentCarouselLab from "@/pages/ComponentCarouselLab";
import ComponentCheckboxLab from "@/pages/ComponentCheckboxLab";
import ComponentCollapsibleLab from "@/pages/ComponentCollapsibleLab";
import ComponentCommandLab from "@/pages/ComponentCommandLab";
import ComponentContextMenuLab from "@/pages/ComponentContextMenuLab";
import ComponentDialogLab from "@/pages/ComponentDialogLab";
import ComponentDropdownMenuLab from "@/pages/ComponentDropdownMenuLab";
import ComponentDrawerLab from "@/pages/ComponentDrawerLab";
import ComponentHoverCardLab from "@/pages/ComponentHoverCardLab";
import ComponentInputLab from "@/pages/ComponentInputLab";
import ComponentInputOtpLab from "@/pages/ComponentInputOtpLab";
import ComponentLineChartLab from "@/pages/ComponentLineChartLab";
import ComponentMenubarLab from "@/pages/ComponentMenubarLab";
import ComponentPaginationLab from "@/pages/ComponentPaginationLab";
import ComponentPopoverLab from "@/pages/ComponentPopoverLab";
import ComponentProgressLab from "@/pages/ComponentProgressLab";
import ComponentRadioGroupLab from "@/pages/ComponentRadioGroupLab";
import ComponentResizableLab from "@/pages/ComponentResizableLab";
import ComponentScrollAreaLab from "@/pages/ComponentScrollAreaLab";
import ComponentSelectLab from "@/pages/ComponentSelectLab";
import ComponentSeparatorLab from "@/pages/ComponentSeparatorLab";
import ComponentSheetLab from "@/pages/ComponentSheetLab";
import ComponentSidebarLab from "@/pages/ComponentSidebarLab";
import ComponentSkeletonLab from "@/pages/ComponentSkeletonLab";
import ComponentSliderLab from "@/pages/ComponentSliderLab";
import ComponentSonnerLab from "@/pages/ComponentSonnerLab";
import ComponentSwitchLab from "@/pages/ComponentSwitchLab";
import ComponentTableLab from "@/pages/ComponentTableLab";
import ComponentTabsLab from "@/pages/ComponentTabsLab";
import ComponentTextareaLab from "@/pages/ComponentTextareaLab";
import ComponentTooltipLab from "@/pages/ComponentTooltipLab";
import ComponentToggleLab from "@/pages/ComponentToggleLab";
import ComponentToggleGroupLab from "@/pages/ComponentToggleGroupLab";
import ComponentToastLab from "@/pages/ComponentToastLab";
import ComponentToasterLab from "@/pages/ComponentToasterLab";
import ComponentMetricsLab from "@/pages/ComponentMetricsLab";
import ComponentModelCardLab from "@/pages/ComponentModelCardLab";
import ComponentEndpointCardLab from "@/pages/ComponentEndpointCardLab";
import ComponentEnergyScoreLab from "@/pages/ComponentEnergyScoreLab";
import ComponentAppHeaderLab from "@/pages/ComponentAppHeaderLab";
import ComponentShadowsLab from "@/pages/ComponentShadowsLab";
import ComponentStepperLab from "@/pages/ComponentStepperLab";

/**
 * Component labs live under the design-system URL branch (combined prototype / dev only).
 * Not registered for MVP or post-MVP production artifacts.
 */
export function DesignSystemLabsRoute() {
  return (
    <Route path="design-system/dev/components" element={<ComponentLabsLayout />}>
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
  );
}
