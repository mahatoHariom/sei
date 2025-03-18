"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Messages } from "@/constants/messages";
import { useRegisterUser } from "@/hooks/users/use-register-hooks";
import { SignUpFormData, signUpSchema } from "@/schema/users/signup-schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { routesPath } from "@/constants/routes-path";
import {
  EyeIcon,
  EyeOffIcon,
  LockIcon,
  MailIcon,
  UserIcon,
  ArrowRight,
  CheckIcon,
} from "lucide-react";
import Image from "next/image";
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

const SignUpForm = () => {
  const { mutate: registerUser, isPending } = useRegisterUser();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: SignUpFormData) => {
    registerUser(data, {
      onSuccess: () => {
        router.push(routesPath.login);
        toast.success(Messages.register.success);
      },
      onError: (error) => {
        console.error("Registration error:", error);
        toast.error("Registration failed. Please try again.");
      },
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
            Join Our Community
          </h1>
          <p className="text-xl text-center max-w-md mb-12">
            Begin your educational journey with SEI Institute
          </p>

          <div className="w-full max-w-md space-y-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 shadow-xl shadow-black/5">
              <div className="flex items-start mb-2">
                <CheckIcon className="w-5 h-5 text-white mr-2 mt-1" />
                <h3 className="text-xl font-semibold">Personalized Learning</h3>
              </div>
              <p className="text-white/80 pl-7">
                Customized paths tailored to your career goals.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 shadow-xl shadow-black/5">
              <div className="flex items-start mb-2">
                <CheckIcon className="w-5 h-5 text-white mr-2 mt-1" />
                <h3 className="text-xl font-semibold">Expert Instructors</h3>
              </div>
              <p className="text-white/80 pl-7">
                Learn from industry professionals with real-world experience.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 shadow-xl shadow-black/5">
              <div className="flex items-start mb-2">
                <CheckIcon className="w-5 h-5 text-white mr-2 mt-1" />
                <h3 className="text-xl font-semibold">Community Support</h3>
              </div>
              <p className="text-white/80 pl-7">
                Join a network of students and professionals.
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

          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Create account
            </h2>
            <p className="mt-3 text-gray-500 dark:text-gray-400">
              Join our community of learners today
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary w-5 h-5" />
                        <Input
                          placeholder="Full name"
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
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <MailIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary w-5 h-5" />
                        <Input
                          placeholder="Email address"
                          type="email"
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

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <LockIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary w-5 h-5" />
                        <Input
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Confirm password"
                          className="h-14 pl-12 pr-12 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl focus-visible:ring-primary"
                          {...field}
                        />
                        <button
                          type="button"
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                        >
                          {showConfirmPassword ? (
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

              <div className="pt-2">
                <Button
                  type="submit"
                  className="w-full h-14 rounded-xl text-base font-medium bg-primary hover:bg-primary/90 transition-all duration-200"
                  disabled={isPending}
                >
                  {isPending ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="h-5 w-5 border-2 border-t-transparent border-white rounded-full animate-spin" />
                      <span>Creating account...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      <span>Create account</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  )}
                </Button>
              </div>
            </form>
          </Form>

          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              By creating an account, you agree to our{" "}
              <Link
                href="/terms"
                className="text-primary hover:text-primary/90"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="text-primary hover:text-primary/90"
              >
                Privacy Policy
              </Link>
            </p>
          </div>

          <div className="mt-8 text-center space-y-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200 dark:border-gray-800"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="bg-white dark:bg-gray-950 px-4 text-sm text-gray-500 dark:text-gray-400">
                  Already have an account?
                </span>
              </div>
            </div>

            <Button
              variant="outline"
              className="w-full h-12 rounded-xl border border-gray-200 dark:border-gray-800"
              onClick={() => router.push(routesPath.login)}
            >
              Sign in
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

export default SignUpForm;
