"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import TextField from "@/components/input/TextField";
import TextareaField from "@/components/input/TextareaField";
import SelectField from "@/components/input/SelectField";
import { toast } from "sonner";
import { 
  MessageSquare, 
  User, 
  FileText, 
  Star, 
  Tag, 
  CheckCircle2, 
  X,
  Briefcase,
  Layers,
  Activity
} from "lucide-react";
import { 
  useCreateCustomerReviewMutation, 
  useUpdateCustomerReviewMutation 
} from "@/api/landing/customer-review/customerReviewApi";
import { useGetClientsQuery } from "@/api/landing/client/clientApi";
import { useGetCaseStudiesQuery } from "@/api/landing/case-studies/caseStudiesApi";

// Yup validation schema
const customerReviewSchema = yup.object({
  client_id: yup
    .number()
    .required("Client is required")
    .integer("Client ID must be an integer"),
  case_study_id: yup
    .number()
    .nullable()
    .optional()
    .integer("Case study ID must be an integer"),
  rating: yup
    .number()
    .required("Rating is required")
    .min(1, "Rating must be at least 1")
    .max(5, "Rating must be at most 5")
    .integer("Rating must be an integer"),
  review_title: yup
    .string()
    .required("Review title is required")
    .min(2, "Review title must be at least 2 characters")
    .max(200, "Review title must not exceed 200 characters"),
  review_message: yup
    .string()
    .required("Review message is required")
    .min(10, "Review message must be at least 10 characters")
    .max(1000, "Review message must not exceed 1000 characters"),
  review_type: yup
    .string()
    .required("Review type is required")
    .oneOf(["project", "service", "product", "other"], "Invalid review type"),
  is_featured: yup.boolean(),
  status: yup
    .string()
    .required("Status is required")
    .oneOf(["pending", "approved", "rejected"], "Invalid status"),
});

