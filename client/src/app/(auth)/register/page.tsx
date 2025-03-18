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
import { ArrowLeftIcon } from "lucide-react";
// import Image from "next/image";

const SignUpForm = () => {
  const { mutate: registerUser, isPending } = useRegisterUser();
  const router = useRouter();

  const onSubmit = (data: SignUpFormData) => {
    registerUser(data, {
      onSuccess: () => {
        debugger;
        router.push(routesPath.login);
        toast.success(Messages.register.success);
      },
      onError: (error) => {
        console.error("Registration error:", error);
      },
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      {/* <div className="mb-3">
        <Image
          src="/sei-logo.jpg"
          width={100}
          height={100}
          alt="sei"
          className="mx-auto"
        />
      </div> */}

      <div className="w-full max-w-md">
        <div className="bg-primary-foreground p-8 shadow-md rounded-lg border">
          <div className="flex justify-between items-center mb-6">
            <Link href={routesPath.home}>
              <Button variant="outline" size="sm">
                <ArrowLeftIcon className="w-4 h-4 mr-2" />
                Go to Home
              </Button>
            </Link>
          </div>

          <h2 className="text-2xl font-bold text-center mb-2">
            Create an account
          </h2>
          <p className="text-gray-600 text-center mb-6">
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
              <div className="space-y-4">
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
                  type="password"
                  placeholder="Enter your password..."
                  control={control}
                />
                <FormFieldWrapper
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  placeholder="Confirm your password..."
                  control={control}
                />
                <Button
                  type="submit"
                  disabled={!isValid}
                  loading={isPending}
                  className="w-full mt-6"
                >
                  Submit
                </Button>
              </div>
            )}
          </FormWrapper>

          <div className="mt-6 text-center text-sm">
            <p>
              Already have an account?{" "}
              <Link href="/login" className="text-blue-500 hover:underline">
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
