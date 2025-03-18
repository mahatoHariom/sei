import api from "@/lib/axios-instance";
import { User, Contact, ContactResponse } from "@/types";
import { Subject } from "@/types/subjects";

interface UsersResponse {
  users: User[];
  totalPages: number;
  totalUsers: number;
}

export interface CoursesResponse {
  courses: Subject[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface EnrolledUser {
  id: string;
  fullName: string;
  email: string;
  course: string; // Replace with the correct type if different
  enrolledAt: string; // Use `Date` if the backend returns a proper ISO string
}

export interface EnrolledUsersResponse {
  enrollments: {
    createdAt: string;
    subject: { name: string }[];
    user: { id: string; fullName: string; email: string };
  }[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface Carousel {
  id: string;
  publicId: string;
  url: string;
  createdAt: string;
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
  console.log("Subjects response:", response.data);

  const subjects = response.data.map((subject: any) => ({
    ...subject,
    badge: subject.badge || "",
    tags: Array.isArray(subject.tags) ? subject.tags : [],
    students: typeof subject.students === "number" ? subject.students : 0,
  }));

  return subjects;
};

export const createCourse = async (data: Partial<Subject>): Promise<void> => {
  await api.post("/admin/subjects", data);
};

export const editCourse = async (data: {
  courseId: string;
  updates: Partial<Subject>;
}): Promise<void> => {
  await api.put(`/admin/subjects/${data.courseId}`, data.updates);
};

export const deleteCourse = async (courseId: string): Promise<void> => {
  await api.delete(`/admin/subjects/${courseId}`);
};

export const getAllEnrolledUsers = async (
  page: number,
  limit: number,
  search = ""
): Promise<EnrolledUsersResponse> => {
  const response = await api.get<EnrolledUsersResponse>(
    "/admin/enrolled-users",
    {
      params: { page, limit, search },
    }
  );
  return response.data;
};

export const getAllCarousels = async (): Promise<Carousel[]> => {
  const response = await api.get("/admin/carousels");
  return response.data;
};

export const updateCarousel = async (data: {
  id: string;
  publicId: string;
  url: string;
}): Promise<void> => {
  await api.put(`/admin/carousels`, data);
};

export const createCarousel = async (data: {
  // id: string;
  publicId: string;
  url: string;
}): Promise<void> => {
  await api.post(`/admin/carousels`, data);
};
export const deleteCarousel = async (id: string): Promise<void> => {
  await api.delete(`/admin/carousels/${id}`);
};
