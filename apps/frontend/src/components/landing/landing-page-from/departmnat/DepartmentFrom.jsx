"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import TextField from "@/components/input/TextField";
import TextareaField from "@/components/input/TextareaField";
import { toast } from "sonner";
import { Building2 } from "lucide-react";
import { 
  useCreateDepartmentMutation, 
  useUpdateDepartmentMutation 
} from "@/api/landing/department/departmentApi";

// Yup validation schema
const departmentSchema = yup.object({
  name: yup
    .string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must not exceed 100 characters"),
  description: yup
    .string()
    .max(500, "Description must not exceed 500 characters"),
});

export default function DepartmentForm({ 
  open, 
  onOpenChange, 
  editingDepartment, 
  onSuccess 
}) {
  // React Hook Form setup with Yup validation
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(departmentSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  // API hooks
  const [createDepartment, { isLoading: isCreating }] = useCreateDepartmentMutation();
  const [updateDepartment, { isLoading: isUpdating }] = useUpdateDepartmentMutation();

  // Reset form when dialog opens/closes or editingDepartment changes
  useEffect(() => {
    if (open) {
      if (editingDepartment) {
        setValue("name", editingDepartment.name || "");
        setValue("description", editingDepartment.description || "");
      } else {
        reset({
          name: "",
          description: "",
        });
      }
    } else {
      reset({
        name: "",
        description: "",
      });
    }
  }, [open, editingDepartment, reset, setValue]);

  const onSubmit = async (data) => {
    try {
      if (editingDepartment) {
        // Update existing department
        await updateDepartment({
          id: editingDepartment.id || editingDepartment._id,
          ...data,
        }).unwrap();
        toast.success("Department updated successfully!");
      } else {
        // Create new department
        await createDepartment(data).unwrap();
        toast.success("Department created successfully!");
      }
      onOpenChange(false);
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      toast.error(error?.data?.message || `Failed to ${editingDepartment ? 'update' : 'create'} department`);
    }
  };

  const handleClose = () => {
    reset({
      name: "",
      description: "",
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px] bg-[#0A0A0A]/95 backdrop-blur-xl border border-white/10 text-white p-0 gap-0 shadow-2xl shadow-black/50">
        <DialogHeader className="p-6 pb-4 border-b border-white/10 bg-white/5 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#EFFC76]/10 border border-[#EFFC76]/20">
              <Building2 className="w-5 h-5 text-[#EFFC76]" />
            </div>
            <DialogTitle className="text-xl font-bold text-white">
              {editingDepartment ? "Edit Department" : "Add New Department"}
            </DialogTitle>
          </div>
        </DialogHeader>
        
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="p-6 space-y-6">
            <TextField
              label="Name"
              name="name"
              placeholder="e.g. Electrical Technology"
              register={register}
              error={errors.name?.message}
              required
              inputClassName="!bg-white/5 !border-white/10 focus:!border-[#EFFC76]/50 focus:!bg-white/10 transition-all duration-200"
            />
            <TextareaField
              label="Description"
              name="description"
              placeholder="e.g. Department of Electrical Engineering"
              register={register}
              error={errors.description?.message}
              rows={4}
              className="!bg-white/5 !border-white/10 focus:!border-[#EFFC76]/50 focus:!bg-white/10 transition-all duration-200"
            />
          </div>
          
          <DialogFooter className="p-6 pt-4 border-t border-white/10 bg-[#0A0A0A]/95 backdrop-blur-xl">
            <Button 
              type="button"
              variant="outline" 
              onClick={handleClose}
              className="border-white/10 bg-white/5 text-white hover:bg-white/10 hover:text-white hover:border-white/20 transition-all duration-300"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isCreating || isUpdating || isSubmitting}
              className="bg-[#EFFC76] hover:bg-[#dbe86c] text-black font-semibold shadow-[0_0_20px_rgba(239,252,118,0.2)] hover:shadow-[0_0_30px_rgba(239,252,118,0.3)] transition-all duration-300"
            >
              {isCreating || isUpdating || isSubmitting
                ? "Saving..."
                : editingDepartment
                ? "Update Department"
                : "Create Department"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
