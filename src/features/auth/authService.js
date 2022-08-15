import axios from "axios"

const API_URL = "/auth/"

// SignUp user
const signUp = async (userData) => {
  const response = await axios.post(API_URL + "sign-up", userData)
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data))
  }
  return response.data
}

// SignIn user
const signIn = async (userData) => {
  const response = await axios.post(API_URL + "sign-in", userData)
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data))
  }
  return response.data
}

// LogOut user
const logOut = async () => {
  localStorage.removeItem("user")
}

const authService = {
  signUp,
  logOut,
  signIn,
}

export default authService
