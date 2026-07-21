import { Bai_Jamjuree } from "next/font/google";
import "./globals.css";
import StoreProvider from "@/lib/StoreProvider";
import { AuthProvider } from "@/contexts/AuthContext";
import { Toaster } from "sonner";

const baiJamjuree = Bai_Jamjuree({
  variable: "--font-bai-jamjuree",
  weight: ["200", "300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata = {
  title: "SquadLog Console | HR, Recruitment & Project Management",
  description: "Enterprise dashboard for SquadLog - Managing Projects, HR, Recruitment, and more.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${baiJamjuree.className} ${baiJamjuree.variable} antialiased`}
      >
        <StoreProvider>
          <AuthProvider>
            {children}
            <Toaster
              position="top-right"
              theme="dark"
              toastOptions={{
                classNames: {
                  toast:
                    "bg-[#0A0A0A]/90 backdrop-blur-xl border border-white/10 text-white shadow-[0_0_30px_rgba(0,0,0,0.3)] rounded-xl",
                  title: "text-white font-bold text-sm",
                  description: "text-white/70 text-xs",
                  actionButton:
                    "bg-[#EFFC76] text-black hover:bg-[#d0df4f] font-bold",
                  cancelButton:
                    "bg-white/10 text-white hover:bg-white/20",
                  success:
                    "!border-emerald-500/20 !bg-emerald-500/10 !text-emerald-400",
                  error: "!border-red-500/20 !bg-red-500/10 !text-red-400",
                  warning:
                    "!border-orange-500/20 !bg-orange-500/10 !text-orange-400",
                  info: "!border-blue-500/20 !bg-blue-500/10 !text-blue-400",
                },
              }}
            />
          </AuthProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
