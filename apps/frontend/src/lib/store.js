import { configureStore } from '@reduxjs/toolkit';
import { baseApi } from '@/api/baseApi';
import { partnerApi } from '@/api/partner/partnerApi';

export const makeStore = () => {
  return configureStore({
    reducer: {
      [baseApi.reducerPath]: baseApi.reducer,
      [partnerApi.reducerPath]: partnerApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(baseApi.middleware, partnerApi.middleware),
  });
};
