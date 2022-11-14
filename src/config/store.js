import { configureStore } from "@reduxjs/toolkit"
import authReducer from "../features/auth/authSlice"
import projectReducer from "../features/project/projectSlice"
import skillReducer from "../features/skill/skillSlice"
import messageReducer from "../features/message/messageSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    project: projectReducer,
    skill: skillReducer,
    message: messageReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})
