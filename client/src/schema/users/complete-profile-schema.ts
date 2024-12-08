// src/schema/users/profile-schema.ts
import { z } from "zod";

export const completeProfileSchema = z.object({
  phoneNumber: z.string().optional(),
  address: z.string().optional(),
  motherName: z.string().optional(),
  fatherName: z.string().optional(),
  parentContact: z.string().optional(),
  schoolCollegeName: z.string().optional(),
  profilePic: z.union([z.string(), z.instanceof(File)]).optional(),
});

export type CompleteProfileFormData = z.infer<typeof completeProfileSchema>;

export const userUpdateSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  phoneNumber: z.string().optional(),
  address: z.string().optional(),
  fatherName: z.string().optional(),
  motherName: z.string().optional(),
  schoolCollegeName: z.string().optional(),
  parentContact: z.string().optional(),
  profilePic: z.union([z.string(), z.instanceof(File)]).optional(),
});

export type UserUpdateInput = z.infer<typeof userUpdateSchema>;
