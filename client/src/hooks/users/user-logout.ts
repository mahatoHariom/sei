import { apiKeys } from "@/constants/apiKeys";

import { logoutUser } from "@/services/users";
import { useMutation } from "@tanstack/react-query";

export const useLogoutHooks = () => {
  return useMutation({
    mutationFn: () => logoutUser(),
    mutationKey: [apiKeys.logout],
  });
};
