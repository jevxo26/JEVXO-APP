"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2, Settings, Image } from "lucide-react";
import { toast } from "sonner";
import ReusableTable from "@/components/table/reusable-table";
import DeleteConfirmModal from "@/components/modal/DeleteConfirmModal";
import HeroCarouselForm from "@/components/landing/landing-page-from/hero-carousel/HeroCarouselForm";
import {
  useGetHeroCarouselsQuery,
  useDeleteHeroCarouselMutation,
} from "@/api/landing/hero-carousel/heroCarouselApi";
import PrivateRoute from "@/components/auth/PrivateRoute";
import AppLayout from "@/components/layout/AppLayout";

export default function CarouselPage() {
  const [showDialog, setShowDialog] = useState(false);
  const [editingHeroCarousel, setEditingHeroCarousel] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [heroCarouselToDelete, setHeroCarouselToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // API hooks
  const {
    data: heroCarouselsData,
    isLoading,
    refetch,
  } = useGetHeroCarouselsQuery();
  const [deleteHeroCarousel, { isLoading: isDeleting }] =
    useDeleteHeroCarouselMutation();

  console.log(heroCarouselsData);

  const heroCarousels = heroCarouselsData?.data || heroCarouselsData || [];

  // Table headers
  const headers = [
    {
      label: (
        <div className="flex items-center gap-2">
          <Image className="w-4 h-4" />
          <span>Logo</span>
        </div>
      ),
      field: "logoUrl",
    },
    {
      label: (
        <div className="flex items-center justify-center gap-2">
          <Settings className="w-4 h-4" />
          <span>Actions</span>
        </div>
      ),
      field: "actions",
    },
  ];

  // Format data for table
  const tableData = heroCarousels.map((heroCarousel) => ({
    ...heroCarousel,
    logoUrl: heroCarousel.logoUrl ? (
      <div className="flex items-center justify-center p-2">
        <div className="relative group">
          <img
            src={heroCarousel.logoUrl}
            alt="Logo"
            className="w-24 h-24 object-contain rounded-lg border border-white/10 bg-white/5 p-2 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            onError={(e) => {
              e.target.style.display = "none";
              const parent = e.target.parentElement;
              if (parent) {
                parent.innerHTML =
                  '<span class="text-white/40 text-sm">Failed to load</span>';
              }
            }}
            onClick={() => {
              window.open(heroCarousel.logoUrl, "_blank");
            }}
            title="Click to view full size"
          />
        </div>
      </div>
    ) : (
      <div className="flex items-center justify-center">
        <span className="text-white/40 text-sm italic">No logo</span>
      </div>
    ),
    actions: (
      <div className="flex items-center gap-2 justify-center">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-white/70 hover:text-white hover:bg-white/10"
          onClick={() => handleEdit(heroCarousel)}
          title="Edit"
        >
          <Edit className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-red-400 hover:text-red-300 hover:bg-red-500/10"
          onClick={() => handleDeleteClick(heroCarousel)}
          title="Delete"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    ),
  }));

  const handleAdd = () => {
    setEditingHeroCarousel(null);
    setShowDialog(true);
  };

  const handleEdit = (heroCarousel) => {
    setEditingHeroCarousel(heroCarousel);
    setShowDialog(true);
  };

  const handleDeleteClick = (heroCarousel) => {
    setHeroCarouselToDelete(heroCarousel);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (!heroCarouselToDelete) return;

    try {
      await deleteHeroCarousel(
        heroCarouselToDelete.id || heroCarouselToDelete._id,
      ).unwrap();
      toast.success("Hero carousel deleted successfully!");
      setShowDeleteModal(false);
      setHeroCarouselToDelete(null);
      refetch();
    } catch (error) {
      toast.error(error?.data?.message || "Failed to delete hero carousel");
    }
  };

  const handleFormSuccess = () => {
    setEditingHeroCarousel(null);
    refetch();
  };

  return (
    <PrivateRoute>
      <AppLayout>
        <div className="px-4 py-4 md:px-8 md:py-6 flex flex-col min-h-screen text-white">
          <div className="max-w-[1600px] w-full mx-auto space-y-8">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 p-6 md:p-8 rounded-3xl bg-gradient-to-br from-white/10 via-white/5 to-transparent border border-white/10 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.12)] relative overflow-hidden group">
              {/* Decorative background glow */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-[#EFFC76]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

              <div className="relative z-10 space-y-2 w-full md:w-auto">
                <div className="flex items-center gap-3 mb-1">
                  <div className="p-2 rounded-lg bg-[#EFFC76]/10 border border-[#EFFC76]/20">
                    <Image className="w-5 h-5 text-[#EFFC76]" />
                  </div>

                  <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                    Hero Carousel
                  </h1>
                </div>
                <p className="text-sm md:text-base text-white/60 max-w-xl leading-relaxed">
                  Manage your landing page hero carousel images and content.
                  Create stunning first impressions.
                </p>
              </div>

              <div className="relative z-10 w-full md:w-auto">
                <Button
                  onClick={handleAdd}
                  className="w-full md:w-auto bg-[#EFFC76] hover:bg-[#dce865] text-black shadow-[0_0_20px_rgba(239,252,118,0.2)] hover:shadow-[0_0_30px_rgba(239,252,118,0.4)] transition-all duration-300 border-none font-semibold px-6 h-12 text-base rounded-xl"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Add Carousel
                </Button>
              </div>
            </div>

            {/* Table Section */}
            <div className="glass-panel rounded-2xl overflow-hidden p-1 border border-white/10 shadow-2xl relative">
              {/* Subtle grid pattern overlay */}
              <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.03] pointer-events-none" />

              <ReusableTable
                data={tableData}
                headers={headers}
                isLoading={isLoading}
                enableSearch={true}
                searchPlaceholder="Search hero carousels..."
                pageSize={pageSize}
                setPageSize={setPageSize}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
                headerVariant="neon"
              />
            </div>

            {/* Hero Carousel Form Dialog */}
            <HeroCarouselForm
              open={showDialog}
              onOpenChange={setShowDialog}
              editingHeroCarousel={editingHeroCarousel}
              onSuccess={handleFormSuccess}
            />

            {/* Delete Confirmation Modal */}
            <DeleteConfirmModal
              isOpen={showDeleteModal}
              onClose={() => {
                setShowDeleteModal(false);
                setHeroCarouselToDelete(null);
              }}
              onConfirm={handleDeleteConfirm}
              count={1}
              itemName="hero carousel"
              loading={isDeleting}
            />
          </div>
        </div>
      </AppLayout>
    </PrivateRoute>
  );
}
