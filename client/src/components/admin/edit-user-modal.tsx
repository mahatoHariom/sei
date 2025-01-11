"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { FormWrapper } from "@/components/global/form-wrapper";
import { FormFieldWrapper } from "@/components/global/form-field-wrapper";
// import * as z from "zod";
import { toast } from "sonner";
import { useUpdateProfile } from "@/hooks/users/user-update-profile";
import { useGetProfile } from "@/hooks/users/use-get-profile-hooks";
import {
  UserUpdateInput,
  userUpdateSchema,
} from "@/schema/users/complete-profile-schema";

interface EditUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
  onSuccess?: () => void;
  email?: string;
  fullName?: string;
}

export const EditUserModal = ({
  isOpen,
  onClose,
  userId,
  onSuccess,
  fullName,
  email,
}: EditUserModalProps) => {
  // Fetch user data
  const { data: userData, isLoading: isLoadingUser } = useGetProfile(userId);
  const { mutate: updateProfile, isPending } = useUpdateProfile();

  const handleSubmit = async (data: UserUpdateInput) => {
    updateProfile(data, {
      onSuccess: () => {
        toast.success("User profile updated successfully");
        onSuccess?.();
        onClose();
      },
      onError: (error) => {
        console.error("Failed to update user:", error);
        toast.error("Failed to update user profile");
      },
    });
  };

  if (isLoadingUser) {
    return null; // Or a loading spinner
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Edit User Profile</DialogTitle>
        </DialogHeader>

        <FormWrapper
          defaultValues={{
            fullName: fullName || "",
            email: email || "",
            phoneNumber: userData?.phoneNumber || "",
            address: userData?.address || "",
            fatherName: userData?.fatherName || "",
            motherName: userData?.motherName || "",
            schoolCollegeName: userData?.schoolCollegeName || "",
            parentContact: userData?.parentContact || "",
          }}
          validationSchema={userUpdateSchema}
          onSubmit={handleSubmit}
        >
          {({ control, isValid }) => (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                <FormFieldWrapper
                  name="fullName"
                  label="Full Name"
                  placeholder="Enter full name"
                  control={control}
                  disabled={isPending}
                />
                <FormFieldWrapper
                  name="email"
                  label="Email"
                  placeholder="Enter email"
                  control={control}
                  disabled={isPending}
                />
                <FormFieldWrapper
                  name="phoneNumber"
                  label="Phone Number"
                  placeholder="Enter phone number"
                  control={control}
                  disabled={isPending}
                />
                <FormFieldWrapper
                  name="address"
                  label="Address"
                  placeholder="Enter address"
                  control={control}
                  disabled={isPending}
                />
                <FormFieldWrapper
                  name="fatherName"
                  label="Father's Name"
                  placeholder="Enter father's name"
                  control={control}
                  disabled={isPending}
                />
                <FormFieldWrapper
                  name="motherName"
                  label="Mother's Name"
                  placeholder="Enter mother's name"
                  control={control}
                  disabled={isPending}
                />
                <FormFieldWrapper
                  name="schoolCollegeName"
                  label="School/College Name"
                  placeholder="Enter school or college name"
                  control={control}
                  disabled={isPending}
                />
                <FormFieldWrapper
                  name="parentContact"
                  label="Parent Contact"
                  placeholder="Enter parent's contact"
                  control={control}
                  disabled={isPending}
                />
              </div>
              <DialogFooter className="gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  disabled={isPending}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={!isValid || isPending}
                  loading={isPending}
                >
                  Save Changes
                </Button>
              </DialogFooter>
            </>
          )}
        </FormWrapper>
      </DialogContent>
    </Dialog>
  );
};
