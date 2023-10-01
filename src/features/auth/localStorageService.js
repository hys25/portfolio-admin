import { toast } from "react-toastify"

const TOKEN_KEY = "user_token"

export const LSService = {
  setToken: async (queryFulfilled) => {
    try {
      const { data: response } = await queryFulfilled
      if (response.token) {
        localStorage.setItem(TOKEN_KEY, JSON.stringify(response.token))
      }
    } catch (err) {
      toast.error(err)
    }
  },
  removeToken: () => {
    localStorage.removeItem(TOKEN_KEY)
  },
  getToken: () => {
    return localStorage.getItem(TOKEN_KEY)
  },
}
