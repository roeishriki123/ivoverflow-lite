import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE = "http://localhost:4000/api";
const authHeader = () => ({ Authorization: `Bearer ${localStorage.getItem("token")}` });

export const fetchAnswers = createAsyncThunk(
  "answers/fetch",
  async (questionId) => {
    const res = await axios.get(`${BASE}/getQuestionAnswers`, {
      params: { questionId },
      headers: authHeader(),
    });
    return { questionId, answers: res.data };
  }
);

// fetch all answers for a question
export const addAnswer = createAsyncThunk(
  "answers/add",
  async ({ questionId, body }) => {
    await axios.post(`${BASE}/answer`, { questionId, body }, { headers: authHeader() });
    const res = await axios.get(`${BASE}/getQuestionAnswers`, {
      params: { questionId },
      headers: authHeader(),
    });
    return { questionId, answers: res.data };
  }
);

// Redux slice: answers stored as { [questionId]: Answer[] }
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
