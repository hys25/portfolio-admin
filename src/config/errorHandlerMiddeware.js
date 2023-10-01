import { isRejectedWithValue, isRejected } from "@reduxjs/toolkit"
import { toast } from "react-toastify"

export const rtkQueryErrorLogger = () => (next) => (action) => {
  if (isRejectedWithValue(action) || isRejected(action)) {
    const errorMessage = `Endpoint: ${
      action.meta?.arg?.endpointName
    }, status: ${action.payload?.status},
    message: ${
      action.payload?.data?.message
        ? action.payload?.data?.message
        : "No error message"
    }`
    toast(errorMessage)
  }
  return next(action)
}
