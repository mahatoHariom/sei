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

// Image Interface
export interface Image {
  id: string;
  public_id: string;
  imgSrc: string;
  userId: string;
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
  profilePic?: string; // Optional field
  parentContact?: string; // Optional field
  schoolCollegeName?: string; // Optional field
  userId: string; // Relation field
}

export interface BaseUser {
  id: string;
  fullName: string;
  email: string;
  isVerified: boolean;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
}

export interface User extends BaseUser {
  testimonials: Testimonial[];
  attendances: Attendance[];
  enrollments: Enrollment[];
  userDetail?: UserDetail;
}
