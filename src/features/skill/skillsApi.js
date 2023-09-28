import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import instance from "../apiInstance"

const CURRENT_SLICE_ROUTE = "/skill"

export const skillsApi = createApi({
  reducerPath: "skillsApi",
  baseQuery: fetchBaseQuery({ baseUrl: instance.defaults.baseURL }),
  endpoints: (builder) => ({
    getAllSkills: builder.query({
      query: () => CURRENT_SLICE_ROUTE,
      providesTags: [{ type: "Skills", id: "getAllSkills" }],
    }),
    addSkill: builder.mutation({
      query: (skillData) => {
        return {
          url: CURRENT_SLICE_ROUTE,
          method: "POST",
          body: skillData,
        }
      },
      invalidatesTags: [{ type: "Skills", id: "getAllSkills" }],
    }),
    putSkill: builder.mutation({
      query: ({ skillId, skillData }) => {
        return {
          url: `${CURRENT_SLICE_ROUTE}/${skillId}`,
          method: "PUT",
          body: skillData,
        }
      },
      invalidatesTags: [{ type: "Skills", id: "getAllSkills" }],
    }),
    deleteSkill: builder.mutation({
      query: (skillId) => {
        return {
          url: `${CURRENT_SLICE_ROUTE}/${skillId}`,
          method: "DELETE",
        }
      },
      invalidatesTags: [{ type: "Skills", id: "getAllSkills" }],
    }),
  }),
})

export const {
  useGetAllSkillsQuery,
  useAddSkillMutation,
  usePutSkillMutation,
  useDeleteSkillMutation,
} = skillsApi
