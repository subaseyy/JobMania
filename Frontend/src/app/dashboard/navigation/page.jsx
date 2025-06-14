"use client";
import {
  Home,
  MessageSquare,
  FileText,
  Search,
  Building2,
  User,
  Settings,
  HelpCircle,
} from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

export default function Navigation({ closeSidebar }) {
  const router = useRouter();
  const pathname = usePathname();

  const navItems = [
    { label: "Dashboard", icon: Home, path: "/dashboard/dashboard-overview" },
    {
      label: "Messages",
      icon: MessageSquare,
      badge: 1,
      path: "/dashboard/messages",
    },
    { label: "Applications", icon: FileText, path: "/dashboard/application" },
    { label: "Find Jobs", icon: Search, path: "/dashboard/job" },
    {
      label: "Browse Companies",
      icon: Building2,
      path: "/dashboard/companies",
    },
    { label: "My Public Profile", icon: User, path: "/dashboard/profile" },
  ];

  const settingsItems = [
    { label: "Settings", icon: Settings, path: "/dashboard/setting" },
    { label: "Help Center", icon: HelpCircle, path: "/dashboard/help-center" },
  ];

  return (
    <>
      <nav className="flex-1 py-4 px-3">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.label}>
              <button
                className={`flex items-center w-full p-3 rounded-lg font-epilogue font-[500] text-base leading-[160%] ${
                  pathname === item.path
                    ? "bg-[#E9EBFD] text-[#4640DE]"
                    : "hover:bg-gray-100 text-[#7C8493]"
                }`}
                onClick={() => {
                  router.push(item.path);
                  closeSidebar?.();
                }}
              >
                <item.icon size={20} className="mr-3" />
                <span>{item.label}</span>
                {item.badge && (
                  <span className="ml-auto bg-purple-600 text-white w-5 h-5 flex items-center justify-center rounded-full text-xs">
                    {item.badge}
                  </span>
                )}
              </button>
            </li>
          ))}
        </ul>

        <div className="mt-8">
          <div className="font-epilogue font-[600] text-sm leading-6 text-[#202430] mb-2 px-3">
            SETTINGS
          </div>
          <ul className="space-y-2">
            {settingsItems.map((item) => (
              <li key={item.label}>
                <button
                  className={`flex items-center w-full p-3 rounded-lg font-epilogue font-[500] text-base leading-6 ${
                    pathname === item.path
                      ? "bg-[#E9EBFD] text-[#4640DE]"
                      : "hover:bg-gray-100 text-[#7C8493]"
                  }`}
                  onClick={() => {
                    router.push(item.path);
                    closeSidebar?.();
                  }}
                >
                  <item.icon size={20} className="mr-3" />
                  <span>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <div className="p-4 border-t border-purple-100">
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-full bg-purple-600 overflow-hidden">
            <Image src="/hero.jpg" width={40} height={40} alt="User Avatar" />
          </div>
          <div className="ml-3">
            <div className="font-epilogue font-[600] text-lg leading-[160%] text-[#202430]">
              Subas Kandel
            </div>
            <div className="font-epilogue font-[400] text-xs leading-[160%] text-[#202430] truncate">
              kandelsuba89@gmail.com
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
