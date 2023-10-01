import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import instance from "../apiInstance"

const CURRENT_SLICE_ROUTE = "/project"

export const projectsApi = createApi({
  reducerPath: "projectsApi",
  baseQuery: fetchBaseQuery({ baseUrl: instance.defaults.baseURL }),
  endpoints: (builder) => ({
    getAllProjects: builder.query({
      query: () => CURRENT_SLICE_ROUTE,
      providesTags: [{ type: "Projects", id: "getAllProjects" }],
    }),
    getProject: builder.query({
      query: (projectId) => `${CURRENT_SLICE_ROUTE}/${projectId}`,
      providesTags: (r, e, projectId) => [{ type: "Projects", id: projectId }],
    }),
    addProject: builder.mutation({
      query: (projectData) => {
        return {
          url: CURRENT_SLICE_ROUTE,
          method: "POST",
          body: projectData,
        }
      },
      invalidatesTags: [{ type: "Projects", id: "getAllProjects" }],
    }),
    putProject: builder.mutation({
      query: ({ projectId, projectData }) => {
        return {
          url: `${CURRENT_SLICE_ROUTE}/${projectId}`,
          method: "PUT",
          body: projectData,
        }
      },
      invalidatesTags: (r, e, arg) => [
        { type: "Projects", id: "getAllProjects" },
        { type: "Projects", id: arg.projectId },
      ],
    }),
    deleteProject: builder.mutation({
      query: (projectId) => {
        return {
          url: `${CURRENT_SLICE_ROUTE}/${projectId}`,
          method: "DELETE",
        }
      },
      invalidatesTags: [{ type: "Projects", id: "getAllProjects" }],
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
