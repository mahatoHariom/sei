"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { closeModal } from "@/store/slices/modalSlice";
import { getModalContent } from "@/components/component-registery";

export const GlobalModal = () => {
  const dispatch = useDispatch();
  const { isOpen, title, description, contentKey } = useSelector(
    (state: RootState) => state.modal
  );

  const hideModal = () => {
    dispatch(closeModal());
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={hideModal}>
      <DialogContent className="w-fit border min-w-96 ">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <div className="py-4  h-full ">{getModalContent(contentKey)}</div>
      </DialogContent>
    </Dialog>
  );
};
