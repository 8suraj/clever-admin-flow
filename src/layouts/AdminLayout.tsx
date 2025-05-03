
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(isMobile);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Auth check
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [navigate]);

  // Handle responsive sidebar
  useEffect(() => {
    setSidebarCollapsed(isMobile && !mobileMenuOpen);
  }, [isMobile, mobileMenuOpen]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="min-h-screen flex bg-admin-background">
      {/* Sidebar - hidden on mobile when collapsed */}
      <div className={cn(
        "transition-all duration-300 ease-in-out fixed md:relative z-20",
        isMobile && !mobileMenuOpen && "hidden"
      )}>
        <Sidebar 
          collapsed={sidebarCollapsed} 
          setCollapsed={setSidebarCollapsed} 
        />
      </div>

      {/* Overlay for mobile menu */}
      {isMobile && mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-10"
          onClick={toggleMobileMenu}
        ></div>
      )}

      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar onMenuClick={toggleMobileMenu} />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className={cn(
            "transition-all",
            sidebarCollapsed ? "ml-0" : "ml-0"
          )}>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
