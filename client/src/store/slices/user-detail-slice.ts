import { ProfilePic } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the ProfilePic type

// Define the UserDetail type
export interface UserDetail {
  id: string;
  userId: string;
  phoneNumber?: string;
  address?: string;
  motherName?: string;
  fatherName?: string;
  profilePic?: ProfilePic; // Add profilePic field
  parentContact?: string;
  schoolCollegeName?: string;
}

// Initial state for the UserDetail slice
const initialState: UserDetail = {
  id: "",
  userId: "", // Set to empty or a default value
  phoneNumber: undefined,
  address: undefined,
  motherName: undefined,
  fatherName: undefined,
  profilePic: undefined, // Initialize as undefined
  parentContact: undefined,
  schoolCollegeName: undefined,
};

// Create the userDetail slice
const userDetailSlice = createSlice({
  name: "userDetail",
  initialState,
  reducers: {
    // Action to set user details
    setUserDetail: (state, action: PayloadAction<UserDetail>) => {
      return action.payload;
    },

    // Action to clear user details
    clearUserDetail: () => {
      return initialState;
    },

    // Action to update a partial set of user details
    updateUserDetail: (state, action: PayloadAction<Partial<UserDetail>>) => {
      return { ...state, ...action.payload };
    },
  },
});

// Dispatch example for updating profilePic
// dispatch(updateUserDetail({ profilePic }));

// Export actions and reducer
export const { setUserDetail, clearUserDetail, updateUserDetail } =
  userDetailSlice.actions;

export default userDetailSlice.reducer;
