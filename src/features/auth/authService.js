import axios from "axios"
import instance from "../apiInstance"

const CURRENT_SLICE_ROUTE = "/auth/"

// SignUp user
const signUp = async (userData) => {
  const response = await instance.post(
    CURRENT_SLICE_ROUTE + "sign-up",
    userData
  )
  if (response.data) {
    localStorage.setItem("user_token", JSON.stringify(response.data.token))
  }
  return response.data
}

// SignIn user
const signIn = async (userData) => {
  const response = await instance.post(
    CURRENT_SLICE_ROUTE + "sign-in",
    userData
  )
  if (response.data) {
    localStorage.setItem("user_token", JSON.stringify(response.data.token))
  }
  return response.data
}

// LogOut user
const logOut = async () => {
  localStorage.removeItem("user_token")
}

const authService = {
  signUp,
  logOut,
  signIn,
}

export default authService
