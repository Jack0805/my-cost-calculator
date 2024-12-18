// src/store/reducers.ts
import {
  CostItemsInitialState,
  CostItem,
  EditItemTypePayload,
  EditItemExpendedTypePayload,
  EditItemEqualSplitPayload,
  EditPortionPayload,
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
      state.items.unshift(action.payload); // Add the new item
    },
    removeItem(state) {
      state.items = []; // Remove item by index
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
    updateEqualSplit(state, action: PayloadAction<EditItemEqualSplitPayload>) {
      state.items[action.payload.itemIndex].equalSplit =
        action.payload.equalSplit;
    },
    updatePortion(state, action: PayloadAction<EditPortionPayload>) {
      state.items[action.payload.itemIndex].shareBy[
        action.payload.shareByIndex
      ].portion = action.payload.portion as number;
    },
  },
});

export const {
  addItem,
  removeItem,
  removeSpecificItem,
  updateItem,
  updateExpand,
  updateEqualSplit,
  updatePortion,
} = costItemsSlice.actions;

export default costItemsSlice.reducer;
