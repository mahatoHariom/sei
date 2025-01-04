/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import { useSelector } from "react-redux";
import { FormWrapper } from "@/components/global/form-wrapper";
import { FormFieldWrapper } from "@/components/global/form-field-wrapper";
import { RootState } from "@/store/store";
import { useUpdateProfile } from "@/hooks/users/user-update-profile";
import {
  UserUpdateInput,
  userUpdateSchema,
} from "@/schema/users/complete-profile-schema";
import { toast } from "sonner";
import { handleError } from "@/helpers/handle-error";
import { Button } from "@/components/ui/button";
import Image from "next/image";

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

  const { mutate: updateProfile } = useUpdateProfile();

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
    <div className="p-6 lg:p-12 w-3/4 justify-center mx-auto">
      <p className="text-red-600 mb-6 flex items-center">
        * Ask admin to edit details
      </p>
      <div className="max-w-3xl">
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
          {({ control }) => (
            <>
              <div className="flex flex-col items-center mb-4">
                {profilePic ? (
                  <Image
                    src={
                      `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/uploads/${profilePic}` ||
                      profilePic
                    }
                    alt="Profile picture"
                    fill
                    sizes="32px"
                    className="object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "/default-avatar.png";
                    }}
                  />
                ) : (
                  <div className="w-32 h-32 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 mb-2">
                    No Image
                  </div>
                )}
                <FormFieldWrapper
                  name="profilePic"
                  label="Update Profile Picture"
                  type="file"
                  accept="image/*"
                  control={control}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
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
              </div>
              <Button type="submit" className="w-full mt-3">
                Update
              </Button>
            </>
          )}
        </FormWrapper>
      </div>
    </div>
  );
};

export default UserProfilePage;
