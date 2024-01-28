// Need to use the React-specific entry point to allow generating React hooks
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
// import { BASE_URL } from '../../../API'
import {axiosBaseQuery} from './axiosBaseQuery';

// Define a service using a base URL and expected endpoints
export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: axiosBaseQuery({baseUrl: "https://cardex.live"}),
  endpoints: builder => ({
    verify: builder.mutation<any, any>({
      query: credentials => ({
        url: `/api/email/send/verification-code?email=${credentials.email}`,
        method: 'get',
      }),
    }),

    verifyOtp: builder.mutation<any, any>({
      query: credentials => (console.log(credentials,'error from message'),{
        url: `/api/email/verify/code?code=${credentials}`,
        method: 'get',
      }),
    }),
  }),
});

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const {useVerifyMutation ,useVerifyOtpMutation} = authApi;
