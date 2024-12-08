import { z } from "zod";

export const editProfileSchema = z.object({
  name: z.string().min(1, "Name is required"),
  username: z.string().min(1, "Username is required"),
});

export interface EditProfileData {
  name: string;
  username: string;
}
