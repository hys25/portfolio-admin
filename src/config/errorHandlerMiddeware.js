import { isRejectedWithValue } from "@reduxjs/toolkit"
import { toast } from "react-toastify"

export const rtkQueryErrorLogger = () => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    toast(action.payload.data.message)
  }
  return next(action)
}
