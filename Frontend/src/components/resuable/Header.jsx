"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { AuthContext } from "@/context/AuthContext";

const Header = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { auth, setAuth } = useContext(AuthContext);
  const [userName, setUserName] = useState("");

  const isAuthenticated = !!auth.user_id;

  // Set trimmed first name on mount
  useEffect(() => {
    const fullName = Cookies.get("full_name");
    if (fullName) {
      const firstName = fullName.split(" ")[0];
      setUserName(firstName);
    }
  }, []);

  const isActive = (path) => {
    if (path.endsWith("/*")) {
      return pathname.startsWith(path.replace("/*", ""));
    }
    return pathname === path;
  };

  const handleLogout = async () => {
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
  };

  return (
    <div className="container pt-4 px-4 mx-auto">
      <div className="flex flex-wrap justify-between items-center">
        {/* Left: Logo & Navigation */}
        <div className="flex flex-wrap gap-4 sm:gap-8 items-center">
          <Link href="/">
            <Image
              src="/home/Header/logo.png"
              width={160}
              height={36}
              alt="Logo"
              className="w-32 sm:w-40 md:w-48 lg:w-40 mb-4"
              priority
            />
          </Link>

          <div className="hidden md:flex gap-4 lg:gap-8 mt-2">
            <Link href="/find-jobs">
              <p
                className={`font-epilogue font-[500] text-sm sm:text-base transition-colors ${
                  isActive("/find-jobs")
                    ? "text-[#4640DE] border-b-4 border-[#4640DE] pb-3"
                    : "text-[#515B6F] hover:text-[#4640DE] pb-3"
                }`}
              >
                Find Jobs
              </p>
            </Link>
            
            {isAuthenticated && (
  <>
    <Link
      href={
        auth.role === "admin"
          ? "/admin/dashboard"
          : auth.role === "company"
          ? "/company/dashboard"
          : "/user/dashboard"
      }
    >
      <p
        className={`font-epilogue font-[500] text-sm sm:text-base transition-colors ${
          isActive(
            auth.role === "admin"
              ? "/admin/*"
              : auth.role === "company"
              ? "/company/*"
              : "/user/*"
          )
            ? "text-[#4640DE] border-b-4 border-[#4640DE] pb-3"
            : "text-[#515B6F] hover:text-[#4640DE] pb-3"
        }`}
      >
        Dashboard
      </p>
    </Link>
  </>
)}
          </div>
        </div>

        {/* Right: Auth & Actions */}
        <div className="flex items-center gap-3 sm:gap-4 mt-2 mb-4">
          {isAuthenticated ? (
            <>
              <span className="font-epilogue text-sm sm:text-base text-[#202430]">
                Hi, <span className="font-semibold">{userName}</span>
              </span>
              <button
                onClick={handleLogout}
                className="font-epilogue font-semibold text-sm sm:text-base text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="font-epilogue font-semibold text-sm sm:text-base text-[#4640DE]"
              >
                Login
              </Link>
              <div className="w-px h-6 bg-[#D6DDEB]" />
              <Link
                href="/signup"
                className="font-epilogue font-semibold text-sm sm:text-base text-white bg-[#4640DE] hover:bg-[#3c39c2] px-4 py-2 rounded"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
