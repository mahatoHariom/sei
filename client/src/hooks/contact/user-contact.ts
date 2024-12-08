import { useMutation } from "@tanstack/react-query";
import { createContact } from "@/services/contact";
import { apiKeys } from "@/constants/apiKeys";

export const useCreateContact = () => {
  return useMutation({
    mutationFn: createContact,
    mutationKey: [apiKeys.contact],
  });
};
