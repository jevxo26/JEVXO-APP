"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import CreateDeductionDialog from "@/components/admin/payroll/CreateDeductionDialog";
import { AlertCircle } from "lucide-react";

/**
 * ProjectPenaltyButton Component
 * 
 * Quick action button for applying project penalties from the project detail page.
 * 
 * Features:
 * - Opens deduction dialog with project pre-selected
 * - Pre-fills deduction type as PROJECT_PENALTY
 * - Allows admin to quickly penalize team members for:
 *   - Missing deadlines
 *   - Incomplete deliverables
 *   - Poor quality work
 * 
 * @param {number} projectId - The current project ID
 * @param {string} projectName - The current project name (for display)
 */
export default function ProjectPenaltyButton({ projectId, projectName }) {
  return (
    <CreateDeductionDialog
      prefilledProjectId={projectId}
      prefilledType="PROJECT_PENALTY"
      triggerButton={
        <Button
          variant="outline"
          size="sm"
          className="bg-rose-500/10 border-rose-500/30 text-rose-300 hover:bg-rose-500/20 hover:text-rose-200 hover:border-rose-500/50 transition-all"
        >
          <AlertCircle className="w-4 h-4 mr-2" />
          Apply Penalty
        </Button>
      }
    />
  );
}
