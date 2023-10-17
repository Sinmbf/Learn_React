import { configureStore } from "@reduxjs/toolkit";
import amountSliceReducer from "./slices/amountSlice";

const store = configureStore({
  reducer: {
    amount: amountSliceReducer,
  },
});

export default store;
