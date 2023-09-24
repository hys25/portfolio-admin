import { configureStore } from "@reduxjs/toolkit"
import authReducer from "../features/auth/authSlice"
import skillReducer from "../features/skill/skillSlice"
import messageReducer from "../features/message/messageSlice"
import { projectsApi } from "../features/project/projectApi"
import { rtkQueryErrorLogger } from "./errorHandlerMiddeware"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    skill: skillReducer,
    message: messageReducer,
    [projectsApi.reducerPath]: projectsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false })
      .concat(projectsApi.middleware)
      .concat(rtkQueryErrorLogger),
})
