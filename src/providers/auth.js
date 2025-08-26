"use client";
import { createContext } from "react";

export const AuthContext = createContext({ isAuth: false, host: undefined });

export function AuthContextProvider({ children, value }) {
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
