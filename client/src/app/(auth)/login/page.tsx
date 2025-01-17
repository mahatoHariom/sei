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
import { ArrowLeftIcon } from "lucide-react";
import Image from "next/image";

const LoginPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { mutate: loginUser, isPending } = useLoginUser();

  const onSubmit = (data: LoginFormData) => {
    loginUser(data, {
      onSuccess: (data) => {
        Cookies.set("accessToken", data.accessToken);
        Cookies.set("user", JSON.stringify(data.user));
        Cookies.set("refreshToken", data.refreshToken);
        dispatch(setUser(data?.user as BaseUser));
        router.push(routesPath.home);
        toast.success(Messages.login.success);
      },
      onError: handleError,
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="mb-3">
        <Image
          src="/sei-logo.jpg"
          width={100}
          height={100}
          alt="sei"
          className="mx-auto"
        />
      </div>

      <div className="w-full max-w-md">
        <div className="bg-white p-8 shadow-md rounded-lg border">
          <div className="flex justify-between items-center mb-6">
            <Link href={routesPath.home}>
              <Button variant="outline" size="sm">
                <ArrowLeftIcon className="w-4 h-4 mr-2" />
                Go to Home
              </Button>
            </Link>
          </div>

          <h2 className="text-2xl font-bold text-center mb-2">Login</h2>
          <p className="text-gray-600 text-center mb-6">
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
              <div className="space-y-4">
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
              Don't have an account?{" "}
              <Link href="/register" className="text-blue-500 hover:underline">
                Register here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
