import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { toast } from "react-toastify"
import instance from "../apiInstance"
import { getErrorMessage } from "../../utils/getErrorMessage"

const initialState = {
  projects: null,
  project: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
}

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
          method: 'POST',
          body: projectData,
        }
      }
    }),
    putProject: builder.mutation({
      query: ({projectId, projectData}) => {
        return {
          url: `${CURRENT_SLICE_ROUTE}/${projectId}`,
          method: 'PUT',
          body: projectData,
        }
      }
    }),
    deleteProject: builder.mutation({
      query: (projectId) => {
        return {
          url: `${CURRENT_SLICE_ROUTE}/${projectId}`,
          method: 'DELETE',
        }
      }
    }),
  })
})

export const { useGetAllProjectsQuery, useGetProjectQuery, useAddProjectMutation, usePutProjectMutation, useDeleteProjectMutation } = projectsApi

// POST project
export const postProject = createAsyncThunk(
  "postProject",
  async (project, thunkAPI) => {
    try {
      return await instance.post(CURRENT_SLICE_ROUTE, project)
    } catch (error) {
      toast(error.message)
      return thunkAPI.rejectWithValue(getErrorMessage(error))
    }
  }
)
// GET all projects
export const getProjects = createAsyncThunk(
  "getProjects",
  async (_, thunkAPI) => {
    try {
      return await instance.get(CURRENT_SLICE_ROUTE)
    } catch (error) {
      toast(error.message)
      return thunkAPI.rejectWithValue(getErrorMessage(error))
    }
  }
)
// GET project
export const getProject = createAsyncThunk(
  "getProject",
  async (projectId, thunkAPI) => {
    try {
      return await instance.get(
        `${CURRENT_SLICE_ROUTE}/${projectId}`,
        projectId
      )
    } catch (error) {
      toast(error.message)
      return thunkAPI.rejectWithValue(getErrorMessage(error))
    }
  }
)
// PUT update project
export const putProject = createAsyncThunk(
  "putProject",
  async ({ projectId, projectData }, thunkAPI) => {
    try {
      return await instance.put(
        `${CURRENT_SLICE_ROUTE}/${projectId}`,
        projectData
      )
    } catch (error) {
      toast(error.message)
      return thunkAPI.rejectWithValue(getErrorMessage(error))
    }
  }
)
// DELETE remove project
export const deleteProject = createAsyncThunk(
  "deleteProject",
  async (projectId, thunkAPI) => {
    try {
      return await instance.delete(`${CURRENT_SLICE_ROUTE}/${projectId}`)
    } catch (error) {
      toast(error.message)
      return thunkAPI.rejectWithValue(getErrorMessage(error))
    }
  }
)

export const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false
      state.isSuccess = false
      state.isLoading = false
      state.message = ""
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postProject.pending, (state) => {
        state.isLoading = true
      })
      .addCase(postProject.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.project = action.payload
      })
      .addCase(postProject.rejected, (state, action) => {
        state.isLoading = false
        state.error = true
        state.message = action.payload
        state.project = null
      })
      .addCase(getProjects.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getProjects.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.projects = action.payload.data
      })
      .addCase(getProjects.rejected, (state, action) => {
        state.isLoading = false
        state.error = true
        state.message = action.payload
        state.projects = null
      })
      .addCase(getProject.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getProject.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.project = action.payload.data
      })
      .addCase(getProject.rejected, (state, action) => {
        state.isLoading = false
        state.error = true
        state.message = action.payload
        state.project = null
      })
  },
})

export const { reset } = projectSlice.actions
export default projectSlice.reducer