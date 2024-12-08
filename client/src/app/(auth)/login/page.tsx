/* eslint-disable react/no-unescaped-entities */
"use client";

import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { toast } from "sonner";
import { Messages } from "@/constants/messages";
import { useLoginUser } from "@/hooks/users/use-login-hooks";
import { LoginFormData, loginSchema } from "@/schema/users/login-schema";
import { handleError } from "@/helpers/handle-error";
import { setUser } from "@/store/slices/userSlice";
import { FormWrapper } from "@/components/global/form-wrapper";
import { FormFieldWrapper } from "@/components/global/form-field-wrapper";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import { routesPath } from "@/constants/routes-path";
import { useRouter } from "next/navigation";
import { BaseUser } from "@/types";

const LoginPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { mutate: loginUser, isPending } = useLoginUser();

  const onSubmit = (data: LoginFormData) => {
    loginUser(data, {
      onSuccess: (data) => {
        router.push(routesPath.home);
        // debugger;
        Cookies.set("accessToken", data.accessToken);
        Cookies.set("user", JSON.stringify(data.user)); // Set user cookie
        Cookies.set("refreshToken", data.refreshToken);
        dispatch(setUser(data?.user as BaseUser));
        toast.success(Messages.login.success);
      },
      onError: handleError,
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-6 shadow-md rounded-lg border ">
        <h2 className="text-2xl font-bold text-center mb-2">Login</h2>
        <p className="text-gray-600 text-center mb-4">
          Please enter your email and password to login to your account.
        </p>
        <FormWrapper
          defaultValues={{
            email: "",
            password: "",
          }}
          validationSchema={loginSchema}
          onSubmit={onSubmit}
        >
          {({ control, isValid }) => (
            <div className="flex flex-col gap-4 w-full">
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
              <Button
                type="submit"
                disabled={!isValid}
                loading={isPending}
                className="mt-4"
              >
                Submit
              </Button>
            </div>
          )}
        </FormWrapper>
        <p className="mt-6 text-center text-sm">
          Don't have an account?{" "}
          <Link href={"/register"} className="text-blue-500 hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
