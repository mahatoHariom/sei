import api from "@/lib/axios-instance";
import { User, Contact, ContactResponse } from "@/types";
import { Subject } from "@/types/subjects";

interface UsersResponse {
  users: User[];
  totalPages: number;
  totalUsers: number;
}

export interface SubjectsResponse {
  subjects: Subject[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
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

export const getAllSubjects = async (): Promise<Subject[]> => {
  const response = await api.get("/subjects");
  return response.data;
};

export const createSubject = async (data: {
  name: string;
  description?: string;
}): Promise<void> => {
  await api.post("/admin/subjects", data);
};

export const editSubject = async (data: {
  subjectId: string;
  updates: { name: string; description: string };
}): Promise<void> => {
  await api.put(`/admin/subjects/${data.subjectId}`, data.updates);
};

export const deleteSubject = async (subjectId: string): Promise<void> => {
  await api.delete(`/admin/subjects/${subjectId}`);
};
