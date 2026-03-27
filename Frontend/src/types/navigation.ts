import { TablerIcon } from "@tabler/icons";

type SidebarRoute = {
  title: string;
  href: string;
  value?: string;
  icon: TablerIcon | React.FC<React.ComponentProps<"svg">>;
  routes?: SidebarRoute[];
};

type SidebarSection = {
  title?: string;
  routes: SidebarRoute[];
};

export type SidebarNavigation = SidebarSection[];

export type Metadata = {
  page: number;
  limit: number;
  total: number;
  count: number;
  hasNext?: boolean;
  hasPrev?: boolean;
};
