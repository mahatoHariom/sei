import { useMutation } from "@tanstack/react-query";
import api from "@/lib/axios-instance";
import { apiKeys } from "@/constants/apiKeys";
import { UserDetail } from "@/types";

interface ApiResponse<T> {
  data: T;
}

interface UpdateProfilePicInput {
  url: string;
  public_id: string;
}

export const useUpdateProfilePic = () => {
  return useMutation<ApiResponse<UserDetail>, Error, UpdateProfilePicInput>({
    mutationKey: [apiKeys.updateUserProfilePic],
    mutationFn: (data: UpdateProfilePicInput) => {
      return api.patch("/user/update-profile-pic", data);
    },
  });
};
