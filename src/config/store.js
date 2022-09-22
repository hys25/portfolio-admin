import { configureStore } from "@reduxjs/toolkit"
import authReducer from "../features/auth/authSlice"
import projectReducer from "../features/project/projectSlice"
import skillReducer from "../features/skill/skillSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    project: projectReducer,
    skill: skillReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})
