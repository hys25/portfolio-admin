import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import instance from "../apiInstance"
import { useNavigate } from "react-router-dom"
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
// POST project
export const postProject = createAsyncThunk(
  "project",
  async (project, thunkAPI) => {
    try {
      // console.log({project})
      return await await instance.post(CURRENT_SLICE_ROUTE, project)
    } catch (error) {
      return thunkAPI.rejectWithMessage(getErrorMessage(error))
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
  },
})

export const { reset } = projectSlice.actions
export default projectSlice.reducer
