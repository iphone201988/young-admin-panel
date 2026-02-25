import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Shield,
  LayoutDashboard,
  Users,
  Flag,
  FileText,
  Megaphone,
  Image as ImageIcon,
  MessageSquare,
  Settings,
  Menu,
  User,
} from "lucide-react";
import { Link, useLocation } from "react-router";

const navigationItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
  { icon: Users, label: "User Management", href: "/admin/users" },
  { icon: Flag, label: "Complaints", href: "/admin/complaints", badge: "" },
  { icon: FileText, label: "Posts", href: "/admin/posts" },
  {
    icon: Megaphone,
    label: "Megaphone Approval",
    href: "/admin/ads",
    badge: "",
  },
  { icon: ImageIcon, label: "Upload Media", href: "/admin/upload-media" },
  // { icon: MessageSquare, label: "Messaging", href: "/messaging" },
  { icon: Settings, label: "Settings", href: "/admin/settings" },
];

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export default function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const location = useLocation();

  return (
    <motion.div
      animate={{ width: collapsed ? 80 : 320 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed left-0 top-0 z-10 bg-white shadow-lg border-r border-sidebar-border flex flex-col h-screen"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-sidebar-border">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <Shield className="text-primary-foreground" size={20} />
          </div>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="sidebar-logo-text"
            >
              <h1 className="text-xl font-bold text-foreground">
                The Boom Admin
              </h1>
              <p className="text-sm text-muted-foreground">Management System</p>
            </motion.div>
          )}
        </div>
        <button
          onClick={onToggle}
          className="lg:hidden p-2 rounded-lg hover:bg-accent transition-colors"
        >
          <Menu size={20} className="text-muted-foreground" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navigationItems.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link key={item.href} to={item.href}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                  "nav-item flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-all duration-200",
                  isActive
                    ? "nav-item-active hover:nav-item-active"
                    : "text-muted-foreground"
                )}
              >
                <item.icon size={20} />
                {!collapsed && (
                  <>
                    <span className="sidebar-text">{item.label}</span>
                    {item.badge && (
                      <span className="ml-auto bg-destructive/10 text-destructive text-xs px-2 py-1 rounded-full sidebar-text">
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </motion.div>
            </Link>
          );
        })}
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
            <User className="text-primary-foreground" size={16} />
          </div>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="sidebar-text"
            >
              <p className="font-medium text-foreground">Admin User</p>
              {/* <p className="text-sm text-muted-foreground">Super Admin</p> */}
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
