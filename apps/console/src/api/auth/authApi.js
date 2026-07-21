import { baseApi } from '@/api/baseApi';

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Login
    login: builder.mutation({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          // Store token in localStorage
          if (data?.data?.access_token) {
            localStorage.setItem('auth_token', data.data.access_token);
          }
        } catch (error) {
          // Remove token on error
          localStorage.removeItem('auth_token');
        }
      },
    }),

    // Get current user
    getCurrentUser: builder.query({
      query: () => ({
        url: '/auth/me',
      }),
      providesTags: ['Auth'],
    }),

    // Logout vvnvnvnvnvn
    // Logout vvnvnvnvnvn
    logout: builder.mutation({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } finally {
          // Always remove token on logout
          localStorage.removeItem('auth_token');
        }
      },
      invalidatesTags: ['Auth'],
    }),

    // Generate OTP
    generateOtp: builder.mutation({
      query: (email) => ({
        url: '/auth/otp/generate',
        method: 'POST',
        body: { email },
      }),
    }),

    // Verify OTP
    verifyOtp: builder.mutation({
      query: ({ email, otp }) => ({
        url: '/auth/otp/verify',
        method: 'POST',
        body: { email, otp },
      }),
    }),

    // Forgot Password
    forgotPassword: builder.mutation({
      query: (email) => ({
        url: '/auth/forgot-password',
        method: 'POST',
        body: { email },
      }),
    }),

    // Reset Password
    resetPassword: builder.mutation({
      query: ({ email, otp, newPassword }) => ({
        url: '/auth/reset-password',
        method: 'POST',
        body: { email, otp, newPassword },
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useGetCurrentUserQuery,
  useLogoutMutation,
  useGenerateOtpMutation,
  useVerifyOtpMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = authApi;
