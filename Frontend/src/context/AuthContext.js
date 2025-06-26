"use client";
import { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    role: null,
    user_id: null,
    full_name: null,
  });

  useEffect(() => {
    const role = Cookies.get("role");
    const user_id = Cookies.get("user_id");
    const full_name = Cookies.get("full_name");

    if (role && user_id && full_name) {
      setAuth({
        role,
        user_id,
        full_name,
      });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
