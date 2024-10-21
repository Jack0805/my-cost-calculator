// src/store/reducers.ts
import { GroupMemberInitialState } from "./types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: GroupMemberInitialState = {
  names: [],
};

const groupMembersSlice = createSlice({
  name: "groupMembers",
  initialState,
  reducers: {
    addMember(state, action: PayloadAction<string>) {
      state.names.push(action.payload); // Add the new item
    },
    removeMember(state) {
      state.names.pop(); // Remove item by index
    },
  },
});

export const { addMember, removeMember } = groupMembersSlice.actions;

export default groupMembersSlice.reducer;
