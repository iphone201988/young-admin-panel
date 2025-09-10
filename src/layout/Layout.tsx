import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Navigate, Outlet, useLocation } from "react-router";

const pageConfig = {
  "/": { title: "Dashboard", subtitle: "Overview of your admin panel" },
  "/users": {
    title: "User Management",
    subtitle: "Manage users, verification, and compliance",
  },
  "/complaints": {
    title: "Complaints",
    subtitle: "Handle user reports and compliance issues",
  },
  "/posts": {
    title: "Posts",
    subtitle: "Manage user posts and content moderation",
  },
  "/ads": {
    title: "Ad Approval",
    subtitle: "Review and approve advertisement submissions",
  },
  "/messaging": {
    title: "Messaging",
    subtitle: "Send messages to users individually or in bulk",
  },
  "/settings": {
    title: "Settings",
    subtitle: "Change your password",
  },
};

export default function Layout() {
  const token = sessionStorage.getItem("token");
  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const location = useLocation();

  const currentPage =
    pageConfig[location.pathname as keyof typeof pageConfig] || pageConfig["/"];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setSidebarCollapsed(true);
      } else {
        setSidebarCollapsed(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar collapsed={sidebarCollapsed} onToggle={toggleSidebar} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          title={currentPage.title}
          subtitle={currentPage.subtitle}
          onMenuClick={toggleSidebar}
        />

        <main className="flex-1 p-6 bg-muted/30 h-[calc(100vh-100px)]">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
