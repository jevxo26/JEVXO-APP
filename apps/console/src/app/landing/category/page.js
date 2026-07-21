"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2, Layers, FileText } from "lucide-react";
import { toast } from "sonner";
import ReusableTable from "@/components/table/reusable-table";
import DeleteConfirmModal from "@/components/modal/DeleteConfirmModal";
import CategoryForm from "@/components/landing/landing-page-from/category/CategoryForm";
import { 
  useGetCategoriesQuery, 
  useDeleteCategoryMutation 
} from "@/api/landing/category/categoryApi";
import PrivateRoute from "@/components/auth/PrivateRoute";
import AppLayout from "@/components/layout/AppLayout";


export default function CategoryPage() {
  const [showDialog, setShowDialog] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // API hooks
  const { data: categoriesData, isLoading, refetch } = useGetCategoriesQuery();
  const [deleteCategory, { isLoading: isDeleting }] = useDeleteCategoryMutation();

  const categories = categoriesData?.data || categoriesData || [];

  // Table headers
  const headers = [
    { 
      label: (
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-[#EFFC76]" />
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
  const tableData = categories.map((category) => ({
    ...category,
    actions: (
      <div className="flex items-center gap-2 justify-center">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 hover:bg-white/10 hover:text-white transition-colors"
          onClick={() => handleEdit(category)}
          title="Edit"
        >
          <Edit className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-red-400 hover:text-red-300 hover:bg-red-400/10 transition-colors"
          onClick={() => handleDeleteClick(category)}
          title="Delete"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    ),
  }));

  const handleAdd = () => {
    setEditingCategory(null);
    setShowDialog(true);
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setShowDialog(true);
  };

  const handleDeleteClick = (category) => {
    setCategoryToDelete(category);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (!categoryToDelete) return;

    try {
      await deleteCategory(categoryToDelete.id || categoryToDelete._id).unwrap();
      toast.success("Category deleted successfully!");
      setShowDeleteModal(false);
      setCategoryToDelete(null);
      refetch();
    } catch (error) {
      toast.error(error?.data?.message || "Failed to delete category");
    }
  };

  const handleFormSuccess = () => {
    setEditingCategory(null);
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
                  <Layers className="w-8 h-8 text-[#EFFC76]" />
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                    Categories
                  </h1>
                  <p className="text-sm md:text-base text-white/40 mt-1">
                    Manage and organize content categories
                  </p>
                </div>
              </div>
            </div>

            <Button
              onClick={handleAdd}
              className="w-full md:w-auto bg-[#EFFC76] hover:bg-[#dbe86c] text-black font-semibold h-12 px-6 rounded-xl shadow-[0_0_20px_rgba(239,252,118,0.2)] hover:shadow-[0_0_30px_rgba(239,252,118,0.3)] transition-all duration-300"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add Category
            </Button>
          </div>

          {/* Table Section */}
          <div className="rounded-2xl border border-white/10 bg-[#0A0A0A]/80 backdrop-blur-xl shadow-[0_0_40px_rgba(0,0,0,0.2)] overflow-hidden">
            <ReusableTable
              data={tableData}
              headers={headers}
              isLoading={isLoading}
              enableSearch={true}
              searchPlaceholder="Search categories..."
              pageSize={pageSize}
              setPageSize={setPageSize}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
              headerVariant="neon"
            />
          </div>

          {/* Category Form Dialog */}
          <CategoryForm
            open={showDialog}
            onOpenChange={setShowDialog}
            editingCategory={editingCategory}
            onSuccess={handleFormSuccess}
          />

          {/* Delete Confirmation Modal */}
          <DeleteConfirmModal
            isOpen={showDeleteModal}
            onClose={() => {
              setShowDeleteModal(false);
              setCategoryToDelete(null);
            }}
            onConfirm={handleDeleteConfirm}
            count={1}
            itemName="category"
            loading={isDeleting}
          />
        </div>
      </AppLayout>
    </PrivateRoute>
  );
}
