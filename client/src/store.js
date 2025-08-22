import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import questionsReducer from "./slices/questionsSlice";
import answersReducer from "./slices/answersSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    questions: questionsReducer,
    answers: answersReducer,
  },
});
