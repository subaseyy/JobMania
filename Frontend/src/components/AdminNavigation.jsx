"use client";
import {
  Home,
  MessageSquare,
  FileText,
  Users,
  Building2,
  ClipboardList,
  Settings,
  HelpCircle,
  User,
  PlusCircle,
  X,
  Calendar,
} from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

export default function AdminNavigation({ closeSidebar }) {
  const router = useRouter();
  const pathname = usePathname();

  const navItems = [
    { label: "Dashboard", icon: Home, path: "/admin" },
    { label: "Messages", icon: MessageSquare, path: "/admin/messages", badge: 1 },
    { label: "Company Profile", icon: Building2, path: "/admin/company-profile" },
    { label: "All Applicants", icon: Users, path: "/admin/job-application" },
    { label: "Job Listing", icon: ClipboardList, path: "/admin/job-listing" },
    { label: "My Schedule", icon: Calendar, path: "/admin/schedule" },
  ];

  const settingsItems = [
    { label: "Settings", icon: Settings, path: "/admin/settings" },
    { label: "Help Center", icon: HelpCircle, path: "/admin/help" },
  ];

  return (
    <div className="flex flex-col h-full bg-white font-sans">
      {/* Logo Section */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">J</span>
            </div>
            <span className="text-xl font-bold text-gray-900">JobMania</span>
          </div>
          <button
            className="md:hidden text-gray-500 hover:text-gray-700"
            onClick={closeSidebar}
          >
            <X size={20} />
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.label}>
              <button
                className={`flex items-center w-full px-3 py-3 rounded-lg text-sm font-medium transition-colors ${
                  pathname === item.path
                    ? "bg-blue-50 text-blue-600 border-r-2 border-blue-600"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
                onClick={() => {
                  router.push(item.path);
                  closeSidebar?.();
                }}
              >
                <item.icon size={18} className="mr-3" />
                <span className="flex-1 text-left">{item.label}</span>
                {item.badge && (
                  <span className="bg-blue-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-medium">
                    {item.badge}
                  </span>
                )}
              </button>
            </li>
          ))}
        </ul>

        {/* Settings Section */}
        <div className="mt-8 pt-6 border-t border-gray-100">
          <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-3">
            SETTINGS
          </h4>
          <ul className="space-y-1">
            {settingsItems.map((item) => (
              <li key={item.label}>
                <button
                  className={`flex items-center w-full px-3 py-3 rounded-lg text-sm font-medium transition-colors ${
                    pathname === item.path
                      ? "bg-blue-50 text-blue-600 border-r-2 border-blue-600"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                  onClick={() => {
                    router.push(item.path);
                    closeSidebar?.();
                  }}
                >
                  <item.icon size={18} className="mr-3" />
                  <span className="flex-1 text-left">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* User Profile Section */}
      <div className="p-4 border-t border-gray-100">
        <div className="bg-blue-50 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold text-sm">SK</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold text-gray-900 truncate">
                Subas Kandel
              </div>
              <div className="text-xs text-gray-600 truncate">
                subas.kandel9@gmail.com
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}