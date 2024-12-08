/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "@/lib/axios-instance";
import { CompleteProfileFormData } from "@/schema/users/complete-profile-schema";
import { LoginFormData } from "@/schema/users/login-schema";
import { SignUpFormData } from "@/schema/users/signup-schema";
import { BaseUser, User } from "@/types";
import { GetUserCoursesResponse } from "@/types/subjects";

import { AxiosResponse } from "axios";

export default async function registerUser(
  values: SignUpFormData
): Promise<AxiosResponse<User>> {
  return await api.post("/auth/register", values);
}
interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: BaseUser;
}

export async function loginUser(data: LoginFormData): Promise<LoginResponse> {
  const response = await api.post<LoginResponse>("/auth/login", data);
  return response.data;
}

export async function logoutUser() {
  const response = await api.post("/auth/logout");
  return response.data;
}
export async function completeProfile(data: CompleteProfileFormData) {
  const response = await api.post("/user/complete-profile", data);
  return response.data;
}

export async function getProfile(): Promise<BaseUser> {
  const response = await api.get<User>("/auth/profile");
  console.log(response, "pose");
  return response.data;
}

export async function changePassword(data: {
  password: string;
  confirmPassword: string;
}): Promise<void> {
  const response = await api.post("/user/change-password", data);
  return response.data;
}

export async function getUserCourses({
  userId,
  page,
  limit,
  search,
}: {
  userId: string;
  page: number;
  limit: number;
  search?: string;
}): Promise<GetUserCoursesResponse> {
  // Use the GetUserCoursesResponse type
  const response = await api.get(`/user/enrolled-courses/${userId}`, {
    params: { page, limit, search },
  });

  return response.data;
}
