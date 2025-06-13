"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/resuable/Header";
import Footer from "@/components/resuable/Footer";

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();

  const hideHeaderFooter = ["/login", "/signup"].includes(pathname);

  return (
    <>
      {!hideHeaderFooter && <Header />}
      {children}
      {!hideHeaderFooter && <Footer />}
    </>
  );
}
