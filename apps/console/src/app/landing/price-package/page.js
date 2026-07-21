"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Package, 
  DollarSign, 
  Tag, 
  Briefcase, 
  Repeat, 
  Award, 
  Settings 
} from "lucide-react";
import { toast } from "sonner";
import ReusableTable from "@/components/table/reusable-table";
import DeleteConfirmModal from "@/components/modal/DeleteConfirmModal";
import PricePackageForm from "@/components/landing/landing-page-from/price-package/PricePackageForm";
import {
  useGetPricePackagesQuery,
  useDeletePricePackageMutation,
} from "@/api/landing/price-package/pricePackageApi";
import PrivateRoute from "@/components/auth/PrivateRoute";
import AppLayout from "@/components/layout/AppLayout";

export default function PricePackagePage() {
  const router = useRouter();
  const [showDialog, setShowDialog] = useState(false);
  const [editingPricePackage, setEditingPricePackage] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [pricePackageToDelete, setPricePackageToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // API hooks
  const {
    data: pricePackagesData,
    isLoading,
    refetch,
  } = useGetPricePackagesQuery();
  const [deletePricePackage, { isLoading: isDeleting }] =
    useDeletePricePackageMutation();

  const pricePackages = pricePackagesData?.data || pricePackagesData || [];

  // Table headers
  const headers = [
    { 
      label: (
        <div className="flex items-center gap-2">
          <Package className="w-4 h-4" />
          <span>Title</span>
        </div>
      ), 
      field: "title" 
    },
    { 
      label: (
        <div className="flex items-center gap-2">
          <DollarSign className="w-4 h-4" />
          <span>Price</span>
        </div>
      ), 
      field: "price" 
    },
    { 
      label: (
        <div className="flex items-center gap-2">
          <Tag className="w-4 h-4" />
          <span>Type</span>
        </div>
      ), 
      field: "type" 
    },
    { 
      label: (
        <div className="flex items-center gap-2">
          <Briefcase className="w-4 h-4" />
          <span>Project Limit</span>
        </div>
      ), 
      field: "projectLimit" 
    },
    { 
      label: (
        <div className="flex items-center gap-2">
          <Repeat className="w-4 h-4" />
          <span>Revision Limit</span>
        </div>
      ), 
      field: "revisionLimit" 
    },
    { 
      label: (
        <div className="flex items-center gap-2">
          <Award className="w-4 h-4" />
          <span>Badge</span>
        </div>
      ), 
      field: "badge" 
    },
    { 
      label: (
        <div className="flex items-center gap-2">
          <Settings className="w-4 h-4" />
          <span>Actions</span>
        </div>
      ), 
      field: "actions" 
    },
  ];

  // Format data for table
  const tableData = pricePackages.map((pricePackage) => ({
    ...pricePackage,
    type: pricePackage.type ? (
      <span className="capitalize px-2 py-1 rounded-md bg-[#EFFC76]/10 text-[#EFFC76] border border-[#EFFC76]/40 text-sm">
        {pricePackage.type}
      </span>
    ) : (
      <span className="text-white/40 text-sm italic">-</span>
    ),
    badge: pricePackage.badge ? (
      <span className="px-2 py-1 rounded-md bg-[#EFFC76]/10 text-[#EFFC76] border border-[#EFFC76]/40 text-sm">
        {pricePackage.badge}
      </span>
    ) : (
      <span className="text-white/40 text-sm italic">-</span>
    ),
    actions: (
      <div className="flex items-center gap-2 justify-center">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 glass-button border border-white/30 bg-white/5 text-white hover:bg-white/10 hover:text-white"
          onClick={() => handleView(pricePackage)}
          title="View Details"
        >
          <Eye className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 glass-button border border-white/30 bg-white/5 text-white hover:bg-white/10 hover:text-white"
          onClick={() => handleEdit(pricePackage)}
          title="Edit"
        >
          <Edit className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-red-400 hover:text-red-300 hover:bg-red-500/20"
          onClick={() => handleDeleteClick(pricePackage)}
          title="Delete"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    ),
  }));

  const handleAdd = () => {
    setEditingPricePackage(null);
    setShowDialog(true);
  };

  const handleView = (pricePackage) => {
    const id = pricePackage.id || pricePackage._id;
    router.push(`/landing/price-package/${id}`);
  };

  const handleEdit = (pricePackage) => {
    setEditingPricePackage(pricePackage);
    setShowDialog(true);
  };

  const handleDeleteClick = (pricePackage) => {
    setPricePackageToDelete(pricePackage);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (!pricePackageToDelete) return;

    try {
      await deletePricePackage(
        pricePackageToDelete.id || pricePackageToDelete._id,
      ).unwrap();
      toast.success("Price package deleted successfully!");
      setShowDeleteModal(false);
      setPricePackageToDelete(null);
      refetch();
    } catch (error) {
      toast.error(error?.data?.message || "Failed to delete price package");
    }
  };

  const handleFormSuccess = () => {
    setEditingPricePackage(null);
    refetch();
  };

  return (
    <PrivateRoute>
      <AppLayout>
        <div className="max-w-[1600px] w-full mx-auto px-4 py-8 text-white">
          {/* Header Section */}
          
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
            <div className="relative w-full md:w-auto">
              <div className="absolute -left-8 -top-8 w-32 h-32 bg-[#EFFC76]/20 rounded-full blur-3xl pointer-events-none" />
              <div className="flex items-center gap-4 relative">
                <div className="p-3 rounded-xl bg-[#EFFC76]/10 border border-[#EFFC76]/20 shadow-[0_0_20px_rgba(239,252,118,0.1)]">
                  <Package className="w-8 h-8 text-[#EFFC76]" />
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                    Price Packages
                  </h1>
                  <p className="text-sm md:text-base text-white/40 mt-1">
                    Manage your subscription plans and pricing
                  </p>
                </div>
              </div>
            </div>

            <Button
              onClick={handleAdd}
              className="w-full md:w-auto bg-[#EFFC76] hover:bg-[#dbe86c] text-black font-semibold h-12 px-6 rounded-xl shadow-[0_0_20px_rgba(239,252,118,0.2)] hover:shadow-[0_0_30px_rgba(239,252,118,0.3)] transition-all duration-300"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add Price Package
            </Button>
          </div>

          {/* Table Section */}
          <div className="rounded-2xl border border-white/10 bg-[#0A0A0A]/80 backdrop-blur-xl shadow-[0_0_40px_rgba(0,0,0,0.2)] overflow-hidden">
            <ReusableTable
              data={tableData}
              headers={headers}
              isLoading={isLoading}
              enableSearch={true}
              searchPlaceholder="Search price packages..."
              pageSize={pageSize}
              setPageSize={setPageSize}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
              headerVariant="neon"
            />
          </div>

          {/* Price Package Form Dialog */}
          <PricePackageForm
            open={showDialog}
            onOpenChange={setShowDialog}
            editingPricePackage={editingPricePackage}
            onSuccess={handleFormSuccess}
          />

          {/* Delete Confirmation Modal */}
          <DeleteConfirmModal
            isOpen={showDeleteModal}
            onClose={() => {
              setShowDeleteModal(false);
              setPricePackageToDelete(null);
            }}
            onConfirm={handleDeleteConfirm}
            count={1}
            itemName="price package"
            loading={isDeleting}
          />
        </div>
      </AppLayout>
    </PrivateRoute>
  );
}
