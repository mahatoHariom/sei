import api from "@/lib/axios-instance";
import { User, Contact, ContactResponse } from "@/types";

interface UsersResponse {
  users: User[];
  totalPages: number;
  totalUsers: number;
}

export const getAllUsers = async (
  page: number,
  limit: number,
  search = ""
): Promise<UsersResponse> => {
  const response = await api.get<UsersResponse>("/admin/users", {
    params: { page, limit, search },
  });
  return response.data;
};

export const adminDeleteUser = async (userId: string): Promise<void> => {
  await api.delete(`/admin/users/${userId}`);
};

export const getAllContacts = async (
  page: number,
  limit: number,
  search = ""
): Promise<ContactResponse> => {
  const response = await api.get("/admin/contacts", {
    params: { page, limit, search },
  });
  return response.data;
};

export const editContact = async (data: {
  contactId: string;
  updates: Partial<Contact>;
}): Promise<void> => {
  await api.put(`/admin/contacts/${data.contactId}`, data.updates);
};

export const deleteContact = async (contactId: string): Promise<void> => {
  await api.delete(`/admin/contacts/${contactId}`);
};
