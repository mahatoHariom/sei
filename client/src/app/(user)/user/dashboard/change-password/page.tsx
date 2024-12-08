"use client";

import React from "react";
import { toast } from "sonner";
import { handleError } from "@/helpers/handle-error";
import { FormWrapper } from "@/components/global/form-wrapper";
import { FormFieldWrapper } from "@/components/global/form-field-wrapper";
import { Button } from "@/components/ui/button";
import { useChangePassword } from "@/hooks/users/user-change-password";
import { changePasswordSchema } from "@/schema/users/change-password-schema";

const ChangePassword = () => {
  const { mutate: updatePassword, isPending } = useChangePassword();

  const onSubmit = (
    data: { password: string; confirmPassword: string },
    reset: () => void
  ) => {
    updatePassword(data, {
      onSuccess: () => {
        toast.success("Password updated successfully!");
        reset();
      },
      onError: handleError,
    });
  };

  return (
    <div className="p-6 lg:p-12 w-1/2 justify-center mx-auto">
      <h2 className="text-3xl font-bold mb-4">Change Password</h2>
      <p className="text-gray-600 mb-6">
        Update your account&apos;s password by filling out the form below.
      </p>
      <div className="max-w-lg">
        <FormWrapper
          defaultValues={{
            password: "",
            confirmPassword: "",
          }}
          validationSchema={changePasswordSchema}
          onSubmit={onSubmit}
        >
          {({ control, isValid }) => (
            <div className="flex flex-col gap-4 w-full">
              <FormFieldWrapper
                name="password"
                label="New Password"
                placeholder="Enter your new password..."
                type="password"
                control={control}
              />
              <FormFieldWrapper
                name="confirmPassword"
                label="Confirm New Password"
                placeholder="Re-enter your new password..."
                type="password"
                control={control}
              />
              <Button
                type="submit"
                disabled={!isValid}
                loading={isPending}
                className="mt-4"
              >
                Update Password
              </Button>
            </div>
          )}
        </FormWrapper>
      </div>
    </div>
  );
};

export default ChangePassword;
