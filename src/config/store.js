import { configureStore } from "@reduxjs/toolkit"
import authReducer from "../features/auth/authSlice"
import projectReducer from "../features/project/projectSlice"
import skillReducer from "../features/skill/skillSlice"
import messageReducer from "../features/message/messageSlice"
import {projectsApi} from "../features/project/projectSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    project: projectReducer,
    skill: skillReducer,
    message: messageReducer,
    [projectsApi.reducerPath]: projectsApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(projectsApi.middleware),
})
