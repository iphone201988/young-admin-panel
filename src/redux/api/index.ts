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
const CONTACT = "CONTACT";
const FAQS = "FAQS";
const SITE_CONTENT = "SITE_CONTENT";
export const youngApi: any = createApi({
  reducerPath: "youngApi",
  baseQuery,
  tagTypes: [USERS_TAG, COMPLAINTS, POSTS, ADS, CONTACT, FAQS, SITE_CONTENT],
  endpoints: (builder) => ({
    adminLogin: builder.mutation({
      query: (body) => ({
        url: ``,
        method: "POST",
        body,
      }),
    }),
    getDashboardStats: builder.query<any, void>({
      query: () => ({
        url: `getDashboardStats`,
        method: "GET",
      }),
    }),
    getAllUsers: builder.query<any, any>({
      query: ({ page = 1, userId, name }) => {
        const params = new URLSearchParams({ page: String(page) });
        if (userId?.trim()) params.append("userId", userId.trim());
        if (name?.trim()) params.append("name", name.trim());
        return { url: `getAllUsers?${params.toString()}`, method: "GET" };
      },
      providesTags: [USERS_TAG],
    }),
    getUserById: builder.query<any, string>({
      query: (id) => ({
        url: `getUserById/${id}`,
        method: "GET",
      }),
      providesTags: [USERS_TAG],
    }),
    getAdminUserChat: builder.query<any, string>({
      query: (id) => ({
        url: `getAdminUserChat/${id}`,
        method: "GET",
      }),
    }),
    getUserActivities: builder.query<any, { userId: string; page?: number; limit?: number }>({
      query: ({ userId, page = 1, limit = 10 }) => ({
        url: `activities/${userId}?page=${page}&limit=${limit}`,
        method: "GET",
      }),
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
    updateUserBasicDetails: builder.mutation<
      any,
      {
        id: string;
        body: {
          firstName: string;
          lastName: string;
          username: string;
          email: string;
          countryCode: string;
          phone: string;
        };
      }
    >({
      query: ({ id, body }) => ({
        url: `updateUserBasicDetails/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: [USERS_TAG],
    }),
    updateUserDocumentVerification: builder.mutation<
      any,
      { id: string; verified: boolean }
    >({
      query: ({ id, verified }) => ({
        url: `updateUserDocumentVerification/${id}`,
        method: "PUT",
        body: { verified },
      }),
      invalidatesTags: [USERS_TAG],
    }),
    updateUserCrdNumberVerification: builder.mutation<
      any,
      { id: string; verified: boolean }
    >({
      query: ({ id, verified }) => ({
        url: `updateUserCrdNumberVerification/${id}`,
        method: "PUT",
        body: { verified },
      }),
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
    getComplaints: builder.query<any, any>({
      query: ({ page = 1, userId }) => {
        const params = new URLSearchParams({ page: String(page) });
        if (userId?.trim()) params.append("userId", userId.trim());
        return { url: `getAllUserComplaints?${params.toString()}`, method: "GET" };
      },
      providesTags: [COMPLAINTS],
    }),
    getComplaintById: builder.query<any, string>({
      query: (id) => ({
        url: `getComplaintById/${id}`,
        method: "GET",
      }),
      providesTags: [COMPLAINTS],
    }),
    getPosts: builder.query<any, any>({
      query: ({ page = 1, userId, title, flagged }) => {
        const params = new URLSearchParams({ page: String(page) });
        if (userId?.trim()) params.append("userId", userId.trim());
        if (title?.trim()) params.append("title", title.trim());
        if (flagged !== undefined) params.append("flagged", String(flagged));
        return { url: `getPosts?${params.toString()}`, method: "GET" };
      },
      providesTags: [POSTS],
    }),
    getAllAds: builder.query<any, any>({
      query: ({page=1}) => ({
        url: `getAllAds?page=${page}`,
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
    uploadMedia: builder.mutation<any, FormData>({
      query: (formData) => ({
        url: `uploadMedia`,
        method: "POST",
        body: formData,
      }),
    }),
    getContactSubmissions: builder.query<any, { page?: number }>({
      query: ({ page = 1 }) => ({
        url: `getContactSubmissions?page=${page}`,
        method: "GET",
      }),
      providesTags: [CONTACT],
    }),
    replyToContact: builder.mutation<any, { id: string; message: string }>({
      query: ({ id, message }) => ({
        url: `replyToContact/${id}`,
        method: "POST",
        body: { message },
      }),
      invalidatesTags: [CONTACT],
    }),
    getAdminFaqs: builder.query<any, void>({
      query: () => ({
        url: "faqs",
        method: "GET",
      }),
      providesTags: [FAQS],
    }),
    createFaq: builder.mutation<
      any,
      { question: string; answer: string; order?: number; isActive?: boolean }
    >({
      query: (body) => ({
        url: "faqs",
        method: "POST",
        body,
      }),
      invalidatesTags: [FAQS],
    }),
    updateFaq: builder.mutation<
      any,
      { id: string; body: { question?: string; answer?: string; order?: number; isActive?: boolean } }
    >({
      query: ({ id, body }) => ({
        url: `faqs/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: [FAQS],
    }),
    deleteFaq: builder.mutation<any, string>({
      query: (id) => ({
        url: `faqs/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [FAQS],
    }),
    sendGlobalNotification: builder.mutation<any, { title: string; message: string }>({
      query: (body) => ({
        url: "push-notifications/global",
        method: "POST",
        body,
      }),
    }),
    createEventsByUserType: builder.mutation<any, FormData>({
      query: (body) => ({
        url: "events/by-user-type",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useAdminLoginMutation,
  useGetDashboardStatsQuery,
  useGetAllUsersQuery,
  useGetUserByIdQuery,
  useGetAdminUserChatQuery,
  useGetUserActivitiesQuery,
  useGetComplaintsQuery,
  useGetComplaintByIdQuery,
  useGetPostsQuery,
  useLazyGetPostsQuery,
  useGetAllAdsQuery,
  useUpdateUserStatusMutation,
  useUpdateUserBasicDetailsMutation,
  useUpdateUserDocumentVerificationMutation,
  useUpdateUserCrdNumberVerificationMutation,
  useUpdateReportStatusMutation,
  useUpdateAdStatusMutation,
  useChangePasswordMutation,
  useUploadMediaMutation,
  useGetContactSubmissionsQuery,
  useReplyToContactMutation,
  useGetAdminFaqsQuery,
  useCreateFaqMutation,
  useUpdateFaqMutation,
  useDeleteFaqMutation,
  useSendGlobalNotificationMutation,
  useCreateEventsByUserTypeMutation,
} = youngApi;
