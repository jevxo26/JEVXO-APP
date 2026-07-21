import { baseApi } from './baseApi';

export const inboxApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getChannels: builder.query({
      query: () => '/inbox/channels',
      providesTags: ['Channels'],
    }),
    getMessages: builder.query({
      query: (channelId) => `/inbox/channels/${channelId}/messages`,
      providesTags: (result, error, channelId) => [{ type: 'Messages', id: channelId }],
      // Poll every 5 seconds for new messages
      pollingInterval: 5000, 
    }),
    sendMessage: builder.mutation({
      query: ({ channelId, content }) => ({
        url: `/inbox/channels/${channelId}/messages`,
        method: 'POST',
        body: { content },
      }),
      invalidatesTags: (result, error, { channelId }) => [{ type: 'Messages', id: channelId }],
    }),
  }),
});

export const {
  useGetChannelsQuery,
  useGetMessagesQuery,
  useSendMessageMutation,
} = inboxApi;
