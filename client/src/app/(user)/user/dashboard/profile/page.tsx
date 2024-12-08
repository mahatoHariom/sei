/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import { toast } from "sonner";
import { handleError } from "@/helpers/handle-error";
import { useSelector } from "react-redux";
import { FormWrapper } from "@/components/global/form-wrapper";
import { FormFieldWrapper } from "@/components/global/form-field-wrapper";
import { Button } from "@/components/ui/button";
import { RootState } from "@/store/store";
import { useUpdateProfile } from "@/hooks/users/user-update-profile";
import {
  UserUpdateInput,
  userUpdateSchema,
} from "@/schema/users/complete-profile-schema";

const UserProfilePage = () => {
  const { email, fullName } = useSelector((state: RootState) => state.user);
  const {
    address,
    fatherName,
    motherName,
    schoolCollegeName,
    parentContact,
    phoneNumber,
    profilePic,
  } = useSelector((state: RootState) => state.userDetail);

  const { mutate: updateProfile, isPending } = useUpdateProfile();

  const onSubmit = (data: UserUpdateInput, reset: () => void) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (key === "profilePic" && value instanceof File) {
        formData.append(key, value);
      } else if (key !== "profilePic") {
        formData.append(key, value as string);
      }
    });

    updateProfile(formData as any, {
      onSuccess: () => {
        toast.success("Profile updated successfully!");
        reset();
      },
      onError: handleError,
    });
  };

  return (
    <div className="p-6 lg:p-12 w-1/2 justify-center mx-auto">
      <h2 className="text-3xl font-bold mb-4">Edit Profile</h2>
      <p className="text-gray-600 mb-6">
        Update your account details by filling out the form below.
      </p>
      <div className="max-w-lg">
        <FormWrapper
          defaultValues={{
            email: email,
            fullName: fullName,
            phoneNumber: phoneNumber,
            address: address,
            fatherName: fatherName,
            motherName: motherName,
            schoolCollegeName: schoolCollegeName,
            parentContact: parentContact,
            profilePic: profilePic,
          }}
          validationSchema={userUpdateSchema}
          onSubmit={onSubmit}
        >
          {({ control, isValid }) => (
            <div className="flex flex-col gap-4 w-full">
              <FormFieldWrapper
                name="fullName"
                label="Full Name"
                placeholder="Enter your full name..."
                control={control}
              />
              <FormFieldWrapper
                name="email"
                label="Email"
                placeholder="Enter your email..."
                type="email"
                control={control}
              />
              <FormFieldWrapper
                name="phoneNumber"
                label="Phone Number"
                placeholder="Enter your phone number..."
                control={control}
              />
              <FormFieldWrapper
                name="address"
                label="Address"
                placeholder="Enter your address..."
                control={control}
              />
              <FormFieldWrapper
                name="fatherName"
                label="Father's Name"
                placeholder="Enter your father's name..."
                control={control}
              />
              <FormFieldWrapper
                name="motherName"
                label="Mother's Name"
                placeholder="Enter your mother's name..."
                control={control}
              />
              <FormFieldWrapper
                name="schoolCollegeName"
                label="School/College Name"
                placeholder="Enter school or college name..."
                control={control}
              />
              <FormFieldWrapper
                name="parentContact"
                label="Parent Contact"
                placeholder="Enter parent's contact..."
                control={control}
              />
              <FormFieldWrapper
                name="profilePic"
                label="Profile Picture"
                type="file"
                accept="image/*"
                control={control}
              />
              <Button
                type="submit"
                disabled={!isValid}
                loading={isPending}
                className="mt-4"
              >
                Update Profile
              </Button>
            </div>
          )}
        </FormWrapper>
      </div>
    </div>
  );
};

export default UserProfilePage;
