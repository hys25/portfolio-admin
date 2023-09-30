import { configureStore } from "@reduxjs/toolkit"
import messageReducer from "../features/message/messageSlice"
import { projectsApi } from "../features/project/projectApi"
import { skillsApi } from "../features/skill/skillsApi"
import { authApi } from "../features/auth/authService"
import { rtkQueryErrorLogger } from "./errorHandlerMiddeware"

export const store = configureStore({
  reducer: {
    message: messageReducer,
    [projectsApi.reducerPath]: projectsApi.reducer,
    [skillsApi.reducerPath]: skillsApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false })
      .concat(projectsApi.middleware)
      .concat(skillsApi.middleware)
      .concat(authApi.middleware)
      .concat(rtkQueryErrorLogger),
})
