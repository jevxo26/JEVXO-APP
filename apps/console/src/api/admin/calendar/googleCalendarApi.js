import { baseApi } from "../../baseApi";

export const googleCalendarApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    connectGoogleCalendar: builder.mutation({
      query: (code) => ({
        url: "/calendar/connect",
        method: "POST",
        body: { code },
      }),
    }),
    createCalendarEvent: builder.mutation({
      query: (eventData) => ({
        url: "/calendar/events",
        method: "POST",
        body: eventData,
      }),
    }),
  }),
});

export const { useConnectGoogleCalendarMutation, useCreateCalendarEventMutation } = googleCalendarApi;
