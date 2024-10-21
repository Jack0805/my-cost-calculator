// src/store/reducers.ts
import { CostItemsInitialState, CostItem, EditItemTypePayload } from "./types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: CostItemsInitialState = {
  items: [],
};

const costItemsSlice = createSlice({
  name: "costItems",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CostItem>) {
      state.items.push(action.payload); // Add the new item
    },
    removeItem(state) {
      state.items.pop(); // Remove item by index
    },
    updateItem(state, action: PayloadAction<EditItemTypePayload>) {
      state.items[action.payload.itemIndex].shareBy[
        action.payload.shareByIndex
      ].isShared = action.payload.isShared;
    },
  },
});

export const { addItem, removeItem, updateItem } = costItemsSlice.actions;

export default costItemsSlice.reducer;
