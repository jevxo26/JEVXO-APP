"use client";

import React from "react";
import DeductionManagement from "@/components/admin/payroll/DeductionManagement";
import PrivateRoute from "@/components/auth/PrivateRoute";
import AppLayout from "@/components/layout/AppLayout";
import { TrendingDown } from "lucide-react";

/**
 * Deductions Page
 * 
 * Dedicated page for managing payroll deductions including:
 * - Project penalties for late delivery
 * - Leave-based deductions
 * - Manual deductions by admin
 * 
 * Features:
 * - Create, edit, and delete deductions
 * - Apply deductions to payroll immediately
 * - View deduction details
 * - Filter and search deductions
 */
export default function DeductionsPage() {
  return (
    <PrivateRoute>
      <AppLayout>
        <div className="px-4 py-4 sm:px-8 sm:py-8 min-h-screen text-white">
          <div className="max-w-[1600px] w-full mx-auto space-y-4 sm:space-y-6">
            {/* Page Header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-xl">
                <TrendingDown className="w-6 h-6 text-rose-400" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white">
                  Deduction Management
                </h1>
                <p className="text-white/60 text-sm sm:text-base">
                  Manage payroll deductions and penalties
                </p>
              </div>
            </div>

            {/* Deduction Management Component */}
            <DeductionManagement />
          </div>
        </div>
      </AppLayout>
    </PrivateRoute>
  );
}
