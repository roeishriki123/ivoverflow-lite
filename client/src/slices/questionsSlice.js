import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getQuestions, createQuestion } from "../lib/api";

export const fetchQuestions = createAsyncThunk("questions/fetch", async () => {
  const res = await getQuestions();
  return res.data;
});

export const addQuestion = createAsyncThunk(
  "questions/add",
  async ({ title, body, tags }) => {
    const cleanTags = Array.isArray(tags)
      ? tags.map(t => String(t).trim()).filter(Boolean)
      : [];
    const res = await createQuestion({ title, body, tags: cleanTags });
    return res.data;
  }
);

const questionsSlice = createSlice({
  name: "questions",
  initialState: { list: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuestions.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchQuestions.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(fetchQuestions.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to load questions";
      })
      .addCase(addQuestion.fulfilled, (state, action) => {
        state.list.unshift(action.payload);
      });
  },
});

export default questionsSlice.reducer;
