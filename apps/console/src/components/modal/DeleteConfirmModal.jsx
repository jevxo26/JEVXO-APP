import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

export default function DeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  count = 1,
  itemName = "user",
  loading = false,
}) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] bg-[#0A0A0A] border border-white/10 shadow-[0_0_45px_rgba(239,252,118,0.1)] p-0 gap-0">
        <DialogHeader className="p-6 pb-2 border-b border-white/10">
          <DialogTitle className="text-xl font-bold text-white">Confirm Delete</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center space-y-6 p-8">
          <div className="flex items-center justify-center w-20 h-20 rounded-full border border-red-500/20 bg-red-500/5 text-red-500 shadow-[0_0_30px_rgba(239,68,68,0.15)]">
            <AlertTriangle className="w-10 h-10" />
          </div>
          <div className="space-y-2 text-center">
            <h3 className="text-xl font-bold text-white">
              Are you sure?
            </h3>
            <p className="text-white/60 max-w-xs mx-auto leading-relaxed">
              You are about to delete{" "}
              <span className="font-semibold text-white">
                {count} {itemName}
                {count > 1 ? "s" : ""}
              </span>
              . This action cannot be undone.
            </p>
          </div>
        </div>
        <DialogFooter className="p-6 pt-4 border-t border-white/10 bg-[#0A0A0A]">
          <Button
            variant="ghost"
            onClick={onClose}
            disabled={loading}
            className="text-white/60 hover:text-white hover:bg-white/5"
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirm}
            disabled={loading}
            className="bg-red-500 hover:bg-red-600 text-white shadow-[0_0_20px_rgba(239,68,68,0.2)] hover:shadow-[0_0_30px_rgba(239,68,68,0.3)] transition-all duration-300"
          >
            {loading ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
