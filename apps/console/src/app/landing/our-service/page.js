"use client";

import React, { useState, useEffect, Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2, Eye, Zap, Layers, FileText, List, Star } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import ReusableTable from "@/components/table/reusable-table";
import ConfirmActionModal from "@/components/modal/ConfirmActionModal";
import OurServiceForm from "@/components/landing/landing-page-from/our-service/OurServiceForm";
import { 
  useGetOurServicesQuery, 
  useDeleteOurServiceMutation,
} from "@/api/landing/our-service/ourServiceApi";
import PrivateRoute from "@/components/auth/PrivateRoute";
import AppLayout from "@/components/layout/AppLayout";

function OurServiceContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showDialog, setShowDialog] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [serviceForAction, setServiceForAction] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // API hooks
  const { data: servicesData, isLoading, refetch } = useGetOurServicesQuery();
  const [deleteService, { isLoading: isDeleting }] = useDeleteOurServiceMutation();

  const services = servicesData?.data || servicesData || [];

  // Handle edit query parameter
  useEffect(() => {
    const editId = searchParams.get("edit");
    if (editId && services.length > 0) {
      const serviceToEdit = services.find(
        (service) => (service.id || service._id) === editId
      );
      if (serviceToEdit) {
        setEditingService(serviceToEdit);
        setShowDialog(true);
        // Remove query parameter from URL
        router.replace("/landing/our-service", { scroll: false });
      }
    }
  }, [searchParams, services, router]);

  // Table headers
  const headers = [
    { 
      label: (
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-[#EFFC76]" />
          Title
        </div>
      ), 
      field: "title" 
    },
    { 
      label: (
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-[#EFFC76]" />
          Subtitle
        </div>
      ), 
      field: "subtitle" 
    },
    { 
      label: (
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-[#EFFC76]" />
          Category
        </div>
      ), 
      field: "categoryName" 
    },
    { 
      label: (
        <div className="flex items-center gap-2">
          <Star className="w-4 h-4 text-[#EFFC76]" />
          Key Features
        </div>
      ), 
      field: "keyFeaturesCount" 
    },
    { 
      label: (
        <div className="flex items-center gap-2">
          <List className="w-4 h-4 text-[#EFFC76]" />
          Benefits
        </div>
      ), 
      field: "benefitsCount" 
    },
    { 
      label: "Actions", 
      field: "actions" 
    },
  ];

  // Format data for table
  const tableData = services.map((service) => ({
    ...service,
    keyFeaturesCount: (
      <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-md bg-[#EFFC76]/10 text-[#EFFC76] text-xs font-medium border border-[#EFFC76]/20">
        {Array.isArray(service.keyFeature) ? service.keyFeature.length : 0}
      </span>
    ),
    benefitsCount: (
      <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-md bg-blue-500/10 text-blue-400 text-xs font-medium border border-blue-500/20">
        {Array.isArray(service.benefit) ? service.benefit.length : 0}
      </span>
    ),
    categoryName: (
      <span className="text-white/80">
        {service.categoryId ? `Category ${service.categoryId}` : "N/A"}
      </span>
    ),
    actions: (
      <div className="flex items-center gap-2 justify-center">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 hover:bg-white/10 hover:text-white transition-colors"
          onClick={() => router.push(`/landing/our-service/${service.id || service._id}`)}
          title="View Details"
        >
          <Eye className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 hover:bg-white/10 hover:text-white transition-colors"
          onClick={() => handleEdit(service)}
          title="Edit"
        >
          <Edit className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-red-400 hover:text-red-300 hover:bg-red-400/10 transition-colors"
          onClick={() => handleDeleteClick(service)}
          title="Delete"
          disabled={isDeleting}
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    ),
  }));

  const handleAdd = () => {
    setEditingService(null);
    setShowDialog(true);
  };

  const handleEdit = (service) => {
    setEditingService(service);
    setShowDialog(true);
  };

  const handleDeleteClick = (service) => {
    setServiceForAction(service);
    setShowConfirmModal(true);
  };

  const handleConfirmDelete = async () => {
    if (!serviceForAction) return;

    const service = serviceForAction;
    const serviceId = service.id || service._id;
    const serviceTitle = service.title || "Service";
    const toastId = toast.loading("Deleting service...");

    try {
      await deleteService(serviceId).unwrap();
      toast.success(`Service "${serviceTitle}" deleted successfully!`, { id: toastId });
      setShowConfirmModal(false);
      setServiceForAction(null);
      refetch();
    } catch (error) {
      toast.error(error?.data?.message || "Failed to delete service", { id: toastId });
    }
  };

  const getDeleteDescription = () => {
    if (!serviceForAction) return "";
    const serviceTitle = serviceForAction.title || "Service";
    return `Are you sure you want to delete "${serviceTitle}"? This action cannot be undone.`;
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
                  <Zap className="w-8 h-8 text-[#EFFC76]" />
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                    Our Services
                  </h1>
                  <p className="text-sm md:text-base text-white/40 mt-1">
                    Manage and showcase your services
                  </p>
                </div>
              </div>
            </div>

            <Button
              onClick={handleAdd}
              className="w-full md:w-auto bg-[#EFFC76] hover:bg-[#dbe86c] text-black font-semibold h-12 px-6 rounded-xl shadow-[0_0_20px_rgba(239,252,118,0.2)] hover:shadow-[0_0_30px_rgba(239,252,118,0.3)] transition-all duration-300"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add Service
            </Button>
          </div>

          {/* Table Section */}
          <div className="rounded-2xl border border-white/10 bg-[#0A0A0A]/80 backdrop-blur-xl shadow-[0_0_40px_rgba(0,0,0,0.2)] overflow-hidden">
            <ReusableTable
              data={tableData}
              headers={headers}
              isLoading={isLoading}
              enableSearch={true}
              searchPlaceholder="Search services..."
              pageSize={pageSize}
              setPageSize={setPageSize}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
              headerVariant="neon"
            />
          </div>

          {/* Our Service Form Dialog */}
          <OurServiceForm
            open={showDialog}
            onOpenChange={setShowDialog}
            editingService={editingService}
            onSuccess={() => {
              const isEdit = !!editingService;
              toast.success(isEdit ? "Service updated successfully!" : "Service created successfully!");
              setEditingService(null);
              refetch();
            }}
          />

          {/* Confirmation Modal */}
          <ConfirmActionModal
            isOpen={showConfirmModal}
            onClose={() => {
              setShowConfirmModal(false);
              setServiceForAction(null);
            }}
            onConfirm={handleConfirmDelete}
            action="delete"
            description={getDeleteDescription()}
            itemName="service"
            loading={isDeleting}
          />
        </div>
      </AppLayout>
    </PrivateRoute>
  );
}

export default function OurServicePage() {
  return (
    <Suspense 
      fallback={
        <PrivateRoute>
          <AppLayout>
            <div className="max-w-[1600px] w-full mx-auto px-4 py-8">
              <div className="flex items-center justify-center h-96">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#EFFC76] mx-auto mb-4" />
                  <p className="text-white/70">Loading services...</p>
                </div>
              </div>
            </div>
          </AppLayout>
        </PrivateRoute>
      }
    >
      <OurServiceContent />
    </Suspense>
  );
}
