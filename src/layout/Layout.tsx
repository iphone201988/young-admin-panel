import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Navigate, Outlet, useLocation } from "react-router";

const pageConfig = {
  "/admin": { title: "Dashboard", subtitle: "Overview of your admin panel" },
  "/admin/users": {
    title: "User Management",
    subtitle: "Manage users, verification, and compliance",
  },
  "/admin/complaints": {
    title: "Complaints",
    subtitle: "Handle user reports and compliance issues",
  },
  "/admin/posts": {
    title: "Posts",
    subtitle: "Manage user posts and content moderation",
  },
  "/admin/ads": {
    title: "Ad Approval",
    subtitle: "Review and approve advertisement submissions",
  },
  "/admin/upload-media": {
    title: "Upload Media",
    subtitle: "Upload images with optional source link",
  },
  "/admin/messaging": {
    title: "Messaging",
    subtitle: "Send messages to users individually or in bulk",
  },
  "/admin/settings": {
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
    pageConfig[location.pathname as keyof typeof pageConfig] ||
    (location.pathname.startsWith("/admin/posts/") && location.pathname !== "/admin/posts"
      ? { title: "Post Detail", subtitle: "View post details" }
      : location.pathname.startsWith("/admin/complaints/") && location.pathname !== "/admin/complaints"
      ? { title: "Complaint Detail", subtitle: "View complaint details" }
      : location.pathname.startsWith("/admin/users/") && location.pathname !== "/admin/users"
      ? { title: "User Detail", subtitle: "View and manage user" }
      : pageConfig["/admin"]);

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
    <div className="h-screen overflow-hidden flex bg-background">
      <Sidebar collapsed={sidebarCollapsed} onToggle={toggleSidebar} />

      <div
        className="flex-1 flex flex-col overflow-hidden min-w-0 transition-[margin] duration-300 ease-in-out"
        style={{ marginLeft: sidebarCollapsed ? 80 : 320 }}
      >
        <Header
          title={currentPage.title}
          subtitle={currentPage.subtitle}
          onMenuClick={toggleSidebar}
        />

        <main className="flex-1 min-h-0 overflow-y-auto p-6 bg-muted/30">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
