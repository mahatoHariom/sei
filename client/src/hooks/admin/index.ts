import { apiKeys } from "@/constants/apiKeys";
import { useQuery, useMutation, UseQueryResult } from "@tanstack/react-query";
import queryClient from "@/lib/query-client";
import {
  adminDeleteUser,
  getAllUsers,
  getAllContacts,
  editContact,
  deleteContact,
} from "@/services/admin";
import { User, Contact, ContactResponse } from "@/types";

interface UsersResponse {
  users: User[];
  totalPages: number;
  totalUsers: number;
}

interface GetAllUsersParams {
  page: number;
  limit: number;
  search: string;
}

export const useAdminGetAllUsers = ({
  page,
  limit,
  search,
}: GetAllUsersParams): UseQueryResult<UsersResponse> => {
  return useQuery({
    queryKey: [apiKeys.admin.getAllUsers, page, limit, search],
    queryFn: () => getAllUsers(page, limit, search),
  });
};

export const useAdminDeleteUser = () => {
  return useMutation({
    mutationFn: adminDeleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [apiKeys.admin.getAllUsers],
      });
    },
  });
};

interface GetAllContactsParams {
  page: number;
  limit: number;
  search: string;
}

export const useAdminGetAllContacts = ({
  page,
  limit,
  search,
}: GetAllContactsParams): UseQueryResult<ContactResponse> => {
  return useQuery({
    queryKey: ["admin-contacts", page, limit, search],
    queryFn: () => getAllContacts(page, limit, search),
  });
};

export const useAdminEditContact = () => {
  return useMutation({
    mutationFn: (data: { contactId: string; updates: Partial<Contact> }) =>
      editContact(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-contacts"] });
    },
  });
};

export const useAdminDeleteContact = () => {
  return useMutation({
    mutationFn: (contactId: string) => deleteContact(contactId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-contacts"] });
    },
  });
};
