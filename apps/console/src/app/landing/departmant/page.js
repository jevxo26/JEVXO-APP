"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2, Building2, FileText } from "lucide-react";
import { toast } from "sonner";
import ReusableTable from "@/components/table/reusable-table";
import DeleteConfirmModal from "@/components/modal/DeleteConfirmModal";
import DepartmentForm from "@/components/landing/landing-page-from/departmnat/DepartmentFrom";
import { 
  useGetDepartmentsQuery, 
  useDeleteDepartmentMutation 
} from "@/api/landing/department/departmentApi";
import PrivateRoute from "@/components/auth/PrivateRoute";
import AppLayout from "@/components/layout/AppLayout";

export default function DepartmentPage() {
  const [showDialog, setShowDialog] = useState(false);
  const [editingDepartment, setEditingDepartment] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [departmentToDelete, setDepartmentToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // API hooks
  const { data: departmentsData, isLoading, refetch } = useGetDepartmentsQuery();
  const [deleteDepartment, { isLoading: isDeleting }] = useDeleteDepartmentMutation();

  const departments = departmentsData?.data || departmentsData || [];

  // Table headers
  const headers = [
    { 
      label: (
        <div className="flex items-center gap-2">
          <Building2 className="w-4 h-4 text-[#EFFC76]" />
          Name
        </div>
      ), 
      field: "name" 
    },
    { 
      label: (
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-[#EFFC76]" />
          Description
        </div>
      ), 
      field: "description" 
    },
    { 
      label: "Actions", 
      field: "actions" 
    },
  ];

  // Format data for table
  const tableData = departments.map((department) => ({
    ...department,
    actions: (
      <div className="flex items-center gap-2 justify-center">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 hover:bg-white/10 hover:text-white transition-colors"
          onClick={() => handleEdit(department)}
          title="Edit"
        >
          <Edit className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-red-400 hover:text-red-300 hover:bg-red-400/10 transition-colors"
          onClick={() => handleDeleteClick(department)}
          title="Delete"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    ),
  }));

  const handleAdd = () => {
    setEditingDepartment(null);
    setShowDialog(true);
  };

  const handleEdit = (department) => {
    setEditingDepartment(department);
    setShowDialog(true);
  };

  const handleDeleteClick = (department) => {
    setDepartmentToDelete(department);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (!departmentToDelete) return;

    try {
      await deleteDepartment(departmentToDelete.id || departmentToDelete._id).unwrap();
      toast.success("Department deleted successfully!");
      setShowDeleteModal(false);
      setDepartmentToDelete(null);
      refetch();
    } catch (error) {
      toast.error(error?.data?.message || "Failed to delete department");
    }
  };

  const handleFormSuccess = () => {
    setEditingDepartment(null);
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
                  <Building2 className="w-8 h-8 text-[#EFFC76]" />
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                    Departments
                  </h1>
                  <p className="text-sm md:text-base text-white/40 mt-1">
                    Manage and organize company departments
                  </p>
                </div>
              </div>
            </div>

            <Button
              onClick={handleAdd}
              className="w-full md:w-auto bg-[#EFFC76] hover:bg-[#dbe86c] text-black font-semibold h-12 px-6 rounded-xl shadow-[0_0_20px_rgba(239,252,118,0.2)] hover:shadow-[0_0_30px_rgba(239,252,118,0.3)] transition-all duration-300"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add Department
            </Button>
          </div>

          {/* Table Section */}
          <div className="rounded-2xl border border-white/10 bg-[#0A0A0A]/80 backdrop-blur-xl shadow-[0_0_40px_rgba(0,0,0,0.2)] overflow-hidden">
            <ReusableTable
              data={tableData}
              headers={headers}
              isLoading={isLoading}
              enableSearch={true}
              searchPlaceholder="Search departments..."
              pageSize={pageSize}
              setPageSize={setPageSize}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
              headerVariant="neon"
            />
          </div>

          {/* Department Form Dialog */}
          <DepartmentForm
            open={showDialog}
            onOpenChange={setShowDialog}
            editingDepartment={editingDepartment}
            onSuccess={handleFormSuccess}
          />

          {/* Delete Confirmation Modal */}
          <DeleteConfirmModal
            isOpen={showDeleteModal}
            onClose={() => {
              setShowDeleteModal(false);
              setDepartmentToDelete(null);
            }}
            onConfirm={handleDeleteConfirm}
            count={1}
            itemName="department"
            loading={isDeleting}
          />
        </div>
      </AppLayout>
    </PrivateRoute>
  );
}
