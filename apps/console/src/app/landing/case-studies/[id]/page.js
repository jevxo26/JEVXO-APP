"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  ExternalLink,
  Building2,
  Clock,
  CheckCircle2,
  Image as ImageIcon,
  Link as LinkIcon,
  FileText,
  Target,
  Lightbulb,
  TrendingUp,
  Edit,
  Trash2,
} from "lucide-react";
import {
  useGetCaseStudyByIdQuery,
  useDeleteCaseStudyMutation,
} from "@/api/landing/case-studies/caseStudiesApi";
import { useGetCategoriesQuery } from "@/api/landing/category/categoryApi";
import { useGetClientsQuery } from "@/api/landing/client/clientApi";
import PrivateRoute from "@/components/auth/PrivateRoute";
import AppLayout from "@/components/layout/AppLayout";
import CaseStudyForm from "@/components/landing/landing-page-from/case-studies/CaseStudyForm";
import DeleteConfirmModal from "@/components/modal/DeleteConfirmModal";
import { toast } from "sonner";

export default function CaseStudyDetailPage() {
  const params = useParams();
  const router = useRouter();
  const caseStudyId = params.id;

  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const {
    data: caseStudyData,
    isLoading,
    error,
    refetch,
  } = useGetCaseStudyByIdQuery(caseStudyId);
  const [deleteCaseStudy, { isLoading: isDeleting }] =
    useDeleteCaseStudyMutation();
  const { data: categoriesData } = useGetCategoriesQuery();
  const { data: clientsData } = useGetClientsQuery();

  const caseStudy = caseStudyData?.data || caseStudyData;
  const categories = categoriesData?.data || categoriesData || [];
  const clients = clientsData?.data || clientsData || [];

  const handleDeleteConfirm = async () => {
    try {
      await deleteCaseStudy(caseStudyId).unwrap();
      toast.success("Case study deleted successfully!");
      router.push("/landing/case-studies");
    } catch (error) {
      toast.error(error?.data?.message || "Failed to delete case study");
    }
  };

  const handleEditSuccess = () => {
    refetch();
  };

  if (isLoading) {
    return (
      <div className="max-w-[1600px] w-full mx-auto px-4 py-8">
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#EFFC76] mx-auto mb-4"></div>
            <p className="text-white/60">Loading case study details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !caseStudy) {
    return (
      <div className="max-w-[1600px] w-full mx-auto px-4 py-8">
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <p className="text-red-500 mb-4">Failed to load case study</p>
            <Button
              onClick={() => router.back()}
              variant="outline"
              className="border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Get category names
  const getCategoryNames = () => {
    if (!caseStudy.categories || caseStudy.categories.length === 0) return [];
    return caseStudy.categories.map((cat) => {
      // If category is an object with name property, use it directly
      if (typeof cat === "object" && cat.name) {
        return cat.name;
      }
      // If category is an object with id/_id, find the category name
      if (
        typeof cat === "object" &&
        (cat.id !== undefined || cat._id !== undefined)
      ) {
        const catId = cat.id || cat._id;
        const category = categories.find((c) => (c.id || c._id) === catId);
        return category?.name || `Category ${catId}`;
      }
      // If category is just an ID (number or string), find the category name
      const catId = cat;
      const category = categories.find((c) => (c.id || c._id) === catId);
      return category?.name || `Category ${catId}`;
    });
  };

  // Get client name
  const getClientName = () => {
    if (!caseStudy.clientId) return null;
    const client = clients.find((c) => (c.id || c._id) === caseStudy.clientId);
    return (
      client?.name || client?.companyName || `Client #${caseStudy.clientId}`
    );
  };

  const categoryNames = getCategoryNames();
  const clientName = getClientName();

  return (
    <PrivateRoute>
      <AppLayout>
        <div className="max-w-[1600px] w-full mx-auto px-4 py-8 text-white">
          {/* Header Actions */}
          <div className="flex items-center justify-between mb-6">
            <Button
              variant="ghost"
              onClick={() => router.back()}
              className="gap-2 text-white/60 hover:text-white hover:bg-white/5"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Case Studies
            </Button>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                onClick={() => setShowEditDialog(true)}
                className="gap-2 border-white/20 bg-white/5 text-white hover:bg-[#EFFC76]/10 hover:text-[#EFFC76] hover:border-[#EFFC76]/50 transition-colors"
              >
                <Edit className="w-4 h-4" />
                Edit
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowDeleteModal(true)}
                className="gap-2 border-red-500/30 bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:text-red-300 hover:border-red-500/50 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </Button>
            </div>
          </div>

          {/* Hero Section with Cover Image */}
          <div className="mb-6 overflow-hidden rounded-xl border border-white/10 bg-[#0A0A0A]">
            {caseStudy.imageUrl && (
              <div className="relative w-full h-64 md:h-96">
                <img
                  src={caseStudy.imageUrl}
                  alt={caseStudy.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
                  <div className="flex items-center gap-2 mb-3 flex-wrap">
                    {caseStudy.badge && (
                      <Badge className="bg-[#EFFC76] text-black hover:bg-[#EFFC76]/90 border-none">
                        Featured
                      </Badge>
                    )}
                    <Badge
                      variant="outline"
                      className="bg-white/10 text-white border-white/20 backdrop-blur-md"
                    >
                      {caseStudy.status?.charAt(0).toUpperCase() +
                        caseStudy.status?.slice(1)}
                    </Badge>
                  </div>
                  <h1 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4 text-white leading-tight">
                    {caseStudy.title}
                  </h1>
                  {caseStudy.description && (
                    <p className="text-base md:text-xl text-white/80 max-w-3xl leading-relaxed">
                      {caseStudy.description}
                    </p>
                  )}
                </div>
              </div>
            )}
            {!caseStudy.imageUrl && (
              <div className="p-8 bg-[#0A0A0A] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#EFFC76]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                <div className="flex items-center gap-2 mb-3 relative z-10">
                  {caseStudy.badge && (
                    <Badge className="bg-[#EFFC76] text-black hover:bg-[#EFFC76]/90 border-none">
                      Featured
                    </Badge>
                  )}
                  <Badge
                    variant="outline"
                    className="bg-white/5 text-white border-white/20"
                  >
                    {caseStudy.status?.charAt(0).toUpperCase() +
                      caseStudy.status?.slice(1)}
                  </Badge>
                </div>
                <h1 className="text-3xl md:text-5xl font-bold mb-3 relative z-10 text-white">
                  {caseStudy.title}
                </h1>
                {caseStudy.description && (
                  <p className="text-base md:text-xl text-white/80 relative z-10 max-w-4xl">
                    {caseStudy.description}
                  </p>
                )}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Project Details Section */}
              <div className="rounded-xl border border-white/10 bg-[#0A0A0A] p-6 shadow-[0_0_40px_rgba(0,0,0,0.2)]">
                <div className="flex items-center gap-2 mb-6">
                  <Building2 className="w-5 h-5 text-[#EFFC76]" />
                  <h2 className="text-xl font-bold">Project Details</h2>
                </div>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {clientName && (
                      <div className="flex items-start gap-3 p-4 rounded-lg bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
                        <Building2 className="w-5 h-5 text-white/40 mt-1" />
                        <div>
                          <p className="text-sm text-white/40 mb-1">Client</p>
                          <p className="font-medium text-white">{clientName}</p>
                        </div>
                      </div>
                    )}
                    {caseStudy.industry && (
                      <div className="flex items-start gap-3 p-4 rounded-lg bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
                        <Target className="w-5 h-5 text-white/40 mt-1" />
                        <div>
                          <p className="text-sm text-white/40 mb-1">Industry</p>
                          <p className="font-medium text-white">
                            {caseStudy.industry}
                          </p>
                        </div>
                      </div>
                    )}
                    {caseStudy.duration && (
                      <div className="flex items-start gap-3 p-4 rounded-lg bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
                        <Clock className="w-5 h-5 text-white/40 mt-1" />
                        <div>
                          <p className="text-sm text-white/40 mb-1">Duration</p>
                          <p className="font-medium text-white">
                            {caseStudy.duration}
                          </p>
                        </div>
                      </div>
                    )}
                    {categoryNames.length > 0 && (
                      <div className="flex items-start gap-3 p-4 rounded-lg bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
                        <FileText className="w-5 h-5 text-white/40 mt-1" />
                        <div>
                          <p className="text-sm text-white/40 mb-2">
                            Categories
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {categoryNames.map((name, idx) => (
                              <span
                                key={idx}
                                className="px-2 py-1 rounded text-xs bg-[#EFFC76]/10 text-[#EFFC76] border border-[#EFFC76]/20"
                              >
                                {name}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Features Section */}
              {caseStudy.features && caseStudy.features.length > 0 && (
                <div className="rounded-xl border border-white/10 bg-[#0A0A0A] p-6 shadow-[0_0_40px_rgba(0,0,0,0.2)]">
                  <div className="flex items-center gap-2 mb-6">
                    <CheckCircle2 className="w-5 h-5 text-[#EFFC76]" />
                    <h2 className="text-xl font-bold">Key Features</h2>
                  </div>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {caseStudy.features.map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors"
                      >
                        <CheckCircle2 className="w-5 h-5 text-[#EFFC76] mt-0.5 flex-shrink-0" />
                        <span className="text-white/80">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Case Study Content Section */}
              <div className="rounded-xl border border-white/10 bg-[#0A0A0A] p-6 shadow-[0_0_40px_rgba(0,0,0,0.2)]">
                <div className="flex items-center gap-2 mb-6">
                  <FileText className="w-5 h-5 text-[#EFFC76]" />
                  <h2 className="text-xl font-bold">Case Study Content</h2>
                </div>
                <div className="space-y-8">
                  {caseStudy.problem_statement && (
                    <div className="bg-white/5 rounded-xl p-6 border border-white/5">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-lg bg-red-500/10 border border-red-500/20">
                          <Target className="w-5 h-5 text-red-500" />
                        </div>
                        <h3 className="text-lg font-bold text-white">
                          Problem Statement
                        </h3>
                      </div>
                      <p className="text-white/70 leading-relaxed">
                        {caseStudy.problem_statement}
                      </p>
                    </div>
                  )}

                  {caseStudy.solution_overview && (
                    <div className="bg-white/5 rounded-xl p-6 border border-white/5">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-lg bg-[#EFFC76]/10 border border-[#EFFC76]/20">
                          <Lightbulb className="w-5 h-5 text-[#EFFC76]" />
                        </div>
                        <h3 className="text-lg font-bold text-white">
                          Solution Overview
                        </h3>
                      </div>
                      <p className="text-white/70 leading-relaxed">
                        {caseStudy.solution_overview}
                      </p>
                    </div>
                  )}

                  {caseStudy.results && (
                    <div className="bg-white/5 rounded-xl p-6 border border-white/5">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-lg bg-green-500/10 border border-green-500/20">
                          <TrendingUp className="w-5 h-5 text-green-500" />
                        </div>
                        <h3 className="text-lg font-bold text-white">
                          Results
                        </h3>
                      </div>
                      <p className="text-white/70 leading-relaxed">
                        {caseStudy.results}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Project Images Gallery */}
              {caseStudy.projectimage &&
                caseStudy.projectimage.length > 0 &&
                caseStudy.projectimage.some(
                  (img) => img && img.trim() !== "",
                ) && (
                  <div className="rounded-xl border border-white/10 bg-[#0A0A0A] p-6 shadow-[0_0_40px_rgba(0,0,0,0.2)]">
                    <div className="flex items-center gap-2 mb-6">
                      <ImageIcon className="w-5 h-5 text-[#EFFC76]" />
                      <h2 className="text-xl font-bold">Project Images</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {caseStudy.projectimage
                        .filter((img) => img && img.trim() !== "")
                        .map((imageUrl, index) => (
                          <div
                            key={index}
                            className="relative group overflow-hidden rounded-lg border border-white/10"
                          >
                            <img
                              src={imageUrl}
                              alt={`Project image ${index + 1}`}
                              className="w-full h-64 object-cover rounded-lg transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                          </div>
                        ))}
                    </div>
                  </div>
                )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Links */}
              {(caseStudy.caseStudyUrl || caseStudy.liveUrl) && (
                <div className="rounded-xl border border-white/10 bg-[#0A0A0A] p-6 shadow-[0_0_40px_rgba(0,0,0,0.2)]">
                  <div className="flex items-center gap-2 mb-6">
                    <LinkIcon className="w-5 h-5 text-[#EFFC76]" />
                    <h2 className="text-xl font-bold">Quick Links</h2>
                  </div>
                  <div className="space-y-3">
                    {caseStudy.caseStudyUrl && (
                      <Button
                        variant="outline"
                        className="w-full justify-start gap-2 bg-white/5 border-white/10 text-white hover:bg-white/10 hover:text-white h-12"
                        onClick={() =>
                          window.open(caseStudy.caseStudyUrl, "_blank")
                        }
                      >
                        <ExternalLink className="w-4 h-4 text-[#EFFC76]" />
                        View Case Study
                      </Button>
                    )}
                    {caseStudy.liveUrl && (
                      <Button
                        variant="outline"
                        className="w-full justify-start gap-2 bg-white/5 border-white/10 text-white hover:bg-white/10 hover:text-white h-12"
                        onClick={() => window.open(caseStudy.liveUrl, "_blank")}
                      >
                        <ExternalLink className="w-4 h-4 text-[#EFFC76]" />
                        Visit Live Site
                      </Button>
                    )}
                  </div>
                </div>
              )}

              {/* Summary Card */}
              <div className="rounded-xl border border-white/10 bg-[#0A0A0A] p-6 shadow-[0_0_40px_rgba(0,0,0,0.2)]">
                <div className="mb-6">
                  <h2 className="text-xl font-bold">Summary</h2>
                </div>
                <div className="space-y-6 text-sm">
                  <div className="pb-4 border-b border-white/10">
                    <p className="text-white/40 mb-2">Status</p>
                    <Badge
                      variant="outline"
                      className="bg-[#EFFC76]/10 text-[#EFFC76] border-[#EFFC76]/20"
                    >
                      {caseStudy.status?.charAt(0).toUpperCase() +
                        caseStudy.status?.slice(1)}
                    </Badge>
                  </div>
                  {caseStudy.badge && (
                    <div className="pb-4 border-b border-white/10">
                      <p className="text-white/40 mb-2">Featured</p>
                      <Badge className="bg-[#EFFC76] text-black border-none">
                        Yes
                      </Badge>
                    </div>
                  )}
                  {categoryNames.length > 0 && (
                    <div>
                      <p className="text-white/40 mb-2">Categories</p>
                      <div className="flex flex-wrap gap-2">
                        {categoryNames.map((name, idx) => (
                          <Badge
                            key={idx}
                            variant="secondary"
                            className="bg-white/5 text-white/80 hover:bg-white/10 border-none"
                          >
                            {name}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Modals */}
          <CaseStudyForm
            open={showEditDialog}
            onOpenChange={setShowEditDialog}
            editingCaseStudy={caseStudy}
            onSuccess={handleEditSuccess}
          />

          <DeleteConfirmModal
            isOpen={showDeleteModal}
            onClose={() => setShowDeleteModal(false)}
            onConfirm={handleDeleteConfirm}
            count={1}
            itemName="case study"
            loading={isDeleting}
          />
        </div>
      </AppLayout>
    </PrivateRoute>
  );
}
