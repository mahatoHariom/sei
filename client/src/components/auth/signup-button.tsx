"use client";
import { useDispatch } from "react-redux";
import { openModal } from "@/store/slices/modalSlice";

import { ModalContentKey } from "@/types/modal-keys";
import { Button } from "../ui/button";

export const SignUpButton = () => {
  const dispatch = useDispatch();

  const handleEditProfile = () => {
    dispatch(
      openModal({
        title: "SignUp",
        description: "Create account ,be a scholar,",
        contentKey: ModalContentKey.SignUpForm,
        isOpen: true,
      })
    );
  };

  return <Button onClick={handleEditProfile}>Signup</Button>;
};
