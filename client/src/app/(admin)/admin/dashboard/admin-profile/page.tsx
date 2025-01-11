/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
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

import { updateUser } from "@/store/slices/userSlice";
import { setUserDetail } from "@/store/slices/user-detail-slice";
import ProfileUpload from "@/components/profile-upload";

const AdminProfilePage = () => {
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
  const dispatch = useDispatch();

  const onSubmit = (data: UserUpdateInput) => {
    updateProfile(data, {
      onSuccess: (response) => {
        dispatch(
          updateUser({
            email: response.data.email,
            fullName: response.data.fullName,
          })
        );
        if (response.data.userDetail) {
          dispatch(setUserDetail(response.data.userDetail));
        }
        toast.success("Profile updated successfully!");
      },
      onError: handleError,
    });
  };

  return (
    <div className="p-6 lg:p-12 w-3/4 justify-center mx-auto">
      {/* <p className="text-red-600 mb-6 flex items-center">
        * Ask admin to edit details
      </p> */}
      <div className="max-w-3xl">
        <ProfileUpload profilePic={profilePic} />
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
          }}
          validationSchema={userUpdateSchema}
          onSubmit={onSubmit}
        >
          {({ control, isValid }) => (
            <>
              <div className="flex flex-col items-center mb-4"></div>
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
              <Button type="submit" className="w-full mt-3" disabled={!isValid}>
                Update
              </Button>
            </>
          )}
        </FormWrapper>
      </div>
    </div>
  );
};

export default AdminProfilePage;
