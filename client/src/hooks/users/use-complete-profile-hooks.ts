/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiKeys } from "@/constants/apiKeys";
import { CompleteProfilePayload } from "@/schema/users/complete-profile-schema";
// import { LoginFormData } from "@/schema/users/login-schema";

import { completeProfile } from "@/services/users";
import { useMutation } from "@tanstack/react-query";

export const useCompleteProfile = () => {
  return useMutation({
    mutationFn: (values: CompleteProfilePayload) => completeProfile(values),
    mutationKey: [apiKeys.completeProfile],
  });
};
