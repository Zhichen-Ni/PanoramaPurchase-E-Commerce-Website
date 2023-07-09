import { configureStore } from "@reduxjs/toolkit";
// import counterReducer from "./counter";
import userReducer from "./user";
import stateReducer from "./state";

export default configureStore({
  reducer: {
    // counter: counterReducer,
    user: userReducer,
    state: stateReducer
  },
});
