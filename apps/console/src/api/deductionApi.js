import { baseApi } from './baseApi';

/**
 * Deduction API
 * 
 * Provides endpoints for managing payroll deductions including:
 * - Project penalties for late delivery
 * - Leave-based deductions
 * - Manual deductions by admin
 * 
 * All deductions are linked to team members and can be associated with
 * specific projects or leave requests for audit trail purposes.
 */
export const deductionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * Get all deductions across the organization
     * Returns deductions with team, project, and leave relations
     */
    getAllDeductions: builder.query({
      query: () => '/deductions',
      providesTags: ['Deduction'],
    }),

    /**
     * Get deductions for a specific team member
     * @param {number} teamId - The team member's ID
     */
    getDeductionsByTeam: builder.query({
      query: (teamId) => `/deductions/team/${teamId}`,
      providesTags: (result, error, teamId) => [{ type: 'Deduction', id: teamId }],
    }),

    /**
     * Get pending deductions for a team member
     * These are deductions not yet applied to a payroll
     * @param {number} teamId - The team member's ID
     */
    getPendingDeductionsByTeam: builder.query({
      query: (teamId) => `/deductions/pending/team/${teamId}`,
      providesTags: (result, error, teamId) => [
        { type: 'Deduction', id: `pending-${teamId}` },
      ],
    }),

    /**
     * Get a single deduction by ID
     * @param {number} id - The deduction ID
     */
    getDeductionById: builder.query({
      query: (id) => `/deductions/${id}`,
      providesTags: (result, error, id) => [{ type: 'Deduction', id }],
    }),

    /**
     * Create a new deduction
     * @param {Object} deduction - Deduction details
     * @param {number} deduction.teamId - Team member ID
     * @param {number} deduction.amount - Deduction amount
     * @param {string} deduction.reason - Reason for deduction
     * @param {string} deduction.type - Type: PROJECT_PENALTY, LEAVE_DEDUCTION, or MANUAL
     * @param {number} [deduction.projectId] - Optional project ID for project penalties
     * @param {number} [deduction.leaveId] - Optional leave ID for leave deductions
     * @param {Date} [deduction.date] - Optional date (defaults to current date)
     */
    createDeduction: builder.mutation({
      query: (deduction) => ({
        url: '/deductions',
        method: 'POST',
        body: deduction,
      }),
      invalidatesTags: ['Deduction', 'Payroll'],
    }),

    /**
     * Delete a deduction
     * @param {number} id - The deduction ID to delete
     */
    deleteDeduction: builder.mutation({
      query: (id) => ({
        url: `/deductions/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Deduction', 'Payroll'],
    }),

    /**
     * Update an existing deduction
     * @param {Object} data - Update data
     * @param {number} data.id - Deduction ID
     * @param {Object} data.deduction - Updated fields
     */
    updateDeduction: builder.mutation({
      query: ({ id, ...deduction }) => ({
        url: `/deductions/${id}`,
        method: 'PATCH',
        body: deduction,
      }),
      invalidatesTags: ['Deduction', 'Payroll'],
    }),

    /**
     * Apply a deduction to payroll immediately
     * @param {number} id - Deduction ID
     */
    applyDeduction: builder.mutation({
      query: (id) => ({
        url: `/deductions/${id}/apply`,
        method: 'POST',
      }),
      invalidatesTags: ['Deduction', 'Payroll'],
    }),
  }),
});

export const {
  useGetAllDeductionsQuery,
  useGetDeductionsByTeamQuery,
  useGetPendingDeductionsByTeamQuery,
  useGetDeductionByIdQuery,
  useCreateDeductionMutation,
  useUpdateDeductionMutation,
  useDeleteDeductionMutation,
  useApplyDeductionMutation,
} = deductionApi;
