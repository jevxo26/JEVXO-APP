"use client";
import React, { useState } from "react";
import OrderStats from "@/components/admin/orders/OrderStats";
import OrderTable from "@/components/admin/orders/OrderTable";
import OrderDetailsSheet from "@/components/admin/orders/OrderDetailsSheet";
import CreateOrderDialog from "@/components/admin/orders/CreateOrderDialog";
import { Button } from "@/components/ui/button";
import { Plus, Sparkles } from "lucide-react";
import PrivateRoute from "@/components/auth/PrivateRoute";
import AppLayout from "@/components/layout/AppLayout";

export default function OrdersPage() {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setIsDetailsOpen(true);
  };

  const handleOrderCreated = () => {
    // Order table will automatically refetch due to cache invalidation
    setIsCreateDialogOpen(false);
  };

  return (
    <PrivateRoute>
      <AppLayout>
        <div className="px-4 py-4 md:px-8 md:py-6 flex flex-col min-h-screen text-white">
      <div className="max-w-[1600px] w-full mx-auto space-y-6 md:space-y-8">
        <div className="flex flex-col xl:flex-row justify-between gap-4 mb-6 items-center">
          {/* Title Section */}
          <div className="flex items-center gap-3 sm:gap-4 w-full xl:w-auto">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[#EFFC76]/20 to-transparent blur-xl" />
              <Sparkles className="w-6 h-6 text-[#EFFC76] relative z-10" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-white via-white to-white/70 bg-clip-text text-transparent">
                Order Management
              </h1>
              <p className="text-xs text-white/50 mt-0.5 font-medium">
                Manage client orders, track project delivery, and keep
                communication in one place.
              </p>
            </div>
          </div>

          {/* Actions Section */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full xl:w-auto justify-between xl:justify-end">
            <Button 
              onClick={() => setIsCreateDialogOpen(true)}
              size="sm"
              className="bg-gradient-to-r from-[#EFFC76] to-[#e0ef5f] hover:from-[#e0ef5f] hover:to-[#d0df4f] text-black font-bold shadow-lg shadow-[#EFFC76]/30 hover:shadow-xl hover:shadow-[#EFFC76]/40 transition-all duration-300 hover:scale-105"
            >
              <Plus className="w-3.5 h-3.5 mr-1.5" />
              <span className="text-xs">Create New Order</span>
            </Button>
          </div>
        </div>

        <OrderStats />

        <OrderTable onViewDetails={handleViewDetails} />

        <OrderDetailsSheet
          order={selectedOrder}
          open={isDetailsOpen}
          onOpenChange={setIsDetailsOpen}
        />

        <CreateOrderDialog
          open={isCreateDialogOpen}
          onOpenChange={setIsCreateDialogOpen}
          onOrderCreated={handleOrderCreated}
        />
      </div>
    </div>
    </AppLayout>
    </PrivateRoute>
  );
}
