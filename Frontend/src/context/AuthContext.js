"use client";
import { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    role: null,
    user_id: null,
    username: null,
  });

  useEffect(() => {
    const role = Cookies.get("role");
    const user_id = Cookies.get("user_id");
    const username = Cookies.get("username");

    if (role && user_id && username) {
      setAuth({
        role,
        user_id,
        username,
      });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
