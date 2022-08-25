import axios from "axios"

const instance = axios.create({
  baseURL: process.env.REACT_APP_BE_HOST,
  headers: { Accept: "application/json", "Access-Control-Allow-Origin": "*" },
})

export default instance
