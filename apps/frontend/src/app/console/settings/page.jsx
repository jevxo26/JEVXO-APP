"use client";

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProfileSettings from "@/components/admin/settings/ProfileSettings";
import NotificationSettings from "@/components/admin/settings/NotificationSettings";
import { User, Bell, Shield, Wallet, Settings as SettingsIcon, Sparkles } from "lucide-react";
import PrivateRoute from "@/components/auth/PrivateRoute";
import AppLayout from "@/components/layout/AppLayout";
export default function Settings() {
  return (
    <PrivateRoute>
      <AppLayout>
        <div className="px-4 sm:px-8 py-4 sm:py-8">
          <div className="max-w-[1600px] w-full mx-auto">
            <div className="flex flex-col xl:flex-row justify-between gap-4 mb-6 items-center">
              <div className="flex items-center gap-3 sm:gap-4 w-full xl:w-auto">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#EFFC76]/20 to-transparent blur-xl" />
                  <SettingsIcon className="w-6 h-6 text-[#EFFC76] relative z-10" />
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-white via-white to-white/70 bg-clip-text text-transparent">
                    Settings
                  </h1>
                  <p className="text-xs text-white/50 mt-0.5 font-medium">
                    Manage your platform preferences and account details.
                  </p>
                </div>
              </div>
            </div>
            <Tabs defaultValue="profile" className="w-full">
              <div className="border-b border-white/10 mb-6 sm:mb-8 overflow-x-auto">
                <TabsList className="bg-transparent h-auto p-0 flex w-max sm:w-full gap-4 sm:gap-8">
                  <TabsTrigger
                    value="profile"
                    className="bg-transparent data-[state=active]:bg-transparent border-0 border-b-2 border-transparent data-[state=active]:border-[#EFFC76] rounded-none px-2 sm:px-0 py-3 text-white/60 data-[state=active]:text-white flex items-center gap-2 text-xs sm:text-base"
                  >
                    <User className="w-4 h-4 text-[#EFFC76]" />
                    Profile
                  </TabsTrigger>
                  <TabsTrigger
                    value="notifications"
                    className="bg-transparent data-[state=active]:bg-transparent border-0 border-b-2 border-transparent data-[state=active]:border-[#EFFC76] rounded-none px-2 sm:px-0 py-3 text-white/60 data-[state=active]:text-white flex items-center gap-2 text-xs sm:text-base"
                  >
                    <Bell className="w-4 h-4 text-[#EFFC76]" />
                    Notifications
                  </TabsTrigger>
                  <TabsTrigger
                    value="security"
                    className="bg-transparent data-[state=active]:bg-transparent border-0 border-b-2 border-transparent data-[state=active]:border-[#EFFC76] rounded-none px-2 sm:px-0 py-3 text-white/60 data-[state=active]:text-white flex items-center gap-2 text-xs sm:text-base"
                  >
                    <Shield className="w-4 h-4 text-[#EFFC76]" />
                    Security
                  </TabsTrigger>
                  <TabsTrigger
                    value="billing"
                    className="bg-transparent data-[state=active]:bg-transparent border-0 border-b-2 border-transparent data-[state=active]:border-[#EFFC76] rounded-none px-2 sm:px-0 py-3 text-white/60 data-[state=active]:text-white flex items-center gap-2 text-xs sm:text-base"
                  >
                    <Wallet className="w-4 h-4 text-[#EFFC76]" />
                    Billing
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="profile" className="mt-0 outline-none">
                <ProfileSettings />
              </TabsContent>

              <TabsContent value="notifications" className="mt-0 outline-none">
                <NotificationSettings />
              </TabsContent>

              <TabsContent value="security" className="mt-0 outline-none">
                <div className="py-12 text-center text-white/70 glass-card rounded-xl border border-dashed border-white/30">
                  <Shield className="w-12 h-12 mx-auto mb-4 text-[#EFFC76]" />
                  <h3 className="text-lg font-medium text-white">
                    Security Settings
                  </h3>
                  <p>
                    Two-factor authentication and password management coming
                    soon.
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="billing" className="mt-0 outline-none">
                <div className="py-12 text-center text-white/70 glass-card rounded-xl border border-dashed border-white/30">
                  <Wallet className="w-12 h-12 mx-auto mb-4 text-[#EFFC76]" />
                  <h3 className="text-lg font-medium text-white">
                    Billing & Plans
                  </h3>
                  <p>Invoices and subscription management coming soon.</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </AppLayout>
    </PrivateRoute>
  );
}


