import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { LayoutGrid } from "lucide-react";

import {
  COMPONENT_LAB_LINKS,
  COMPONENT_LABS_DEFAULT_PATH,
  SECTION_LAB_LINKS,
  SECTION_LABS_DEFAULT_PATH,
} from "@/lib/component-labs";
import { cn } from "@/lib/utils";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const sortedComponents = [...COMPONENT_LAB_LINKS].sort((a, b) => a.label.localeCompare(b.label));
const sortedSections = [...SECTION_LAB_LINKS].sort((a, b) => a.label.localeCompare(b.label));

const isSectionsPath = (pathname: string) => pathname.startsWith("/dev/components/sections");

const ComponentLabsLayout = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const activeTab = isSectionsPath(pathname) ? "sections" : "components";
  const links = activeTab === "sections" ? sortedSections : sortedComponents;

  return (
    <div className="absolute inset-0 flex min-h-0 flex-col overflow-hidden md:flex-row">
      <aside className="flex min-h-0 w-full shrink-0 flex-col overflow-hidden border-b bg-muted/30 max-md:max-h-component-labs-sidebar-mobile md:h-full md:min-h-0 md:max-h-none md:w-56 md:border-b-0 md:border-r">
        <div className="flex shrink-0 flex-col gap-2 border-b px-3 py-3">
          <div className="flex items-center gap-2">
            <LayoutGrid className="h-icon-16 w-icon-16 shrink-0 text-muted-foreground" aria-hidden />
            <span className="text-label font-medium text-foreground">Component labs</span>
          </div>
          <Tabs
            value={activeTab}
            size="sm"
            onValueChange={(value) => {
              if (value === "components") {
                navigate(COMPONENT_LABS_DEFAULT_PATH);
              } else {
                navigate(SECTION_LABS_DEFAULT_PATH);
              }
            }}
          >
            <TabsList className="grid w-full min-w-0 grid-cols-2 gap-0.5">
              <TabsTrigger value="components" className="min-w-0">
                Components
              </TabsTrigger>
              <TabsTrigger value="sections" className="min-w-0">
                Sections
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <nav
          className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden overscroll-contain p-2"
          aria-label={activeTab === "sections" ? "Section labs" : "Component labs"}
        >
          <ul className="flex flex-col gap-0.5">
            {links.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    cn(
                      "block rounded-md px-3 py-2 text-body-sm transition-colors ease-standard",
                      isActive
                        ? "bg-primary/10 font-medium text-primary"
                        : "text-muted-foreground hover:bg-accent hover:text-foreground",
                    )
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      <div className="min-h-0 min-w-0 flex-1 overflow-y-auto">
        <div className="w-full px-4 py-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default ComponentLabsLayout;
