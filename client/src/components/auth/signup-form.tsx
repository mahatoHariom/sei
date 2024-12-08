"use client";

import { useDispatch } from "react-redux";
import { closeModal } from "@/store/slices/modalSlice";
import { FormWrapper } from "../global/form-wrapper";
import { ModalFooter } from "../global/modal/modal-footer";
import { SignUpFormData, signUpSchema } from "@/schema/users/signup-schema";

import { FormFieldWrapper } from "../global/form-field-wrapper";

import { toast } from "sonner";
import { Messages } from "@/constants/messages";
import { useRegisterUser } from "@/hooks/users/use-register-hooks";

export const SignUpForm = () => {
  const dispatch = useDispatch();

  const { mutate: registerUser, isPending } = useRegisterUser();

  const onSubmit = (data: SignUpFormData) => {
    registerUser(data, {
      onSuccess: () => {
        dispatch(closeModal());
        toast.success(Messages.register.success);
      },
      onError: (error) => {
        console.error("Registration error:", error);
      },
    });
  };

  return (
    <FormWrapper
      defaultValues={{
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
      }}
      validationSchema={signUpSchema}
      onSubmit={onSubmit}
    >
      {({ control, isValid, handleSubmit }) => (
        <>
          <div className="flex flex-col gap-3 w-full">
            <FormFieldWrapper
              name="fullName"
              label="Full Name"
              placeholder="Full Name"
              control={control}
            />
            <FormFieldWrapper
              name="email"
              label="Email Address"
              placeholder="Email address"
              control={control}
            />
            <FormFieldWrapper
              name="password"
              label="Password"
              placeholder="Enter your password..."
              control={control}
            />
            <FormFieldWrapper
              name="confirmPassword"
              label="Confirm Password"
              placeholder="Confirm your password..."
              control={control}
            />

            <ModalFooter
              closeHandler={() => dispatch(closeModal())}
              onSubmit={handleSubmit(onSubmit)}
              isValid={isValid}
              loading={isPending}
            />
          </div>
        </>
      )}
    </FormWrapper>
  );
};
