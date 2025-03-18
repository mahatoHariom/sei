import { apiKeys } from "@/constants/apiKeys";
import { useQuery, useMutation, UseQueryResult } from "@tanstack/react-query";
import queryClient from "@/lib/query-client";
import {
  adminDeleteUser,
  getAllUsers,
  getAllContacts,
  editContact,
  deleteContact,
  editCourse,
  deleteCourse,
  createCourse,
  getAllSubjects,
  getAllEnrolledUsers,
  getAllCarousels,
  updateCarousel,
  deleteCarousel,
  Carousel,
  createCarousel,
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
    queryKey: [apiKeys.admin.getAllContacts, page, limit, search],
    queryFn: () => getAllContacts(page, limit, search),
  });
};

export const useAdminEditContact = () => {
  return useMutation({
    mutationFn: (data: { contactId: string; updates: Partial<Contact> }) =>
      editContact(data),
    mutationKey: [apiKeys.admin.editContact],
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [apiKeys.admin.getAllContacts],
      });
    },
  });
};

export const useAdminDeleteContact = () => {
  return useMutation({
    mutationFn: (contactId: string) => deleteContact(contactId),
    mutationKey: [apiKeys.admin.deleteContact],
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [apiKeys.admin.getAllContacts],
      });
    },
  });
};

export const useGetAllSubjects = () => {
  return useQuery({
    queryKey: [apiKeys.admin.getAllSubjects],
    queryFn: getAllSubjects,
  });
};

export const usecreateCourse = () => {
  return useMutation({
    mutationFn: createCourse,
    mutationKey: [apiKeys.admin.createSubject],
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [apiKeys.admin.getAllSubjects],
      });
    },
  });
};

export const useeditCourse = () => {
  return useMutation({
    mutationFn: editCourse,
    mutationKey: [apiKeys.admin.editSubject],
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [apiKeys.admin.getAllSubjects],
      });
    },
  });
};

export const usedeleteCourse = () => {
  return useMutation({
    mutationFn: deleteCourse,
    mutationKey: [apiKeys.admin.deleteSubject],
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [apiKeys.admin.getAllSubjects],
      });
    },
  });
};

export const useAdminGetAllEnrolledUsers = ({
  page,
  limit,
  search,
}: GetAllUsersParams) => {
  return useQuery({
    queryKey: ["admin", "getAllEnrolledUsers", page, limit, search],
    queryFn: () => getAllEnrolledUsers(page, limit, search),
  });
};

export interface GetAllCarouselsParams {
  page: number;
  limit: number;
}

export const useAdminGetAllCarousels = (): UseQueryResult<Carousel[]> => {
  return useQuery({
    queryKey: [apiKeys.admin.getAllCarousels],
    queryFn: () => getAllCarousels(),
  });
};

export const useAdminUpdateCarousel = () => {
  return useMutation({
    mutationFn: updateCarousel,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [apiKeys.admin.getAllCarousels],
      });
    },
  });
};

export const useAdminCreateCarousel = () => {
  return useMutation({
    mutationFn: createCarousel,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [apiKeys.admin.getAllCarousels],
      });
    },
  });
};

export const useAdminDeleteCarousel = () => {
  return useMutation({
    mutationFn: deleteCarousel,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [apiKeys.admin.getAllCarousels],
      });
    },
  });
};
