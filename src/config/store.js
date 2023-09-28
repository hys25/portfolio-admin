import { configureStore } from "@reduxjs/toolkit"
import authReducer from "../features/auth/authSlice"
import messageReducer from "../features/message/messageSlice"
import { projectsApi } from "../features/project/projectApi"
import { skillsApi } from "../features/skill/skillsApi"
import { rtkQueryErrorLogger } from "./errorHandlerMiddeware"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    message: messageReducer,
    [projectsApi.reducerPath]: projectsApi.reducer,
    [skillsApi.reducerPath]: skillsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false })
      .concat(projectsApi.middleware)
      .concat(skillsApi.middleware)
      .concat(rtkQueryErrorLogger),
})
