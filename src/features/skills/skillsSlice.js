import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import instance from "../apiInstance"
import { getErrorMessage } from "../../utils/getErrorMessage"
import { ToastContainer } from "react-toastify"
import { toast } from "react-toastify"

const initialState = {
  skills: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
}

const CURRENT_SLICE_ROUTE = "/skills"
// GET all skills
export const getSkills = createAsyncThunk("/skills", async (_, thunkAPI) => {
  try {
    return await instance.get("/skills")
  } catch (error) {
    toast(error.message)
    return thunkAPI.rejectWithValue(getErrorMessage(error))
  }
})

export const skillsSlice = createSlice({
  name: "skills",
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
      .addCase(getSkills.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getSkills.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.skills = action.payload.data
      })
      .addCase(getSkills.rejected, (state, action) => {
        state.isLoading = false
        state.error = true
        state.message = action.payload
        state.skills = null
      })
  },
})

export const { reset } = skillsSlice.actions
export default skillsSlice.reducer
