import { createSlice } from "@reduxjs/toolkit";

export const amountSlice = createSlice({
  name: "amount",
  initialState: {
    value: 0,
  },
  reducers: {
    addAmount: (state) => {
      state.value += 1;
    },
    // Redux Toolkit allows us to write "mutating" logic in reducers. It
    // doesn't actually mutate the state because it uses the Immer library,
    // which detects changes to a "draft state" and produces a brand new
    // immutable state based off those changes

    removeAmount: (state) => {
      state.value -= 1;
    },
  },
});

export const { addAmount, removeAmount } = amountSlice.actions;
export default amountSlice.reducer;
