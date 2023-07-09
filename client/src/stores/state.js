import { createSlice } from "@reduxjs/toolkit"

export const stateSlice = createSlice({
  name: "state",
  initialState: {
    darkMode: false
  },
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode
    }
  },
});

// Action creators are generated for each case reducer function
export const { toggleDarkMode } = stateSlice.actions;

export const selectDarkMode = (state) => state.state.darkMode;

export default stateSlice.reducer;
