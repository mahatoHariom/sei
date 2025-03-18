import api from "@/lib/axios-instance";
import { PdfResponse } from "@/types/pdf";

// API Functions

interface UploadPdfsDto {
  formData: FormData;
}

// interface PDF {
//   id: string;
//   title: string;
//   description?: string;
//   filename: string;
//   originalName: string;
//   path: string;
//   createdAt: Date;
//   updatedAt: Date;
// }

export const getPdfs = async (
  page = 1,
  limit = 100, // Increase the limit
  search = ""
): Promise<PdfResponse> => {
  const response = await api.get(
    `/pdfs?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}`
  );
  return response.data;
};

export const uploadPdfs = async (data: UploadPdfsDto) => {
  const response = await api.post("/admin/pdfs", data.formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};
export const downloadPdf = async (id: string): Promise<Blob> => {
  const response = await api.get(`/pdfs/${id}/download`, {
    responseType: "blob",
  });
  return response.data;
};

export const bulkDownloadPdfs = async (fileIds: string[]): Promise<Blob> => {
  const response = await api.post(
    "/pdfs/bulk-download",
    { fileIds },
    {
      responseType: "blob",
    }
  );
  return response.data;
};

export const deletePdf = async (id: string): Promise<void> => {
  await api.delete(`/admin/pdfs/${id}`);
};
