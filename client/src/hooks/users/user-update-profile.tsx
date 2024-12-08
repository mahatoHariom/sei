// hooks/users/user-update-profile.ts
import { useMutation } from "@tanstack/react-query";
import { UserUpdateInput } from "@/types";
import api from "@/lib/axios-instance";
import { apiKeys } from "@/constants/apiKeys";

export const useUpdateProfile = () => {
  return useMutation({
    mutationKey: [apiKeys.updateUser],
    mutationFn: (data: UserUpdateInput) => {
      return api.patch("/user/edit-profile", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
  });
};
