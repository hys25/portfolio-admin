import { configureStore } from "@reduxjs/toolkit"
import authReducer from "../features/auth/authSlice"
import projectReducer from "../features/project/projectSlice"
import skillsReducer from "../features/skills/skillsSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    project: projectReducer,
    skills: skillsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})
