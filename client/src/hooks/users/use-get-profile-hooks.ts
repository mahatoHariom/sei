/* eslint-disable @typescript-eslint/no-explicit-any */

import { apiKeys } from "@/constants/apiKeys";

import { getProfile } from "@/services/users";
import { useQuery } from "@tanstack/react-query";
export const useGetProfile = () => {
  return useQuery({
    queryKey: [apiKeys.getProfile],
    queryFn: getProfile,
    // enabled: false,
  });
};
