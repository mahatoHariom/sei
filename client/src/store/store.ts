import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

import modalReducer from "./slices/modalSlice";
import userReducer from "./slices/userSlice";
import userDetailReducer from "./slices/user-detail-slice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["modal", "user", "usrDetail"],
};

// Combine all reducers first
const rootReducer = combineReducers({
  modal: modalReducer,
  user: userReducer,
  userDetail: userDetailReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
