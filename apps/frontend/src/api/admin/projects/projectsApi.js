import { baseApi } from '@/api/baseApi';

export const projectsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all projects
    getProjects: builder.query({
      query: () => '/projects',
      providesTags: ['Project'],
    }),
    
    // Get single project by ID
    getProjectById: builder.query({
      query: (id) => `/projects/${id}`,
      providesTags: (result, error, id) => [{ type: 'Project', id }],
    }),
    
    // Create new project
    createProject: builder.mutation({
      query: (data) => ({
        url: '/projects',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Project'],
    }),
    
    // Update project
    updateProject: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/projects/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Project', id }, 'Project'],
    }),
    
    // Delete project (soft delete - moves to trash)
    deleteProject: builder.mutation({
      query: (id) => ({
        url: `/projects/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Project'],
    }),

    // Get trashed projects
    getTrashedProjects: builder.query({
      query: () => '/projects/trash/all',
      providesTags: ['TrashedProject'],
    }),

    // Restore project from trash
    restoreProject: builder.mutation({
      query: (id) => ({
        url: `/projects/${id}/restore`,
        method: 'POST',
      }),
      invalidatesTags: ['Project', 'TrashedProject'],
    }),

    // Permanently delete project
    permanentDeleteProject: builder.mutation({
      query: (id) => ({
        url: `/projects/${id}/permanent`,
        method: 'DELETE',
      }),
      invalidatesTags: ['TrashedProject'],
    }),
  }),
});

export const {
  useGetProjectsQuery,
  useGetProjectByIdQuery,
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
  useGetTrashedProjectsQuery,
  useRestoreProjectMutation,
  usePermanentDeleteProjectMutation,
} = projectsApi;
