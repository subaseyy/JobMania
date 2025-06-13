import Image from "next/image";
import React from "react";

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen flex">
      <div className="w-1/2 relative hidden md:block bg-gray-100 ">
        <Image
          src="/login/bg.png"
          alt="Auth Illustration"
          fill
          className="object-contain pt-4"
        />
      </div>
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white">
        <div className="container">{children}</div>
      </div>
    </div>
  );
}
