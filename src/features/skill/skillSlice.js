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

const CURRENT_SLICE_ROUTE = "/skill"
// GET all skills
export const getSkills = createAsyncThunk("getSkills", async (_, thunkAPI) => {
  try {
    return await instance.get(CURRENT_SLICE_ROUTE)
  } catch (error) {
    toast(error.message)
    return thunkAPI.rejectWithValue(getErrorMessage(error))
  }
})

// POST skill
export const postSkill = createAsyncThunk(
  "postSkill",
  async (skill, thunkAPI) => {
    try {
      return await instance.post(CURRENT_SLICE_ROUTE, skill)
    } catch (error) {
      toast(error.message)
      return thunkAPI.rejectWithValue(getErrorMessage(error))
    }
  }
)

// PUT update skill
export const putSkill = createAsyncThunk(
  "putSkill",
  async ({ skillId, skillData }, thunkAPI) => {
    try {
      return await instance.put(`${CURRENT_SLICE_ROUTE}/${skillId}`, skillData)
    } catch (error) {
      toast(error.message)
      return thunkAPI.rejectWithValue(getErrorMessage(error))
    }
  }
)

// DELETE remove skill
export const deleteSkill = createAsyncThunk(
  "deleteSkill",
  async (skillId, thunkAPI) => {
    try {
      return await instance.delete(`${CURRENT_SLICE_ROUTE}/${skillId}`)
    } catch (error) {
      toast(error.message)
      return thunkAPI.rejectWithValue(getErrorMessage(error))
    }
  }
)

export const skillSlice = createSlice({
  name: "skill",
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
      .addCase(postSkill.pending, (state) => {
        state.isLoading = true
      })
      .addCase(postSkill.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.skill = action.payload
      })
      .addCase(postSkill.rejected, (state, action) => {
        state.isLoading = false
        state.error = true
        state.message = action.payload
        state.skill = null
      })
  },
})

export const { reset } = skillSlice.actions
export default skillSlice.reducer
