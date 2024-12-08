"use client";
import { useDispatch } from "react-redux";
import { openModal } from "@/store/slices/modalSlice";
import { Button } from "./ui/button";
import { ModalContentKey } from "@/types/modal-keys";

export const EditProfile = () => {
  const dispatch = useDispatch();

  const handleEditProfile = () => {
    dispatch(
      openModal({
        title: "Edit Profile",
        description: "Make changes to your profile.",
        contentKey: ModalContentKey.EditProfileForm,
        isOpen: true,
      })
    );
  };

  return <Button onClick={handleEditProfile}>Edit Profile</Button>;
};
