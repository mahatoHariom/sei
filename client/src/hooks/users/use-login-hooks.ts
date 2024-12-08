/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiKeys } from "@/constants/apiKeys";
import { LoginFormData } from "@/schema/users/login-schema";

import { loginUser } from "@/services/users";
import { useMutation } from "@tanstack/react-query";

export const useLoginUser = () => {
  return useMutation({
    mutationFn: (values: LoginFormData) => loginUser(values),
    mutationKey: [apiKeys.login],
  });
};
