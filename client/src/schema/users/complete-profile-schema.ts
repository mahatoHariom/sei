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
