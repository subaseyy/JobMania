"use client";
import Cookies from "js-cookie";
import {
  LayoutDashboard,
  Users,
  Building2,
  ClipboardList,
  Settings,
  HelpCircle,
  X,
  UserPlus2,
  Briefcase,
  Users2Icon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminNavigation({ closeSidebar }) {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const pathname = usePathname();

  // Uncomment and use a cookies library if needed
  useEffect(() => {
    setUserName(Cookies.get("full_name") || "");
    setUserEmail(Cookies.get("email") || "");
  }, []);

  const navItems = [
    { label: "Dashboard", icon: LayoutDashboard, path: "/admin/dashboard" },
    { label: "All Users", icon: Users, path: "/admin/allusers" },
    { label: "All Companies", icon: Building2, path: "/admin/allcompany" },
    { label: "All Jobs", icon: ClipboardList, path: "/admin/alljobs" },
    { label: "Add User", icon: UserPlus2, path: "/admin/allusers/add" },
    { label: "Add Company", icon: Briefcase, path: "/admin/allcompany/add" },
    { label: "Add Job", icon: UserPlus2, path: "/admin/alljobs/add" },
    { label: "Settings", icon: Settings, path: "/admin/setting" },
    // { label: "Profile", icon: Users2Icon, path: "/admin/profile" },
    { label: "Help Center", icon: HelpCircle, path: "/admin/help-center" },
  ];
  

  return (
    <>
      <nav className="flex-1 py-4 px-3">
        <div className="p-6 border-b border-purple-100 flex justify-between items-center my-4">
          <Image src="/logo.png" alt="Logo" width={216} height={40} />
          {/* Close button (mobile only) */}
          <button className="md:hidden text-gray-700" onClick={closeSidebar}>
            <X size={24} />
          </button>
        </div>
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.label}>
              <Link
                href={item.path}
                className={`flex items-center w-full p-3 rounded-lg font-epilogue font-[500] text-base leading-[160%] ${
                  pathname === item.path
                    ? "bg-[#E9EBFD] text-[#4640DE]"
                    : "hover:bg-gray-100 text-[#7C8493]"
                }`}
                onClick={closeSidebar}
              >
                <item.icon size={20} className="mr-3" />
                <span>{item.label}</span>
                {item.badge && (
                  <span className="ml-auto bg-purple-600 text-white w-5 h-5 flex items-center justify-center rounded-full text-xs">
                    {item.badge}
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="flex flex-row items-center p-4">
        <div className="h-10 w-10 rounded-full overflow-hidden bg-purple-600">
          <Image
            src="/hero.jpg"
            width={40}
            height={40}
            alt="User Avatar"
            className="object-cover h-full w-full"
          />
        </div>
        <div className="ml-3">
          <div className="font-epilogue font-[600] text-lg leading-[160%] text-[#202430]">
            {userName || "Guest"}
          </div>
          <div className="font-epilogue font-[400] text-xs leading-[160%] text-[#7C8493] truncate">
            {userEmail || ""}
          </div>
        </div>
      </div>
    </>
  );
}
