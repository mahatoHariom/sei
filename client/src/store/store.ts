/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  combineReducers,
  configureStore,
  createAction,
} from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

import modalReducer from "./slices/modalSlice";
import userReducer from "./slices/userSlice";
import userDetailReducer from "./slices/user-detail-slice";

// Create reset action
export const resetState = createAction("RESET_STATE");

// Define the persist configuration
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["modal", "user", "userDetail"],
};

// Create the root reducer with reset functionality
const rootReducer = combineReducers({
  modal: modalReducer,
  user: userReducer,
  userDetail: userDetailReducer,
});

// Type for the root state
type RootStateType = ReturnType<typeof rootReducer>;

// Create app reducer that handles reset
const appReducer = (state: RootStateType | undefined, action: any) => {
  if (action.type === resetState.type) {
    // Clear redux persist storage
    storage.removeItem("persist:root");

    // Return initial state of all reducers
    return rootReducer(undefined, action);
  }
  return rootReducer(state, action);
};

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, appReducer);

// Configure store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Create persistor
export const persistor = persistStore(store);

// Export types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
