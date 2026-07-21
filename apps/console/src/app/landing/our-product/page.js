"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2, Eye, Search, ShoppingBag, Layers, Users, Link, Sparkles } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import ConfirmActionModal from "@/components/modal/ConfirmActionModal";
import OurProductForm from "@/components/landing/landing-page-from/our-product/OurProductForm";
import ModernPagination from "@/components/table/modern-pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  useGetOurProductsQuery,
  useDeleteOurProductMutation,
} from "@/api/landing/our-product/ourProductApi";
import PrivateRoute from "@/components/auth/PrivateRoute";
import AppLayout from "@/components/layout/AppLayout";

export default function OurProductPage() {
  return (
    <React.Suspense fallback={<div className="flex h-screen items-center justify-center bg-black text-white">Loading...</div>}>
      <OurProductPageContent />
    </React.Suspense>
  );
}

function OurProductPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showDialog, setShowDialog] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [productForAction, setProductForAction] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // API hooks
  const { data: productsData, isLoading, refetch } = useGetOurProductsQuery();
  const [deleteProduct, { isLoading: isDeleting }] = useDeleteOurProductMutation();

  const products = productsData?.data || productsData || [];

  // Filter products based on search term
  const filteredProducts = products.filter((product) => {
    const term = searchTerm.toLowerCase();
    const name = product.name?.toLowerCase() || "";
    const category = product.categoryId ? `category ${product.categoryId}` : "";
    return name.includes(term) || category.includes(term);
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + pageSize);

  // Reset page when search term changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  // Handle edit query parameter
  useEffect(() => {
    const editId = searchParams.get("edit");
    if (editId && products.length > 0) {
      const productToEdit = products.find(
        (product) => (product.id || product._id) === editId
      );
      if (productToEdit) {
        setEditingProduct(productToEdit);
        setShowDialog(true);
        router.replace("/landing/our-product", { scroll: false });
      }
    }
  }, [searchParams, products, router]);

  const handleAdd = () => {
    setEditingProduct(null);
    setShowDialog(true);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowDialog(true);
  };

  const handleDeleteClick = (product) => {
    setProductForAction(product);
    setShowConfirmModal(true);
  };

  const handleConfirmDelete = async () => {
    if (!productForAction) return;

    const product = productForAction;
    const productId = product.id || product._id;
    const productName = product.name || "Product";
    const toastId = toast.loading("Deleting product...");

    try {
      await deleteProduct(productId).unwrap();
      toast.success(`Product "${productName}" deleted successfully!`, { id: toastId });
      setShowConfirmModal(false);
      setProductForAction(null);
      refetch();
    } catch (error) {
      toast.error(error?.data?.message || "Failed to delete product", { id: toastId });
    }
  };

  const getDeleteDescription = () => {
    if (!productForAction) return "";
    const productName = productForAction.name || "Product";
    return `Are you sure you want to delete "${productName}"? This action cannot be undone.`;
  };

  return (
    <PrivateRoute>
      <AppLayout>
        <div className="px-4 sm:px-8 py-8 min-h-screen text-white">
          <div className="max-w-[1600px] w-full mx-auto space-y-6">
            {/* Header Section */}
            <div className="flex flex-col xl:flex-row justify-between gap-4 mb-6 items-center">
              <div className="flex items-center gap-3 sm:gap-4 w-full xl:w-auto">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#EFFC76]/20 to-transparent blur-xl" />
                  <ShoppingBag className="w-6 h-6 text-[#EFFC76] relative z-10" />
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-white via-white to-white/70 bg-clip-text text-transparent">
                    Our Products
                  </h1>
                  <p className="text-xs text-white/50 mt-0.5 font-medium">
                    Manage your product catalog and details.
                  </p>
                </div>
              </div>
              <Button
                onClick={handleAdd}
                className="w-full sm:w-auto bg-gradient-to-r from-[#EFFC76] to-[#e0ef5f] hover:from-[#e0ef5f] hover:to-[#d0df4f] text-black font-bold shadow-lg shadow-[#EFFC76]/30 hover:shadow-xl hover:shadow-[#EFFC76]/40 transition-all duration-300 hover:scale-105"
              >
                <Plus className="w-4 h-4 mr-1" />
                <span>Add Product</span>
              </Button>
            </div>

            {/* Search Bar */}
            <div className="flex items-center gap-2 w-full sm:max-w-sm bg-white/5 border-none rounded-lg px-3 py-1 shadow-sm focus-within:ring-1 focus-within:ring-[#EFFC76] transition-all">
              <Search className="w-4 h-4 text-white/40" />
              <Input 
                type="text" 
                placeholder="Search products..." 
                className="border-0 bg-transparent shadow-none focus-visible:ring-0 px-0 h-8 text-sm text-white placeholder:text-white/40 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Table Section */}
            <div className="bg-[#1A1A1A] rounded-xl sm:rounded-2xl overflow-hidden overflow-x-auto border border-white/5">
              <Table>
                <TableHeader className="bg-[#1A1A1A]">
                  <TableRow className="border-white/5 hover:bg-transparent">
                    <TableHead className="text-[#EFFC76] font-bold uppercase text-xs sm:text-sm py-5">
                      <div className="flex items-center gap-2">
                        <ShoppingBag className="w-4 h-4 text-[#EFFC76]" />
                        Name
                      </div>
                    </TableHead>
                    <TableHead className="text-[#EFFC76] font-bold uppercase text-xs sm:text-sm py-5">
                      <div className="flex items-center gap-2">
                        <Layers className="w-4 h-4 text-[#EFFC76]" />
                        Category
                      </div>
                    </TableHead>
                    <TableHead className="text-[#EFFC76] font-bold uppercase text-xs sm:text-sm py-5">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-[#EFFC76]" />
                        Features
                      </div>
                    </TableHead>
                    <TableHead className="text-[#EFFC76] font-bold uppercase text-xs sm:text-sm py-5">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-[#EFFC76]" />
                        Total Users
                      </div>
                    </TableHead>
                    <TableHead className="text-[#EFFC76] font-bold uppercase text-xs sm:text-sm py-5">
                      <div className="flex items-center gap-2">
                        <Link className="w-4 h-4 text-[#EFFC76]" />
                        URL
                      </div>
                    </TableHead>
                    <TableHead className="text-right text-[#EFFC76] font-bold uppercase text-xs sm:text-sm py-5">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    <TableRow>
                      <TableCell colSpan={6} className="h-24 text-center text-white/60">
                        Loading products...
                      </TableCell>
                    </TableRow>
                  ) : paginatedProducts.length > 0 ? (
                    paginatedProducts.map((product) => (
                      <TableRow
                        key={product.id || product._id}
                        className="hover:bg-white/5 cursor-pointer transition-colors border-white/5 group"
                      >
                        <TableCell className="font-medium text-white text-xs sm:text-sm whitespace-nowrap group-hover:text-[#EFFC76] transition-colors">
                          {product.name}
                        </TableCell>
                        <TableCell className="text-white/80 text-xs sm:text-sm whitespace-nowrap group-hover:text-[#EFFC76] transition-colors">
                          {product.categoryId ? `Category ${product.categoryId}` : "N/A"}
                        </TableCell>
                        <TableCell className="text-white/60 text-xs sm:text-sm whitespace-nowrap group-hover:text-[#EFFC76] transition-colors">
                          {Array.isArray(product.feature) ? product.feature.length : 0}
                        </TableCell>
                        <TableCell className="text-white/60 text-xs sm:text-sm whitespace-nowrap group-hover:text-[#EFFC76] transition-colors">
                          {product.totalUser || 0}
                        </TableCell>
                        <TableCell className="text-white/60 text-xs sm:text-sm whitespace-nowrap group-hover:text-[#EFFC76] transition-colors">
                          {product.url ? (
                            <a 
                              href={product.url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="hover:underline truncate max-w-xs block"
                              onClick={(e) => e.stopPropagation()}
                            >
                              {product.url}
                            </a>
                          ) : "N/A"}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-white/70 hover:text-[#EFFC76] hover:bg-white/10"
                              onClick={(e) => {
                                e.stopPropagation();
                                router.push(`/landing/our-product/${product.id || product._id}`);
                              }}
                              title="View Details"
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-white/70 hover:text-[#EFFC76] hover:bg-white/10"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleEdit(product);
                              }}
                              title="Edit"
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-red-400 hover:text-red-300 hover:bg-red-500/15"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteClick(product);
                              }}
                              title="Delete"
                              disabled={isDeleting}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="h-24 text-center text-white/60 text-sm">
                        No products found matching "{searchTerm}"
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            {!isLoading && filteredProducts.length > 0 && (
              <ModernPagination
                totalItems={filteredProducts.length}
                itemsPerPage={pageSize}
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
                onItemsPerPageChange={(newPageSize) => {
                  setPageSize(newPageSize);
                  setCurrentPage(1);
                }}
              />
            )}
          </div>
        </div>

        {/* Our Product Form Dialog */}
        <OurProductForm
          open={showDialog}
          onOpenChange={setShowDialog}
          editingProduct={editingProduct}
          onSuccess={() => {
            const isEdit = !!editingProduct;
            toast.success(isEdit ? "Product updated successfully!" : "Product created successfully!");
            setEditingProduct(null);
            refetch();
          }}
        />

        {/* Confirmation Modal */}
        <ConfirmActionModal
          isOpen={showConfirmModal}
          onClose={() => {
            setShowConfirmModal(false);
            setProductForAction(null);
          }}
          onConfirm={handleConfirmDelete}
          title="Delete Product"
          description={getDeleteDescription()}
        />
      </AppLayout>
    </PrivateRoute>
  );
}
