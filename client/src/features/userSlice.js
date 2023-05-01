import { createSlice } from "@reduxjs/toolkit";

const getLocalStoreItem = () => {
  if (localStorage.getItem("loginStatus") === null) {
    return false;
  } else {
    return JSON.parse(localStorage.getItem("loginStatus"));
  }
};

export const userSlice = createSlice({
  name: "user",
  initialState: { isLoggedIn: getLocalStoreItem(), firstRender: true },
  reducers: {
    login: (state) => {
      localStorage.setItem("loginStatus", "true");
      state.isLoggedIn = getLocalStoreItem();
    },
    logout: (state) => {
      localStorage.setItem("loginStatus", "false");
      state.isLoggedIn = getLocalStoreItem();
    },
    updateRender: (state) => {
      state.firstRender = false;
    },
  },
});

// export reducer and action createor
// Action creators are generated for each case reducer function
export const { login, logout, updateRender } = userSlice.actions;

export default userSlice.reducer;
