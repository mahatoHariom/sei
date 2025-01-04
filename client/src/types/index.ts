// User Role Enum
export enum UserRole {
  ADMIN = "admin",
  USER = "user",
}

// Course Type Enum
export enum CourseType {
  SCIENCE = "SCIENCE",
  MANAGEMENT = "MANAGEMENT",
  LANGUAGE = "LANGUAGE",
  STAFF_NURSE = "STAFF_NURSE",
  HA = "HA",
  LAB_PREPARATION = "LAB_PREPARATION",
  COMPUTER = "COMPUTER",
}

// Attendance Status Enum
export enum AttendanceStatus {
  PRESENT = "PRESENT",
  ABSENT = "ABSENT",
}

export interface ProfilePic {
  id: string;
  publicId: string;
  url: string;
  createdAt: string;
  updatedAt: string;
}
// Enrollment Status Enum
export enum EnrollmentStatus {
  PENDING = "PENDING",
  VERIFIED = "VERIFIED",
  FAILED = "FAILED",
}

// Payment Status Enum
export enum PaymentStatus {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
}

// Testimonial Interface
export interface Testimonial {
  id: string;
  content: string;
  rating: number;
  createdAt: Date;
  userId: string;
}

// Attendance Interface
export interface Attendance {
  id: string;
  date: Date;
  status: AttendanceStatus;
  userId: string;
  courseId: string;
  createdAt: Date;
  updatedAt: Date;
}

// Course Interface
export interface Course {
  id: string;
  name: string;
  description?: string | null; // Optional field
  type: CourseType;
  startDate: Date;
  endDate?: Date | null; // Optional field
  enrollments: Enrollment[]; // Include enrollments for relation
  attendance: Attendance[]; // Include attendance for relation
}

// Enrollment Interface
export interface Enrollment {
  id: string;
  courseId: string;
  userId: string;
  enrolledAt: Date;
  status: EnrollmentStatus;
  paymentStatus: PaymentStatus;
}

// User Detail Interface
export interface UserDetail {
  id: string;
  phoneNumber?: string; // Optional field
  address?: string; // Optional field
  motherName?: string; // Optional field
  fatherName?: string; // Optional field
  profilePic?: ProfilePic; // Updated to use Image interface
  parentContact?: string; // Optional field
  schoolCollegeName?: string; // Optional field
  userId: string; // Relation field
}

// User Update Input Interface
export interface UserUpdateInput {
  phoneNumber?: string; // Optional field
  address?: string; // Optional field
  motherName?: string; // Optional field
  fatherName?: string; // Optional field
  profilePic?: string; // Updated to use Image interface
  parentContact?: string; // Optional field
  schoolCollegeName?: string; // Optional field
  email: string;
  fullName: string;
}

// Base User Interface
export interface BaseUser {
  id: string;
  fullName: string;
  email: string;
  isVerified: boolean;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
}

// User Interface
export interface User extends BaseUser {
  testimonials: Testimonial[];
  attendances: Attendance[];
  enrollments: Enrollment[];
  userDetail?: UserDetail; // Optional relation field
}

// Contact Interface
export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  userId: string;
  createdAt: Date;
}

export interface ContactResponse {
  totalPages: number;
  totalUsers: number;
  contacts: Contact[];
}

// Response Interfaces
export interface GetAllContactsResponse {
  contacts: Contact[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

// Edit Contact Input Interface
export interface EditContactInput {
  name: string;
  email: string;
  phone: string;
  message: string;
}

// Delete Contact Params Interface
export interface DeleteContactParams {
  contactId: string;
}
