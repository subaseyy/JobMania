"use client";
import { useContext, useState, useEffect } from "react";
import {
  Home,
  MessageSquare,
  FileText,
  Search,
  Building2,
  User,
  Settings,
  HelpCircle,
  Menu,
  X,
  LogOut,
} from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import NotificationSystem from "./notification/page";
import { AuthContext } from "@/context/AuthContext";
import Cookies from "js-cookie";

export default function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { auth, setAuth } = useContext(AuthContext);

  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const name = Cookies.get("full_name");
    const email = Cookies.get("email");
    if (name) setUserName(name);
    if (email) setUserEmail(email);
  }, []);

  const currentSlug = pathname.split("/").pop();

  const titleMap = {
    "dashboard-overview": "Dashboard",
    messages: "Messages",
    application: "Applications",
    job: "Find Jobs",
    companies: "Browse Companies",
    profile: "My Public Profile",
    setting: "Settings",
    "help-center": "Help Center",
    "job-description": "Job Description",
    "company-description": "Company Description",
  };

  const pageTitle = titleMap[currentSlug] || currentSlug;

  const navItems = [
    { label: "Dashboard", icon: Home, path: "/user/dashboard" },

    { label: "Applications", icon: FileText, path: "/user/application" },
    { label: "Find Jobs", icon: Search, path: "/user/job" },

    { label: "My Public Profile", icon: User, path: "/user/profile" },
  ];

  const settingsItems = [
    { label: "Settings", icon: Settings, path: "/dashboard/setting" },
    { label: "Help Center", icon: HelpCircle, path: "/dashboard/help-center" },
  ];

  function closeSidebar() {
    setSidebarOpen(false);
  }

  async function handleLogout() {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });

      setAuth({
        role: null,
        user_id: null,
        username: null,
      });

      Cookies.remove("token");
      Cookies.remove("role");
      Cookies.remove("user_id");
      Cookies.remove("full_name");
      Cookies.remove("email");

      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error.message);
      alert("Logout failed. Please try again.");
    }
  }

  return (
    <div className="min-h-screen overflow-hidden bg-gray-50">
      <div
        className={`fixed top-0 left-0 z-20 h-full w-64 bg-white border-r border-purple-100 transform transition-transform duration-300 ease-in-out flex flex-col justify-between ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="p-6 border-b border-purple-100 flex justify-between items-center my-4">
          <Image src="/logo.png" alt="Logo" width={216} height={40} />
          <button
            className="md:hidden text-gray-700"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={24} />
          </button>
        </div>

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
                    closeSidebar();
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
                      closeSidebar();
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

        <div className="p-4">
          {currentSlug === "profile" && (
            <button
              onClick={handleLogout}
              className="border border-[#E2E7F5] shadow-[-8px_8px_40px_0px_#00000014] mb-3 w-full flex items-center justify-start gap-2 py-5 rounded-lg font-epilogue font-[500] text-base leading-[160%] text-[#FF6550] hover:scale-[1.03] transition-all duration-300 ease-in-out"
            >
              <LogOut size={20} className="mr-3 ml-5" />
              <span>Logout</span>
            </button>
          )}

          <div className="flex items-center">
            <div className="h-10 w-10 rounded-full bg-purple-600 overflow-hidden">
              <Image src="/hero.jpg" width={40} height={40} alt="User Avatar" />
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
        </div>
      </div>

      <div className="md:ml-64">
        <header className="bg-white p-4 md:p-6 border-b flex justify-between items-center sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <button
              className="md:hidden text-gray-700"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={24} />
            </button>
            <h1 className="font-clash font-semibold text-2xl md:text-[32px] text-[#25324B] capitalize">
              {pageTitle}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                router.push("/");
                closeSidebar();
              }}
              className="flex items-center gap-2 px-3 py-2 border border-[#CCCCF5] font-epilogue font-semibold text-[#4640DE] hover:bg-[#E9EBFD] rounded-lg"
            >
              <p className="block sm:hidden text-lg">←</p>
              <p className="block sm:hidden text-sm">Home</p>
              <p className="hidden sm:block text-base">Back to homepage</p>
            </button>
            
          </div>
        </header>

        {/* MAIN: Remove scroll, let JobList handle its own scroll */}
        <main className="bg-white min-h-[calc(100vh-80px)]">{children}</main>
      </div>
    </div>
  );
}
