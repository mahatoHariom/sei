import { useMutation } from "@tanstack/react-query";
import { User, UserUpdateInput } from "@/types";
import api from "@/lib/axios-instance";
import { apiKeys } from "@/constants/apiKeys";

interface ApiResponse<T> {
  data: T;
}

export const useUpdateProfile = () => {
  return useMutation<ApiResponse<User>, Error, UserUpdateInput>({
    mutationKey: [apiKeys.updateUser],
    mutationFn: (data: UserUpdateInput) => {
      return api.patch("/user/edit-profile", data);
    },
  });
};