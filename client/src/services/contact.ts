import api from "@/lib/axios-instance";
import { ContactFormData } from "@/schema/contact-schema";

export async function createContact(
  data: ContactFormData & { userId: string }
) {
  return await api.post(`/user/contact/${data.userId}`, data);
}
