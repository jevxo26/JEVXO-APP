"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Plus,
  Edit,
  Trash2,
  User,
  MessageSquare,
  Star,
  Tag,
  Activity,
  CheckCircle,
  Quote,
} from "lucide-react";
import { toast } from "sonner";
import ReusableTable from "@/components/table/reusable-table";
import DeleteConfirmModal from "@/components/modal/DeleteConfirmModal";
import CustomerReviewForm from "@/components/landing/landing-page-from/customer-review/CustomerReviewForm";
import AppLayout from "@/components/layout/AppLayout";
import PrivateRoute from "@/components/auth/PrivateRoute";
import {
  useGetCustomerReviewsQuery,
  useDeleteCustomerReviewMutation,
} from "@/api/landing/customer-review/customerReviewApi";

export default function CustomerReviewPage() {
  const [showDialog, setShowDialog] = useState(false);
  const [editingReview, setEditingReview] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [reviewToDelete, setReviewToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // API hooks
  const {
    data: reviewsData,
    isLoading,
    refetch,
  } = useGetCustomerReviewsQuery();
  const [deleteCustomerReview, { isLoading: isDeleting }] =
    useDeleteCustomerReviewMutation();

  const reviews = reviewsData?.data || reviewsData || [];

  // Table headers
  const headers = [
    {
      label: (
        <div className="flex items-center gap-2">
          <User className="w-4 h-4 text-blue-400" />
          <span>Client ID</span>
        </div>
      ),
      field: "client_id",
    },
    {
      label: (
        <div className="flex items-center gap-2">
          <Quote className="w-4 h-4 text-purple-400" />
          <span>Review Title</span>
        </div>
      ),
      field: "review_title",
    },
    {
      label: (
        <div className="flex items-center gap-2">
          <Star className="w-4 h-4 text-yellow-400" />
          <span>Rating</span>
        </div>
      ),
      field: "rating",
    },
    {
      label: (
        <div className="flex items-center gap-2">
          <Tag className="w-4 h-4 text-pink-400" />
          <span>Review Type</span>
        </div>
      ),
      field: "review_type",
    },
    {
      label: (
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-green-400" />
          <span>Status</span>
        </div>
      ),
      field: "status",
    },
    {
      label: (
        <div className="flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-orange-400" />
          <span>Featured</span>
        </div>
      ),
      field: "is_featured",
    },
    {
      label: "Actions",
      field: "actions",
    },
  ];

  // Format data for table
  const tableData = reviews.map((review) => ({
    ...review,
    rating: (
      <div className="flex items-center gap-1">
        <span className="font-semibold text-white">{review.rating}</span>
        <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
      </div>
    ),
    review_type: review.review_type ? (
      <span className="capitalize px-2 py-1 rounded-md bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs font-medium">
        {review.review_type}
      </span>
    ) : (
      <span className="text-gray-500 text-sm italic">-</span>
    ),
    status: review.status ? (
      <span
        className={`capitalize px-2 py-1 rounded-md text-xs font-medium border ${
          review.status === "approved"
            ? "bg-green-500/10 text-green-400 border-green-500/20"
            : review.status === "rejected"
              ? "bg-red-500/10 text-red-400 border-red-500/20"
              : "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
        }`}
      >
        {review.status}
      </span>
    ) : (
      <span className="text-gray-500 text-sm italic">-</span>
    ),
    is_featured: review.is_featured ? (
      <span className="px-2 py-1 rounded-md bg-purple-500/10 text-purple-400 border border-purple-500/20 text-xs font-medium">
        Featured
      </span>
    ) : (
      <span className="text-gray-500 text-sm italic">-</span>
    ),
    actions: (
      <div className="flex items-center gap-2 justify-center">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 hover:bg-white/10 hover:text-white transition-colors"
          onClick={() => handleEdit(review)}
          title="Edit"
        >
          <Edit className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-red-400 hover:text-red-300 hover:bg-red-400/10 transition-colors"
          onClick={() => handleDeleteClick(review)}
          title="Delete"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    ),
  }));

  const handleAdd = () => {
    setEditingReview(null);
    setShowDialog(true);
  };

  const handleEdit = (review) => {
    setEditingReview(review);
    setShowDialog(true);
  };

  const handleDeleteClick = (review) => {
    setReviewToDelete(review);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (!reviewToDelete) return;

    try {
      await deleteCustomerReview(
        reviewToDelete.id || reviewToDelete._id,
      ).unwrap();
      toast.success("Customer review deleted successfully!");
      setShowDeleteModal(false);
      setReviewToDelete(null);
      refetch();
    } catch (error) {
      toast.error(error?.data?.message || "Failed to delete customer review");
    }
  };

  const handleFormSuccess = () => {
    setEditingReview(null);
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
                  <MessageSquare className="w-8 h-8 text-[#EFFC76]" />
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                    Customer Reviews
                  </h1>
                  <p className="text-sm md:text-base text-white/40 mt-1">
                    Manage and moderate customer feedback
                  </p>
                </div>
              </div>
            </div>

            <Button
              onClick={handleAdd}
              className="w-full md:w-auto bg-[#EFFC76] hover:bg-[#dbe86c] text-black font-semibold h-12 px-6 rounded-xl shadow-[0_0_20px_rgba(239,252,118,0.2)] hover:shadow-[0_0_30px_rgba(239,252,118,0.3)] transition-all duration-300"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add Customer Review
            </Button>
          </div>

          {/* Table Section */}
          <div className="rounded-2xl border border-white/10 bg-[#0A0A0A]/80 backdrop-blur-xl shadow-[0_0_40px_rgba(0,0,0,0.2)] overflow-hidden">
            <ReusableTable
              data={tableData}
              headers={headers}
              isLoading={isLoading}
              enableSearch={true}
              searchPlaceholder="Search customer reviews..."
              pageSize={pageSize}
              setPageSize={setPageSize}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
              headerVariant="neon"
            />
          </div>

          {/* Customer Review Form Dialog */}
          <CustomerReviewForm
            open={showDialog}
            onOpenChange={setShowDialog}
            editingReview={editingReview}
            onSuccess={handleFormSuccess}
          />

          {/* Delete Confirmation Modal */}
          <DeleteConfirmModal
            isOpen={showDeleteModal}
            onClose={() => {
              setShowDeleteModal(false);
              setReviewToDelete(null);
            }}
            onConfirm={handleDeleteConfirm}
            count={1}
            itemName="customer review"
            loading={isDeleting}
          />
        </div>
      </AppLayout>
    </PrivateRoute>
  );
}
