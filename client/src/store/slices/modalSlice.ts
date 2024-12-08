import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ModalContentKey } from "@/types/modal-keys";

interface ModalState {
  isOpen: boolean;
  title: string;
  description: string;
  contentKey: ModalContentKey | null;
}

const initialState: ModalState = {
  isOpen: false,
  title: "",
  description: "",
  contentKey: null,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<ModalState>) => {
      // Ensure only one modal is open at a time
      return { ...action.payload, isOpen: true };
    },
    closeModal: (state) => {
      state.isOpen = false;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
