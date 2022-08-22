import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import authService from "./authService"
import { useNavigate } from "react-router-dom"
import { getErrorMessage } from "../../utils/getErrorMessage"

//Get user from localStorage
const user = JSON.parse(localStorage.getItem("user_token"))

const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
}

// SignUp user
export const signUp = createAsyncThunk(
  "auth/sign-up",
  async (user, thunkAPI) => {
    try {
      return await authService.signUp(user)
    } catch (error) {
      return thunkAPI.rejectWithMessage(getErrorMessage(error))
    }
  }
)

// SignIn user
export const signIn = createAsyncThunk(
  "auth/sign-in",
  async (user, thunkAPI) => {
    try {
      return await authService.signIn(user)
    } catch (error) {
      return thunkAPI.rejectWithMessage(getErrorMessage(error))
    }
  }
)

export const logOut = createAsyncThunk("auth/log-out", async () => {
  await authService.logOut()
})

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      ;(state.isError = false),
        (state.isSuccess = false),
        (state.isLoading = false),
        (state.message = "")
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state) => {
        state.isLoading = true
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })
      .addCase(signUp.rejected, (state, action) => {
        state.isLoading = false
        state.error = true
        state.message = action.payload
        state.user = null
      })

      .addCase(signIn.pending, (state) => {
        state.isLoading = true
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })
      .addCase(signIn.rejected, (state, action) => {
        state.isLoading = false
        state.error = true
        state.message = action.payload
        state.user = null
      })
      .addCase(logOut.fulfilled, (state) => {
        state.user = null
      })
  },
})

export const { reset } = authSlice.actions
export default authSlice.reducer
