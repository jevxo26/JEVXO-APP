"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function OurProductIndex() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/admin/platform-settings/our-product/squadlog");
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0A0A0A]">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#EFFC76]"></div>
    </div>
  );
}
