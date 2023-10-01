import { configureStore } from "@reduxjs/toolkit"
import { projectsApi } from "../features/project/projectApi"
import { skillsApi } from "../features/skill/skillsApi"
import { authApi } from "../features/auth/authService"
import { messageApi } from "../features/message/messageApi"
import { rtkQueryErrorLogger } from "./errorHandlerMiddeware"

export const store = configureStore({
  reducer: {
    [projectsApi.reducerPath]: projectsApi.reducer,
    [skillsApi.reducerPath]: skillsApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [messageApi.reducerPath]: messageApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false })
      .concat(projectsApi.middleware)
      .concat(skillsApi.middleware)
      .concat(authApi.middleware)
      .concat(messageApi.middleware)
      .concat(rtkQueryErrorLogger),
})
