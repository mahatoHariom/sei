/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiKeys } from "@/constants/apiKeys";
import { CompleteProfileFormData } from "@/schema/users/complete-profile-schema";
// import { LoginFormData } from "@/schema/users/login-schema";

import { completeProfile } from "@/services/users";
import { useMutation } from "@tanstack/react-query";

export const useCompleteProfile = () => {
  return useMutation({
    mutationFn: (values: CompleteProfileFormData) => completeProfile(values),
    mutationKey: [apiKeys.completeProfile],
  });
};
