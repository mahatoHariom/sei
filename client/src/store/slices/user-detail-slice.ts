import { UserDetail } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: UserDetail = {
  id: "",
  userId: "", // Set to empty or a default value
  phoneNumber: undefined,
  address: undefined,
  motherName: undefined,
  fatherName: undefined,
  profilePic: undefined,
  parentContact: undefined,
  schoolCollegeName: undefined,
};

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

// Export actions and reducer
export const { setUserDetail, clearUserDetail, updateUserDetail } =
  userDetailSlice.actions;

export default userDetailSlice.reducer;
