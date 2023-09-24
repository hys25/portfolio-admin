import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import instance from "../apiInstance"

const CURRENT_SLICE_ROUTE = "/project"

export const projectsApi = createApi({
  reducerPath: "projectsApi",
  baseQuery: fetchBaseQuery({ baseUrl: instance.defaults.baseURL }),
  endpoints: (builder) => ({
    getAllProjects: builder.query({
      query: () => CURRENT_SLICE_ROUTE,
    }),
    getProject: builder.query({
      query: (projectId) => `${CURRENT_SLICE_ROUTE}/${projectId}`,
    }),
    addProject: builder.mutation({
      query: (projectData) => {
        return {
          url: CURRENT_SLICE_ROUTE,
          method: "POST",
          body: projectData,
        }
      },
    }),
    putProject: builder.mutation({
      query: ({ projectId, projectData }) => {
        return {
          url: `${CURRENT_SLICE_ROUTE}/${projectId}`,
          method: "PUT",
          body: projectData,
        }
      },
    }),
    deleteProject: builder.mutation({
      query: (projectId) => {
        return {
          url: `${CURRENT_SLICE_ROUTE}/${projectId}`,
          method: "DELETE",
        }
      },
    }),
  }),
})

export const {
  useGetAllProjectsQuery,
  useGetProjectQuery,
  useAddProjectMutation,
  usePutProjectMutation,
  useDeleteProjectMutation,
} = projectsApi
