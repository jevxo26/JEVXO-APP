import { baseApi } from '@/api/baseApi';

export const projectMemberApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all members for a project
    getProjectMembers: builder.query({
      query: (projectId) => `/project-members/project/${projectId}`,
      providesTags: (result, error, projectId) => [{ type: 'Project', id: `members-${projectId}` }],
    }),

    // Get a single member assignment by project and employee ID
    getProjectMemberByEmployee: builder.query({
      query: ({ projectId, teamMemberId }) => `/project-members/project/${projectId}/member/${teamMemberId}`,
      providesTags: (result, error, { projectId, teamMemberId }) => [
        { type: 'Project', id: `member-${projectId}-${teamMemberId}` }
      ],
    }),

    // Assign or update a member to a project with an amount
    assignProjectMember: builder.mutation({
      query: (data) => ({
        url: '/project-members',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: (result, error, { projectId }) => [{ type: 'Project', id: `members-${projectId}` }],
    }),

    // Remove a member assignment
    removeProjectMember: builder.mutation({
      query: (id) => ({
        url: `/project-members/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Project'],
    }),
  }),
});

export const {
  useGetProjectMembersQuery,
  useGetProjectMemberByEmployeeQuery,
  useAssignProjectMemberMutation,
  useRemoveProjectMemberMutation,
} = projectMemberApi;
