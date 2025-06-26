import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = import.meta.env.VITE_BACKEND_URL + "/api/v1/admin";
const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers) => {
    const auth = sessionStorage.getItem("token");
    if (auth) {
      headers.set("Authorization", `Bearer ${auth}`);
    }
    return headers;
  },
});
const USERS_TAG = "USERS";
const COMPLAINTS = "COMPLAINTS";
const POSTS = "POSTS";
const ADS = "ADS";
export const youngApi: any = createApi({
  reducerPath: "youngApi",
  baseQuery,
  tagTypes: [USERS_TAG, COMPLAINTS, POSTS, ADS],
  endpoints: (builder) => ({
    adminLogin: builder.mutation({
      query: (body) => ({
        url: ``,
        method: "POST",
        body,
      }),
    }),
    getAllUsers: builder.query<any, void>({
      query: () => ({
        url: `getAllUsers`,
        method: "GET",
      }),
      providesTags: [USERS_TAG],
    }),
    updateUserStatus: builder.mutation<any, any>({
      query: ({
        id,
        isDeleted,
        isDeactivated,
      }: {
        id: string;
        isDeleted: any;
        isDeactivated: any;
      }) => {
        const params = new URLSearchParams();
        if (isDeactivated != undefined)
          params.append("isDeactivated", isDeactivated);
        if (isDeleted != undefined) params.append("isDeleted", isDeleted);
        return {
          url: `updateUserStatus/${id}?${params.toString()}`,
          method: "PUT",
          body: {},
        };
      },
      invalidatesTags: [USERS_TAG],
    }),
    updateReportStatus: builder.mutation<any, any>({
      query: (id) => ({
        url: `updateReportStatus/${id}`,
        method: "PUT",
        body: {},
      }),
      invalidatesTags: [COMPLAINTS],
    }),
    getComplaints: builder.query<any, void>({
      query: () => ({
        url: `getAllUserComplaints`,
        method: "GET",
      }),
      providesTags: [COMPLAINTS],
    }),
    getPosts: builder.query<any, void>({
      query: () => ({
        url: `getPosts`,
        method: "GET",
      }),
      providesTags: [POSTS],
    }),
    getAllAds: builder.query<any, void>({
      query: () => ({
        url: `getAllAds`,
        method: "GET",
      }),
      providesTags: [ADS],
    }),
    updateAdStatus: builder.mutation<any, any>({
      query: ({ id, body }) => ({
        url: `updateAdStatus/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: [ADS],
    }),
    changePassword: builder.mutation<any, any>({
      query: (body) => ({
        url: `changePassword`,
        method: "PUT",
        body,
      }),
    }),
  }),
});

export const {
  useAdminLoginMutation,
  useGetAllUsersQuery,
  useGetComplaintsQuery,
  useGetPostsQuery,
  useGetAllAdsQuery,
  useUpdateUserStatusMutation,
  useUpdateReportStatusMutation,
  useUpdateAdStatusMutation,
  useChangePasswordMutation,
} = youngApi;
