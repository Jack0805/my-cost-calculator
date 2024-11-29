import { configureStore } from "@reduxjs/toolkit";
import groupMembersReducer from "./groupMembersSlice";
import costItemsReducer from "./costItemsSlice";

// const store = createStore(rootReducer, composeEnhancers());
const store = configureStore({
  reducer: {
    groupMember: groupMembersReducer,
    costItems: costItemsReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
