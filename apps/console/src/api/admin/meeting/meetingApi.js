import { baseApi } from "@/api/baseApi";

export const meetingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createMeeting: builder.mutation({
      query: (data) => ({
        url: "/meeting",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Meeting"],
    }),

    getMeetings: builder.query({
      query: () => "/meeting",
      providesTags: ["Meeting"],
    }),

    deleteMeeting: builder.mutation({
      query: (id) => ({
        url: `/meeting/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Meeting"],
    }),

    getTrashedMeetings: builder.query({
      query: () => "/meeting/trash",
      providesTags: ["Meeting"],
    }),

    restoreMeeting: builder.mutation({
      query: (id) => ({
        url: `/meeting/${id}/restore`,
        method: "POST",
      }),
      invalidatesTags: ["Meeting"],
    }),

    permanentDeleteMeeting: builder.mutation({
      query: (id) => ({
        url: `/meeting/${id}/permanent`,
        method: "DELETE",
      }),
      invalidatesTags: ["Meeting"],
    }),
  }),
});

export const { 
  useCreateMeetingMutation, 
  useGetMeetingsQuery,
  useDeleteMeetingMutation,
  useGetTrashedMeetingsQuery,
  useRestoreMeetingMutation,
  usePermanentDeleteMeetingMutation
} = meetingApi;

