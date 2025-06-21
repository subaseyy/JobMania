"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/resuable/Header";
import Footer from "@/components/resuable/Footer";

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();

  const hideHeaderFooter = ["/login", "/signup"].includes(pathname);


  const isDashboard = pathname.startsWith("/user");
  const isAdmin = pathname.startsWith("/admin");
  const isCompany = pathname.startsWith("/company");



  return (
    <>
      {!hideHeaderFooter && <Header />}
      {children}
      {!hideHeaderFooter && !isDashboard && !isAdmin && !isCompany && <Footer />}
    </>
  );
}
