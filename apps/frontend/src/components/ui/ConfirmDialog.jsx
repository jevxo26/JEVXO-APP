"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Trash2, AlertCircle, Info } from "lucide-react";

/**
 * Custom Confirmation Dialog Component
 * 
 * A beautiful confirmation dialog that matches the app's design aesthetic
 * with dark theme, glass-card styling, and #EFFC76 accent color.
 * 
 * @param {boolean} open - Whether the dialog is open
 * @param {function} onOpenChange - Callback when dialog open state changes
 * @param {function} onConfirm - Callback when user confirms
 * @param {function} onCancel - Callback when user cancels
 * @param {string} title - Dialog title
 * @param {string} description - Dialog description
 * @param {string} confirmText - Text for confirm button (default: "Confirm")
 * @param {string} cancelText - Text for cancel button (default: "Cancel")
 * @param {string} variant - Visual variant: "danger", "warning", "info" (default: "danger")
 */
export function ConfirmDialog({
  open,
  onOpenChange,
  onConfirm,
  onCancel,
  title = "Are you sure?",
  description = "This action cannot be undone.",
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "danger",
}) {
  const handleConfirm = () => {
    onConfirm?.();
    onOpenChange(false);
  };

  const handleCancel = () => {
    onCancel?.();
    onOpenChange(false);
  };

  const getVariantStyles = () => {
    switch (variant) {
      case "danger":
        return {
          icon: Trash2,
          iconBg: "bg-red-500/10",
          iconBorder: "border-red-500/20",
          iconColor: "text-red-400",
          confirmBg: "bg-red-500/10 hover:bg-red-500/20",
          confirmBorder: "border-red-500/30",
          confirmText: "text-red-400",
        };
      case "warning":
        return {
          icon: AlertTriangle,
          iconBg: "bg-amber-500/10",
          iconBorder: "border-amber-500/20",
          iconColor: "text-amber-400",
          confirmBg: "bg-amber-500/10 hover:bg-amber-500/20",
          confirmBorder: "border-amber-500/30",
          confirmText: "text-amber-400",
        };
      case "info":
        return {
          icon: Info,
          iconBg: "bg-blue-500/10",
          iconBorder: "border-blue-500/20",
          iconColor: "text-blue-400",
          confirmBg: "bg-[#EFFC76] hover:bg-[#e0ef5f]",
          confirmBorder: "border-[#EFFC76]",
          confirmText: "text-black",
        };
      default:
        return {
          icon: AlertCircle,
          iconBg: "bg-white/5",
          iconBorder: "border-white/10",
          iconColor: "text-white/60",
          confirmBg: "bg-[#EFFC76] hover:bg-[#e0ef5f]",
          confirmBorder: "border-[#EFFC76]",
          confirmText: "text-black",
        };
    }
  };

  const styles = getVariantStyles();
  const Icon = styles.icon;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-black/95 border border-white/10 text-white max-w-md backdrop-blur-xl">
        <DialogHeader>
          <div className="flex items-start gap-4">
            <div className={`p-3 ${styles.iconBg} border ${styles.iconBorder} rounded-xl flex-shrink-0`}>
              <Icon className={`w-6 h-6 ${styles.iconColor}`} />
            </div>
            <div className="flex-1">
              <DialogTitle className="text-xl font-bold text-white mb-2">
                {title}
              </DialogTitle>
              <DialogDescription className="text-white/70 text-sm leading-relaxed">
                {description}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <DialogFooter className="gap-2 sm:gap-2 mt-4">
          <Button
            onClick={handleCancel}
            variant="outline"
            className="border-white/20 text-white hover:bg-white/10 flex-1 sm:flex-initial"
          >
            {cancelText}
          </Button>
          <Button
            onClick={handleConfirm}
            className={`${styles.confirmBg} ${styles.confirmText} border ${styles.confirmBorder} flex-1 sm:flex-initial`}
          >
            {confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
