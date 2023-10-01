import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import instance from "../apiInstance"
import { LSService } from "./localStorageService"

const CURRENT_SLICE_ROUTE = "/auth/"

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: instance.defaults.baseURL }),
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (userData) => {
        return {
          url: `${CURRENT_SLICE_ROUTE}sign-up`,
          method: "POST",
          body: userData,
        }
      },
      async onQueryStarted(_, { queryFulfilled }) {
        LSService.setToken(queryFulfilled)
      },
    }),
    signIn: builder.mutation({
      query: (userData) => {
        return {
          url: `${CURRENT_SLICE_ROUTE}sign-in`,
          method: "POST",
          body: userData,
        }
      },
      async onQueryStarted(_, { queryFulfilled }) {
        LSService.setToken(queryFulfilled)
      },
    }),
  }),
})

export const { useSignUpMutation, useSignInMutation } = authApi
