/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
// import { toast } from "sonner";
// import { handleError } from "@/helpers/handle-error";
import { useSelector } from "react-redux";
import { FormWrapper } from "@/components/global/form-wrapper";
import { FormFieldWrapper } from "@/components/global/form-field-wrapper";
import { RootState } from "@/store/store";
// import { useUpdateProfile } from "@/hooks/users/user-update-profile";
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

  // const { mutate: updateProfile } = useUpdateProfile();

  const onSubmit = (data: UserUpdateInput) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (key === "profilePic" && value instanceof File) {
        formData.append(key, value);
      } else if (key !== "profilePic") {
        formData.append(key, value as string);
      }
    });

    // updateProfile(formData as any, {
    //   onSuccess: () => {
    //     toast.success("Profile updated successfully!");
    //     reset();
    //   },
    // onError: handleError,
    // });
  };

  return (
    <div className="p-6 lg:p-12 w-3/4 justify-center mx-auto">
      {/* <h2 className="text-3xl font-bold mb-4">Edit Profile</h2> */}
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
              <FormFieldWrapper
                name="fullName"
                label="Full Name"
                placeholder="Enter your full name..."
                control={control}
                disabled
              />
              <FormFieldWrapper
                name="email"
                label="Email"
                placeholder="Enter your email..."
                type="email"
                control={control}
                disabled
              />
              <FormFieldWrapper
                name="phoneNumber"
                label="Phone Number"
                placeholder="Enter your phone number..."
                control={control}
                disabled
              />
              <FormFieldWrapper
                name="address"
                label="Address"
                placeholder="Enter your address..."
                control={control}
                disabled
              />
              <FormFieldWrapper
                name="fatherName"
                label="Father's Name"
                placeholder="Enter your father's name..."
                control={control}
                disabled
              />
              <FormFieldWrapper
                name="motherName"
                label="Mother's Name"
                placeholder="Enter your mother's name..."
                control={control}
                disabled
              />
              <FormFieldWrapper
                name="schoolCollegeName"
                label="School/College Name"
                placeholder="Enter school or college name..."
                control={control}
                disabled
              />
              <FormFieldWrapper
                name="parentContact"
                label="Parent Contact"
                placeholder="Enter parent's contact..."
                control={control}
                disabled
              />
            </div>
          )}
        </FormWrapper>
      </div>
    </div>
  );
};

export default UserProfilePage;
