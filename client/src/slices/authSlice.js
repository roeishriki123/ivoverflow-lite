import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("token") || null, // persist token
  user: null, 
};

// Redux slice for authentication (token + user info)
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // save token to state + localStorage
    setToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem("token", action.payload);
    },
    // clear token from state + localStorage
    clearToken: (state) => {
      state.token = null;
      localStorage.removeItem("token");
    },
    // set user info in state
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setToken, clearToken, setUser } = authSlice.actions;
export default authSlice.reducer;
