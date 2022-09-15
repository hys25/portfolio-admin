import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import instance from "../apiInstance"
import { getErrorMessage } from "../../utils/getErrorMessage"
import { ToastContainer } from "react-toastify"
import { toast } from "react-toastify"

const initialState = {
  projects: null,
  project: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
}
const CURRENT_SLICE_ROUTE = "/project"
// POST project
export const postProject = createAsyncThunk(
  "project",
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
  "/projects",
  async (_, thunkAPI) => {
    try {
      return await instance.get("/projects")
    } catch (error) {
      toast(error.message)
      return thunkAPI.rejectWithValue(getErrorMessage(error))
    }
  }
)
// GET project
export const getProject = createAsyncThunk(
  "/project",
  async (projectId, thunkAPI) => {
    try {
      return await instance.get(`/project/${projectId}`, projectId)
    } catch (error) {
      toast(error.message)
      return thunkAPI.rejectWithValue(getErrorMessage(error))
    }
  }
)
// PUT update project
export const putProject = createAsyncThunk(
  "project",
  async (projectId, project, thunkAPI) => {
    try {
      return await instance.put(`/project/${projectId}`, project)
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
