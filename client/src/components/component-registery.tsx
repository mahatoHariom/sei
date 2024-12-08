"use client";
import { ModalContentKey } from "@/types/modal-keys";
import { SignUpForm } from "./auth/signup-form";

const componentRegistry: Partial<Record<ModalContentKey, () => JSX.Element>> = {
  [ModalContentKey.SignUpForm]: SignUpForm,
};

export const getModalContent = (key: ModalContentKey | null) => {
  if (key && componentRegistry[key]) {
    const Component = componentRegistry[key]!;
    return <Component />;
  }
  return null;
};
