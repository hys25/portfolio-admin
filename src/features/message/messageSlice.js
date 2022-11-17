import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { toast } from "react-toastify"
import instance from "../apiInstance"
import { getErrorMessage } from "../../utils/getErrorMessage"

const initialState = {
  messages: null,
  message: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
}

const CURRENT_SLICE_ROUTE = "/message"

// GET all message
export const getMessages = createAsyncThunk(
  "getMessages",
  async (_, thunkAPI) => {
    try {
      return await instance.get(CURRENT_SLICE_ROUTE)
    } catch (error) {
      toast(error.message)
      return thunkAPI.rejectWithValue(getErrorMessage(error))
    }
  }
)
// GET message
export const getMessage = createAsyncThunk(
  "getMessage",
  async (messageId, thunkAPI) => {
    try {
      return await instance.get(`${CURRENT_SLICE_ROUTE}/${messageId}`)
    } catch (error) {
      toast(error.message)
      return thunkAPI.rejectWithValue(getErrorMessage(error))
    }
  }
)
// DELETE remove message
export const deleteMessage = createAsyncThunk(
  "deleteMessage",
  async (messageId, thunkAPI) => {
    try {
      return await instance.delete(`${CURRENT_SLICE_ROUTE}/${messageId}`)
    } catch (error) {
      toast(error.message)
      return thunkAPI.rejectWithValue(getErrorMessage(error))
    }
  }
)

export const messagesSlice = createSlice({
  name: "message",
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
      .addCase(getMessages.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getMessages.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.messages = action.payload.data
      })
      .addCase(getMessages.rejected, (state, action) => {
        state.isLoading = false
        state.error = true
        state.message = action.payload
        state.messages = null
      })
      .addCase(getMessage.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getMessage.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.message = action.payload.data
      })
      .addCase(getMessage.rejected, (state, action) => {
        state.isLoading = false
        state.error = true
        state.message = action.payload
        state.message = null
      })
  },
})

export const { reset } = messagesSlice.actions
export default messagesSlice.reducer
