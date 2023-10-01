import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import instance from "../apiInstance"

const CURRENT_SLICE_ROUTE = "/message"

export const messageApi = createApi({
  reducerPath: "messageApi",
  baseQuery: fetchBaseQuery({ baseUrl: instance.defaults.baseURL }),
  endpoints: (builder) => ({
    getAllMessages: builder.query({
      query: () => CURRENT_SLICE_ROUTE,
      providesTags: [{ type: "Messages", id: "getAllMessages" }],
    }),
    getMessage: builder.query({
      query: (messageId) => `${CURRENT_SLICE_ROUTE}/${messageId}`,
      providesTags: (r, e, messageId) => [{ type: "Messages", id: messageId }],
    }),
    addMessage: builder.mutation({
      query: (messageData) => {
        return {
          url: CURRENT_SLICE_ROUTE,
          method: "POST",
          body: messageData,
        }
      },
      invalidatesTags: [{ type: "Messages", id: "getAllMessages" }],
    }),
    putMessage: builder.mutation({
      query: ({ messageId, messageData }) => {
        return {
          url: `${CURRENT_SLICE_ROUTE}/${messageId}`,
          method: "PUT",
          body: messageData,
        }
      },
      invalidatesTags: (r, e, arg) => [
        { type: "Messages", id: "getAllMessages" },
        { type: "Messages", id: arg.messageId },
      ],
    }),
    deleteMessage: builder.mutation({
      query: (messageId) => {
        return {
          url: `${CURRENT_SLICE_ROUTE}/${messageId}`,
          method: "DELETE",
        }
      },
      invalidatesTags: [{ type: "Messages", id: "getAllMessages" }],
    }),
  }),
})

export const {
  useGetAllMessagesQuery,
  useGetMessageQuery,
  useAddMessageMutation,
  usePutMessageMutation,
  useDeleteMessageMutation,
} = messageApi
