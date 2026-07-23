import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const getAuthToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('auth_token');
  }
  return null;
};

export const partnerApi = createApi({
  reducerPath: 'partnerApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
    prepareHeaders: (headers) => {
      const token = getAuthToken();
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['PartnerSummary', 'PartnerClients', 'PartnerCommissions', 'PartnerWithdrawals', 'MarketingAssets', 'CountryStats', 'Leaderboard', 'AllPartners'],
  endpoints: (builder) => ({
    // ADMIN PARTNER MANAGEMENT ENDPOINTS
    getAllPartners: builder.query({
      query: () => '/partner/all-partners',
      providesTags: ['AllPartners'],
    }),
    createPartner: builder.mutation({
      query: (body) => ({
        url: '/partner/create-partner',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['AllPartners', 'Leaderboard', 'PartnerSummary'],
    }),
    updatePartnerStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/partner/${id}/status`,
        method: 'PATCH',
        body: { status },
      }),
      invalidatesTags: ['AllPartners', 'Leaderboard'],
    }),
    updateWithdrawalStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/partner/withdrawals/${id}/status`,
        method: 'PATCH',
        body: { status },
      }),
      invalidatesTags: ['PartnerWithdrawals', 'PartnerCommissions', 'PartnerSummary'],
    }),
    deletePartner: builder.mutation({
      query: (id) => ({
        url: `/partner/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['AllPartners', 'Leaderboard'],
    }),

    // PARTNER DASHBOARD ENDPOINTS
    getPartnerSummary: builder.query({
      query: () => '/partner/dashboard',
      providesTags: ['PartnerSummary'],
    }),
    getPartnerClients: builder.query({
      query: () => '/partner/clients',
      providesTags: ['PartnerClients'],
    }),
    addPartnerClient: builder.mutation({
      query: (body) => ({
        url: '/partner/clients',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['PartnerClients', 'PartnerSummary'],
    }),
    getPartnerCommissions: builder.query({
      query: () => '/partner/commissions',
      providesTags: ['PartnerCommissions'],
    }),
    createWithdrawalRequest: builder.mutation({
      query: (body) => ({
        url: '/partner/withdraw',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['PartnerWithdrawals', 'PartnerCommissions', 'PartnerSummary'],
    }),
    getPartnerWithdrawals: builder.query({
      query: () => '/partner/withdrawals',
      providesTags: ['PartnerWithdrawals'],
    }),
    getMarketingAssets: builder.query({
      query: () => '/partner/marketing-assets',
      providesTags: ['MarketingAssets'],
    }),
    getCountryStats: builder.query({
      query: (country) => `/partner/country-stats?country=${encodeURIComponent(country || 'Bangladesh')}`,
      providesTags: ['CountryStats'],
    }),
    getLeaderboard: builder.query({
      query: () => '/partner/leaderboard',
      providesTags: ['Leaderboard'],
    }),
  }),
});

export const {
  useGetAllPartnersQuery,
  useCreatePartnerMutation,
  useUpdatePartnerStatusMutation,
  useUpdateWithdrawalStatusMutation,
  useDeletePartnerMutation,
  useGetPartnerSummaryQuery,
  useGetPartnerClientsQuery,
  useAddPartnerClientMutation,
  useGetPartnerCommissionsQuery,
  useCreateWithdrawalRequestMutation,
  useGetPartnerWithdrawalsQuery,
  useGetMarketingAssetsQuery,
  useGetCountryStatsQuery,
  useGetLeaderboardQuery,
} = partnerApi;
