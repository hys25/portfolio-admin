import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { toast } from "react-toastify"
import instance from "../apiInstance"

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
      async onQueryStarted(id, { queryFulfilled }) {
        try {
          const { data: response } = await queryFulfilled
          if (response.token) {
            localStorage.setItem("user_token", JSON.stringify(response.token))
          }
        } catch (err) {
          toast.error(err)
        }
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
      async onQueryStarted(id, { queryFulfilled }) {
        try {
          const { data: response } = await queryFulfilled
          if (response.token) {
            localStorage.setItem("user_token", JSON.stringify(response.token))
          }
        } catch (err) {
          toast.error(err)
        }
      },
    }),
  }),
})

export const logOut = () => {
  localStorage.removeItem("user_token")
}

export const { useSignUpMutation, useSignInMutation } = authApi
