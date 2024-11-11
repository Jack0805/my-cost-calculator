// src/store/reducers.ts
import {
  CostItemsInitialState,
  CostItem,
  EditItemTypePayload,
  EditItemExpendedTypePayload,
} from "./types";
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
    removeSpecificItem(state, action: PayloadAction<number>) {
      state.items.splice(action.payload, 1);
    },
    updateItem(state, action: PayloadAction<EditItemTypePayload>) {
      state.items[action.payload.itemIndex].shareBy[
        action.payload.shareByIndex
      ].isShared = action.payload.isShared;
    },
    updateExpand(state, action: PayloadAction<EditItemExpendedTypePayload>) {
      state.items[action.payload.itemIndex].accordionExpended =
        action.payload.expanded;
    },
  },
});

export const {
  addItem,
  removeItem,
  removeSpecificItem,
  updateItem,
  updateExpand,
} = costItemsSlice.actions;

export default costItemsSlice.reducer;
