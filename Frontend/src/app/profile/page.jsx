"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Profile from "./components/Profile";

const Page = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checking, setChecking] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("token"); // or check session
    if (token) {
      setIsAuthenticated(true);
    } else {
      router.push("/login"); // redirect if not authenticated
    }
    setChecking(false);
  }, []);

  if (checking) {
    return <div>Loading...</div>; // avoid flicker
  }

  return (
    <div>
      {isAuthenticated && <Profile />}
    </div>
  );
};

export default Page;
