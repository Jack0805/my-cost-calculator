import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import groupMembersReducer from "./groupMembersSlice";
import costItemsReducer from "./costItemsSlice";

import { persistStore, persistReducer, PersistConfig } from "redux-persist";
import storage from "redux-persist/lib/storage";

// Configure `redux-persist`
const persistConfig: PersistConfig<RootState> = {
  key: "root",
  storage, // Defaults to `localStorage`
};

// Combine your reducers into a single root reducer
const rootReducer = combineReducers({
  groupMember: groupMembersReducer,
  costItems: costItemsReducer,
});
// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
});

// Create a persistor to persist and rehydrate the state
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export default store;
