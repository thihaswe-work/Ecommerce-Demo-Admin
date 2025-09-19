import { Link } from "react-router-dom";
import { Home, Inbox, Calendar, Search, Settings } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

const items = [
  { title: "Dashboard", url: "/", icon: Home },
  { title: "Users", url: "/users", icon: Inbox },
  { title: "Orders", url: "/orders", icon: Calendar },
  { title: "Products", url: "/products", icon: Search },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarMenu>
            {items.map((item) => (
              <SidebarMenuItem key={item.title}>
                {/* SidebarMenuButton automatically handles collapsed state */}
                <SidebarMenuButton asChild>
                  <Link
                    to={item.url}
                    className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded"
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="sidebar-text">{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>{/* Optional footer content */}</SidebarFooter>
    </Sidebar>
  );
}
