"use client";
import { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import AdminNavigation from "@/components/AdminSlider";

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Prevent background scroll on mobile sidebar open
  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [sidebarOpen]);

  return (
    <div className="flex min-h-screen relative">
      {/* Sidebar (Desktop) */}
      <aside className="hidden md:flex w-72 flex-col shadow-lg z-20">
        <AdminNavigation closeSidebar={() => {}} />
      </aside>

      {/* Hamburger (Mobile) */}
      <button
        className="md:hidden absolute top-8 right-6 z-30 rounded-full shadow"
        onClick={() => setSidebarOpen(true)}
        aria-label="Open Sidebar"
        aria-controls="mobile-sidebar"
      >
        <Menu size={28} />
      </button>

      {/* Sidebar Overlay (Mobile) */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close Sidebar"
          />
          {/* Sidebar Drawer */}
          <aside
            id="mobile-sidebar"
            className="relative z-50 w-64 bg-white h-full shadow-lg transition-transform duration-300 animate-slideIn"
            aria-modal="true"
            role="dialog"
          >
            <AdminNavigation closeSidebar={() => setSidebarOpen(false)} />
          </aside>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 bg-gray-50 mt-4 sm:mt-0">{children}</main>
    </div>
  );
}
