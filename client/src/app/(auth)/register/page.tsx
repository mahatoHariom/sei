"use client";

import { toast } from "sonner";
import { Messages } from "@/constants/messages";
import { useRegisterUser } from "@/hooks/users/use-register-hooks";
import { FormWrapper } from "@/components/global/form-wrapper";
import { FormFieldWrapper } from "@/components/global/form-field-wrapper";
import { SignUpFormData, signUpSchema } from "@/schema/users/signup-schema";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { routesPath } from "@/constants/routes-path";

const SignUpForm = () => {
  const { mutate: registerUser, isPending } = useRegisterUser();
  const router = useRouter();
  const onSubmit = (data: SignUpFormData) => {
    registerUser(data, {
      onSuccess: () => {
        router.push(routesPath.login);
        toast.success(Messages.register.success);
      },
      onError: (error) => {
        console.error("Registration error:", error);
      },
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="w-full max-w-md p-6 shadow-md rounded-lg border">
        <h2 className="text-2xl font-bold text-center mb-2">
          Create an account
        </h2>
        <p className="text-gray-600 text-center mb-4">
          Please enter your details to create an account
        </p>
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
          {({ control, isValid }) => (
            <>
              <div className="flex flex-col gap-4 w-full">
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
                <Button type="submit" disabled={!isValid} loading={isPending}>
                  Submit
                </Button>
              </div>
            </>
          )}
        </FormWrapper>
        <p className="mt-6 text-center text-sm">
          Already have an account?{" "}
          <Link href={"/login"} className="text-blue-500 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpForm;