export default function CustomerReviewForm({ 
  open, 
  onOpenChange, 
  editingReview, 
  onSuccess 
}) {
  const [clientOptions, setClientOptions] = useState([]);
  const [caseStudyOptions, setCaseStudyOptions] = useState([]);
  
  // Fetch clients for dropdown
  const { data: clientsData } = useGetClientsQuery();
  
  // Fetch case studies for dropdown
  const { data: caseStudiesData } = useGetCaseStudiesQuery();
  
  useEffect(() => {
    if (clientsData?.data || clientsData) {
      const clients = clientsData?.data || clientsData || [];
      setClientOptions(
        clients.map((client) => ({
          value: client.id || client._id,
          label: client.name || client.companyName || `Client #${client.id || client._id}`,
        }))
      );
    }
  }, [clientsData]);

  useEffect(() => {
    if (caseStudiesData?.data || caseStudiesData) {
      const caseStudies = caseStudiesData?.data || caseStudiesData || [];
      setCaseStudyOptions(
        caseStudies.map((caseStudy) => ({
          value: caseStudy.id || caseStudy._id,
          label: caseStudy.title || `Case Study #${caseStudy.id || caseStudy._id}`,
        }))
      );
    }
  }, [caseStudiesData]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    watch,
  } = useForm({
    resolver: yupResolver(customerReviewSchema),
    defaultValues: {
      client_id: "",
      case_study_id: "",
      rating: 5,
      review_title: "",
      review_message: "",
      review_type: "project",
      is_featured: false,
      status: "pending",
    },
  });

  // API hooks
  const [createCustomerReview, { isLoading: isCreating }] = useCreateCustomerReviewMutation();
  const [updateCustomerReview, { isLoading: isUpdating }] = useUpdateCustomerReviewMutation();

  const isFeaturedValue = watch("is_featured");

  // Reset form when dialog opens/closes or editingReview changes
  useEffect(() => {
    if (open) {
      if (editingReview) {
        setValue("client_id", editingReview.client_id || "");
        setValue("case_study_id", editingReview.case_study_id || "");
        setValue("rating", editingReview.rating || 5);
        setValue("review_title", editingReview.review_title || "");
        setValue("review_message", editingReview.review_message || "");
        setValue("review_type", editingReview.review_type || "project");
        setValue("is_featured", editingReview.is_featured || false);
        setValue("status", editingReview.status || "pending");
      } else {
        reset({
          client_id: "",
          case_study_id: "",
          rating: 5,
          review_title: "",
          review_message: "",
          review_type: "project",
          is_featured: false,
          status: "pending",
        });
      }
    } else {
      reset({
        client_id: "",
        case_study_id: "",
        rating: 5,
        review_title: "",
        review_message: "",
        review_type: "project",
        is_featured: false,
        status: "pending",
      });
    }
  }, [open, editingReview, reset, setValue]);

  const onSubmit = async (data) => {
    try {
      // Convert string values to numbers where needed
      const submitData = {
        ...data,
        client_id: Number(data.client_id),
        case_study_id: data.case_study_id ? Number(data.case_study_id) : null,
        rating: Number(data.rating),
      };

      if (editingReview) {
        // Update existing review
        await updateCustomerReview({
          id: editingReview.id || editingReview._id,
          ...submitData,
        }).unwrap();
        toast.success("Customer review updated successfully!");
      } else {
        // Create new review
        await createCustomerReview(submitData).unwrap();
        toast.success("Customer review created successfully!");
      }
      onOpenChange(false);
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      toast.error(error?.data?.message || `Failed to ${editingReview ? 'update' : 'create'} customer review`);
    }
  };

  const handleClose = () => {
    reset({
      client_id: "",
      case_study_id: "",
      rating: 5,
      review_title: "",
      review_message: "",
      review_type: "project",
      is_featured: false,
      status: "pending",
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-[#0A0A0A]/95 backdrop-blur-xl border border-white/10 text-white p-0 gap-0 scrollbar-thin scrollbar-glass shadow-2xl shadow-black/50">
        <DialogHeader className="p-6 pb-4 border-b border-white/10 bg-white/5 backdrop-blur-sm sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#EFFC76]/10 border border-[#EFFC76]/20">
              <MessageSquare className="w-5 h-5 text-[#EFFC76]" />
            </div>
            <DialogTitle className="text-xl font-bold text-white">
              {editingReview ? "Edit Customer Review" : "Create Customer Review"}
            </DialogTitle>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
          <div className="p-6 space-y-8">
            {/* Context Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-white/10">
                <Layers className="w-4 h-4 text-[#EFFC76]" />
                <h3 className="text-sm font-medium text-white/90 uppercase tracking-wider">Context</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Client Selection */}
                <div className="space-y-2">
                  <SelectField
                    label="Client"
                    name="client_id"
                    value={watch("client_id") ? String(watch("client_id")) : ""}
                    onChange={(e) => setValue("client_id", e.target.value ? Number(e.target.value) : "", { shouldValidate: true })}
                    options={clientOptions}
                    placeholder="Select a client"
                    required
                    error={errors.client_id?.message}
                    className="w-full"
                    selectClassName="bg-white/5 !bg-[#0A0A0A] border-white/10 text-white hover:border-[#EFFC76]/50 focus:border-[#EFFC76] transition-colors"
                  />
                </div>

                {/* Case Study Selection (Optional) */}
                <div className="space-y-2">
                  <SelectField
                    label="Case Study (Optional)"
                    name="case_study_id"
                    value={watch("case_study_id") ? String(watch("case_study_id")) : ""}
                    onChange={(e) => setValue("case_study_id", e.target.value ? Number(e.target.value) : null, { shouldValidate: true })}
                    options={caseStudyOptions}
                    placeholder="Select a case study (optional)"
                    error={errors.case_study_id?.message}
                    className="w-full"
                    selectClassName="bg-white/5 !bg-[#0A0A0A] border-white/10 text-white hover:border-[#EFFC76]/50 focus:border-[#EFFC76] transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Review Details Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-white/10">
                <FileText className="w-4 h-4 text-[#EFFC76]" />
                <h3 className="text-sm font-medium text-white/90 uppercase tracking-wider">Review Details</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
                {/* Review Title */}
                <div className="md:col-span-3 space-y-2">
                  <TextField
                    label="Review Title"
                    name="review_title"
                    placeholder="Enter review title"
                    register={register}
                    required
                    error={errors.review_title?.message}
                    className="w-full"
                    inputClassName="bg-white/5 border-white/10 text-white placeholder:text-white/30 hover:border-[#EFFC76]/50 focus:border-[#EFFC76] transition-colors !bg-[#0A0A0A]"
                  />
                </div>
                
                {/* Rating */}
                <div className="md:col-span-1 space-y-2">
                  <TextField
                    label="Rating"
                    name="rating"
                    type="number"
                    placeholder="1-5"
                    register={register}
                    required
                    error={errors.rating?.message}
                    validation={{
                      min: { value: 1, message: "Min 1" },
                      max: { value: 5, message: "Max 5" },
                    }}
                    className="w-full"
                    inputClassName="bg-white/5 border-white/10 text-white placeholder:text-white/30 hover:border-[#EFFC76]/50 focus:border-[#EFFC76] transition-colors !bg-[#0A0A0A]"
                  />
                </div>
              </div>

              {/* Review Message */}
              <div className="space-y-2">
                <TextareaField
                  label="Review Message"
                  name="review_message"
                  placeholder="Enter the full review content here..."
                  register={register}
                  required
                  rows={5}
                  error={errors.review_message?.message}
                  className="w-full"
                  textareaClassName="bg-white/5 border-white/10 text-white placeholder:text-white/30 resize-none hover:border-[#EFFC76]/50 focus:border-[#EFFC76] transition-colors !bg-[#0A0A0A]"
                />
              </div>
            </div>

            {/* Classification Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-white/10">
                <Tag className="w-4 h-4 text-[#EFFC76]" />
                <h3 className="text-sm font-medium text-white/90 uppercase tracking-wider">Classification</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Review Type */}
                <div className="space-y-2">
                  <SelectField
                    label="Review Type"
                    name="review_type"
                    value={watch("review_type")}
                    onChange={(e) => setValue("review_type", e.target.value, { shouldValidate: true })}
                    options={[
                      { value: "project", label: "Project" },
                      { value: "service", label: "Service" },
                      { value: "product", label: "Product" },
                      { value: "other", label: "Other" },
                    ]}
                    placeholder="Select review type"
                    required
                    error={errors.review_type?.message}
                    className="w-full"
                    selectClassName="bg-white/5 !bg-[#0A0A0A] border-white/10 text-white hover:border-[#EFFC76]/50 focus:border-[#EFFC76] transition-colors"
                  />
                </div>

                {/* Status */}
                <div className="space-y-2">
                  <SelectField
                    label="Status"
                    name="status"
                    value={watch("status")}
                    onChange={(e) => setValue("status", e.target.value, { shouldValidate: true })}
                    options={[
                      { value: "pending", label: "Pending" },
                      { value: "approved", label: "Approved" },
                      { value: "rejected", label: "Rejected" },
                    ]}
                    placeholder="Select status"
                    required
                    error={errors.status?.message}
                    className="w-full"
                    selectClassName="bg-white/5 !bg-[#0A0A0A] border-white/10 text-white hover:border-[#EFFC76]/50 focus:border-[#EFFC76] transition-colors"
                  />
                </div>
              </div>

              {/* Is Featured */}
              <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-[#EFFC76]/10">
                    <Star className="w-4 h-4 text-[#EFFC76]" />
                  </div>
                  <div className="space-y-0.5">
                    <Label htmlFor="is_featured" className="text-sm font-medium text-white">
                      Featured Review
                    </Label>
                    <p className="text-xs text-white/50">
                      Show this review on the landing page carousel
                    </p>
                  </div>
                </div>
                <Switch
                  id="is_featured"
                  checked={isFeaturedValue}
                  onCheckedChange={(checked) => setValue("is_featured", checked, { shouldValidate: true })}
                  className="data-[state=checked]:bg-[#EFFC76]"
                />
              </div>
            </div>
          </div>

          <DialogFooter className="p-6 pt-4 border-t border-white/10 bg-[#0A0A0A] rounded-b-lg sticky bottom-0 z-10">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isSubmitting || isCreating || isUpdating}
              className="bg-transparent border-white/10 text-white hover:bg-white/5 hover:text-white transition-all duration-300"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || isCreating || isUpdating}
              className="bg-[#EFFC76] text-black hover:bg-[#dbe86c] border-none font-semibold shadow-[0_0_20px_rgba(239,252,118,0.2)] hover:shadow-[0_0_30px_rgba(239,252,118,0.3)] transition-all duration-300"
            >
              {isSubmitting || isCreating || isUpdating ? (
                <>
                  <Activity className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : editingReview ? (
                <>
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Update Review
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Create Review
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
