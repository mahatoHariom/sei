/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { toast } from "sonner";
import { Messages } from "@/constants/messages";
import { useLoginUser } from "@/hooks/users/use-login-hooks";
import { LoginFormData, loginSchema } from "@/schema/users/login-schema";
import { handleError } from "@/helpers/handle-error";
import { setUser } from "@/store/slices/userSlice";
import Link from "next/link";
import { routesPath } from "@/constants/routes-path";
import { useRouter } from "next/navigation";
import { BaseUser } from "@/types";
import {
  EyeIcon,
  EyeOffIcon,
  LockIcon,
  MailIcon,
  ArrowRight,
} from "lucide-react";
import Image from "next/image";

// UI components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { motion } from "framer-motion";

const LoginPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { mutate: loginUser, isPending } = useLoginUser();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

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
    <div className="flex min-h-screen">
      {/* Left side - Banner/Image */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800"></div>
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-gradient-to-br from-pink-400 to-indigo-600 rounded-full mix-blend-multiply filter blur-[80px] opacity-70"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-gradient-to-tr from-blue-400 to-purple-600 rounded-full mix-blend-multiply filter blur-[80px] opacity-70"></div>
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]"></div>

        <div className="relative z-10 flex flex-col items-center justify-center w-full p-12 text-white">
          <Image
            src="/sei-logo.jpg"
            width={120}
            height={120}
            alt="SEI Institute"
            className="rounded-2xl shadow-lg mb-8"
          />

          <h1 className="text-4xl font-bold mb-6 text-center">
            Welcome to SEI Institute
          </h1>
          <p className="text-xl text-center max-w-md mb-12">
            Your journey to excellence in education starts here
          </p>

          <div className="w-full max-w-md space-y-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 shadow-xl shadow-black/5">
              <h3 className="text-xl font-semibold mb-2">
                Industry-Leading Education
              </h3>
              <p className="text-white/80">
                Access to cutting-edge courses designed by experts in the field.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 shadow-xl shadow-black/5">
              <h3 className="text-xl font-semibold mb-2">
                Flexible Learning Paths
              </h3>
              <p className="text-white/80">
                Study at your own pace with personalized learning experiences.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="w-full lg:w-1/2 bg-white dark:bg-gray-950 flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex justify-center mb-10">
            <div className="inline-flex p-4 bg-primary/10 rounded-2xl">
              <Image
                src="/sei-logo.jpg"
                width={90}
                height={90}
                alt="SEI Institute"
                className="rounded-xl"
              />
            </div>
          </div>

          <div className="mb-10">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Sign in
            </h2>
            <p className="mt-3 text-gray-500 dark:text-gray-400">
              Welcome back! Please enter your details to continue
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <MailIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary w-5 h-5" />
                        <Input
                          placeholder="Email address"
                          className="h-14 pl-12 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl focus-visible:ring-primary"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-500 text-sm mt-1" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <LockIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary w-5 h-5" />
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Password"
                          className="h-14 pl-12 pr-12 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl focus-visible:ring-primary"
                          {...field}
                        />
                        <button
                          type="button"
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOffIcon className="w-5 h-5" />
                          ) : (
                            <EyeIcon className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-500 text-sm mt-1" />
                  </FormItem>
                )}
              />

              <div className="flex justify-end">
                <Link
                  href="/forgot-password"
                  className="text-sm text-primary hover:text-primary/80"
                >
                  Forgot password?
                </Link>
              </div>

              <Button
                type="submit"
                className="w-full h-14 rounded-xl text-base font-medium bg-primary hover:bg-primary/90 transition-all duration-200"
                disabled={isPending}
              >
                {isPending ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="h-5 w-5 border-2 border-t-transparent border-white rounded-full animate-spin" />
                    <span>Signing in...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <span>Sign in</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                )}
              </Button>
            </form>
          </Form>

          <div className="mt-8 text-center space-y-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200 dark:border-gray-800"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="bg-white dark:bg-gray-950 px-4 text-sm text-gray-500 dark:text-gray-400">
                  Don't have an account?
                </span>
              </div>
            </div>

            <Button
              variant="outline"
              className="w-full h-12 rounded-xl border border-gray-200 dark:border-gray-800"
              onClick={() => router.push(routesPath.register)}
            >
              Create an account
            </Button>

            <div>
              <Button
                variant="ghost"
                className="text-gray-500 text-sm"
                onClick={() => router.push(routesPath.home)}
              >
                Back to homepage
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
