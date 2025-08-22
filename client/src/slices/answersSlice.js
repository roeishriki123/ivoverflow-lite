import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// נשתמש ב־axios ישיר כי לא הוספת פונקציות ב־api.js עבור תשובות
const BASE = "http://localhost:4000/api";
const authHeader = () => ({ Authorization: `Bearer ${localStorage.getItem("token")}` });

// מביא את כל התשובות לשאלה
export const fetchAnswers = createAsyncThunk(
  "answers/fetch",
  async (questionId) => {
    const res = await axios.get(`${BASE}/answers/${questionId}`, { headers: authHeader() });
    return { questionId, answers: res.data };
  }
);

// מוסיף תשובה ואז מרענן את הרשימה
export const addAnswer = createAsyncThunk(
  "answers/add",
  async ({ questionId, body }) => {
    await axios.post(`${BASE}/answer`, { questionId, body }, { headers: authHeader() });
    const res = await axios.get(`${BASE}/answers/${questionId}`, { headers: authHeader() });
    return { questionId, answers: res.data };
  }
);

// state בצורת map: { [questionId]: Answer[] }
const answersSlice = createSlice({
  name: "answers",
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnswers.fulfilled, (state, action) => {
        state[action.payload.questionId] = action.payload.answers;
      })
      .addCase(addAnswer.fulfilled, (state, action) => {
        state[action.payload.questionId] = action.payload.answers;
      });
  },
});

export default answersSlice.reducer;
