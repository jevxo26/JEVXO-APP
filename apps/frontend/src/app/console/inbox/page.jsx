import React from "react";
import InboxLayout from "@/components/admin/inbox/InboxLayout";
import AppLayout from "@/components/layout/AppLayout";
import PrivateRoute from "@/components/auth/PrivateRoute";

export default function InboxPage() {
  return (
    <PrivateRoute>
      <AppLayout>
        <div className="flex flex-col h-full p-6">
          <div className="flex-1 min-h-0">
            <InboxLayout />
          </div>
        </div>
      </AppLayout>
    </PrivateRoute>
  );
}
