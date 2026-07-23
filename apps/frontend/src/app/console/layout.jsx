"use client";

import StoreProvider from "@/lib/StoreProvider";
import { AuthProvider } from "@/contexts/AuthContext";

export default function ConsoleLayout({ children }) {
  return (
    <StoreProvider>
      <AuthProvider>
        {children}
      </AuthProvider>
    </StoreProvider>
  );
}
