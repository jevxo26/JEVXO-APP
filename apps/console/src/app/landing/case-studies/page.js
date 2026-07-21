"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2, Eye, Briefcase } from "lucide-react";
import { toast } from "sonner";
import ReusableTable from "@/components/table/reusable-table";
import DeleteConfirmModal from "@/components/modal/DeleteConfirmModal";
import CaseStudyForm from "@/components/landing/landing-page-from/case-studies/CaseStudyForm";
import {
  useGetCaseStudiesQuery,
  useDeleteCaseStudyMutation,
} from "@/api/landing/case-studies/caseStudiesApi";
import PrivateRoute from "@/components/auth/PrivateRoute";
import AppLayout from "@/components/layout/AppLayout";
import Image from "next/image";

export default function CaseStudiesPage() {
  const router = useRouter();
  const [showDialog, setShowDialog] = useState(false);
  const [editingCaseStudy, setEditingCaseStudy] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [caseStudyToDelete, setCaseStudyToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // API hooks
  const {
    data: caseStudiesData,
    isLoading,
    refetch,
  } = useGetCaseStudiesQuery();
  const [deleteCaseStudy, { isLoading: isDeleting }] =
    useDeleteCaseStudyMutation();

  const caseStudies = caseStudiesData?.data || caseStudiesData || [];

  // Table headers
  const headers = [
    { label: "Title", field: "title" },
    { label: "Description", field: "description" },
    { label: "Industry", field: "industry" },
    { label: "Status", field: "status" },
    { label: "Duration", field: "duration" },
    { label: "Actions", field: "actions" },
  ];

  // Format data for table
  const tableData = caseStudies.map((caseStudy) => ({
    ...caseStudy,
    actions: (
      <div className="flex items-center gap-2 justify-center">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-white/70 hover:text-[#EFFC76] hover:bg-[#EFFC76]/10"
          onClick={() => handleView(caseStudy)}
          title="View Details"
        >
          <Eye className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-white/70 hover:text-[#EFFC76] hover:bg-[#EFFC76]/10"
          onClick={() => handleEdit(caseStudy)}
          title="Edit"
        >
          <Edit className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-red-400 hover:text-red-300 hover:bg-red-500/10"
          onClick={() => handleDeleteClick(caseStudy)}
          title="Delete"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    ),
  }));

  const handleAdd = () => {
    setEditingCaseStudy(null);
    setShowDialog(true);
  };

  const handleView = (caseStudy) => {
    const id = caseStudy.id || caseStudy._id;
    router.push(`/landing/case-studies/${id}`);
  };

  const handleEdit = (caseStudy) => {
    setEditingCaseStudy(caseStudy);
    setShowDialog(true);
  };

  const handleDeleteClick = (caseStudy) => {
    setCaseStudyToDelete(caseStudy);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (!caseStudyToDelete) return;

    try {
      await deleteCaseStudy(
        caseStudyToDelete.id || caseStudyToDelete._id,
      ).unwrap();
      toast.success("Case study deleted successfully!");
      setShowDeleteModal(false);
      setCaseStudyToDelete(null);
      refetch();
    } catch (error) {
      toast.error(error?.data?.message || "Failed to delete case study");
    }
  };

  const handleFormSuccess = () => {
    setEditingCaseStudy(null);
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
                    <Briefcase className="w-5 h-5 text-[#EFFC76]" />
                  </div>
                  <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                    Case Studies
                  </h1>
                </div>
                <p className="text-sm md:text-base text-white/60 max-w-xl leading-relaxed">
                  Showcase your success stories. Manage client projects,
                  results, and testimonials.
                </p>
              </div>

              <div className="relative z-10 w-full md:w-auto">
                <Button
                  onClick={handleAdd}
                  className="w-full md:w-auto bg-[#EFFC76] hover:bg-[#dce865] text-black shadow-[0_0_20px_rgba(239,252,118,0.2)] hover:shadow-[0_0_30px_rgba(239,252,118,0.4)] transition-all duration-300 border-none font-semibold px-6 h-12 text-base rounded-xl"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Add Case Study
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
                searchPlaceholder="Search case studies..."
                pageSize={pageSize}
                setPageSize={setPageSize}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
                headerVariant="neon"
              />
            </div>

            {/* Case Study Form Dialog */}
            <CaseStudyForm
              open={showDialog}
              onOpenChange={setShowDialog}
              editingCaseStudy={editingCaseStudy}
              onSuccess={handleFormSuccess}
            />

            {/* Delete Confirmation Modal */}
            <DeleteConfirmModal
              isOpen={showDeleteModal}
              onClose={() => {
                setShowDeleteModal(false);
                setCaseStudyToDelete(null);
              }}
              onConfirm={handleDeleteConfirm}
              count={1}
              itemName="case study"
              loading={isDeleting}
            />
          </div>
        </div>
      </AppLayout>
    </PrivateRoute>
  );
}
