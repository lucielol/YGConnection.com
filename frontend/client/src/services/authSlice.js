import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  user: null,
  role: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("userId", action.payload.user.id);
      localStorage.setItem("role", action.payload.user.role);
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.role = action.payload.user.role;
      state.token = action.payload.token;
    },
    logout(state) {
      localStorage.clear();
      state.isAuthenticated = false;
      state.user = null;
      state.role = null;
      state.token = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
