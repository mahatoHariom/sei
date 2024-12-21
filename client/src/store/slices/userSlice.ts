import { UserRole } from "@/types";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Extend the initial state to include user details
const initialState = {
  id: "",
  fullName: "",
  email: "",
  isVerified: false,
  role: UserRole.USER,
  createdAt: "",
  updatedAt: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<typeof initialState>) => {
      return action.payload;
    },

    clearUser: (state) => {
      Object.assign(state, initialState);
    },
    updateUser: (
      state,
      action: PayloadAction<Partial<typeof initialState>>
    ) => {
      return { ...state, ...action.payload };
    },
  },
});

// Export actions and reducer
export const { setUser, clearUser, updateUser } = userSlice.actions;

export default userSlice.reducer;
