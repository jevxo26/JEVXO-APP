import { Bai_Jamjuree } from "next/font/google";
import "./globals.css";


const baiJamjuree = Bai_Jamjuree({
  variable: "--font-bai-jamjuree",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata = {
  title: "JEVXO - Premium Software Solutions",
  description: "JEVXO - Next-Gen Software Solutions, Cloud Infrastructure & AI Systems",
};

import StoreProvider from "@/lib/StoreProvider";
import { AuthProvider } from "@/contexts/AuthContext";
import { Toaster } from "sonner";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${baiJamjuree.variable} antialiased`}
      >
        <StoreProvider>
          <AuthProvider>
            {children}
            <Toaster position="top-right" theme="dark" />
          </AuthProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
