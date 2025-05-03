
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { LayoutDashboard, Users, Settings, ChevronLeft, ChevronRight, LogOut } from "lucide-react";

type SidebarProps = {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
};

const Sidebar = ({ collapsed, setCollapsed }: SidebarProps) => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navigationItems = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      href: "/dashboard",
    },
    {
      title: "Users",
      icon: Users,
      href: "/users",
    },
    {
      title: "Settings",
      icon: Settings,
      href: "/settings",
    },
  ];

  return (
    <div
      className={cn(
        "border-r border-admin-border bg-sidebar h-screen relative transition-all duration-300 ease-in-out",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex h-16 items-center border-b border-admin-border px-4">
        {!collapsed && (
          <Link to="/dashboard" className="font-semibold text-lg text-admin-primary flex items-center">
            Admin<span className="text-admin-accent ml-1">Pro</span>
          </Link>
        )}
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "absolute top-3 -right-3 h-6 w-6 rounded-full border border-admin-border bg-background shadow-sm",
            collapsed && "rotate-180"
          )}
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <ChevronRight className="h-3 w-3" /> : <ChevronLeft className="h-3 w-3" />}
          <span className="sr-only">Toggle Sidebar</span>
        </Button>
      </div>
      <ScrollArea className="h-[calc(100vh-64px)] px-2">
        <div className="py-4 space-y-1">
          {navigationItems.map((item) => (
            <Link
              key={item.title}
              to={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 transition-all hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                isActive(item.href) && "bg-sidebar-accent text-sidebar-primary font-medium",
                collapsed && "justify-center px-0 py-2"
              )}
            >
              <item.icon className={cn("h-5 w-5", collapsed && "h-5 w-5")} />
              {!collapsed && <span>{item.title}</span>}
            </Link>
          ))}
        </div>
        
        <div className={cn(
          "absolute bottom-4 left-0 right-0 px-2",
        )}>
          <Link
            to="/login"
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-red-500 hover:bg-red-50",
              collapsed && "justify-center px-0 py-2"
            )}
            onClick={() => {
              localStorage.removeItem("isLoggedIn");
            }}
          >
            <LogOut className={cn("h-5 w-5", collapsed && "h-5 w-5")} />
            {!collapsed && <span>Logout</span>}
          </Link>
        </div>
      </ScrollArea>
    </div>
  );
};

export default Sidebar;
